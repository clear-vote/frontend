import { useEffect, useRef, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@/components/ui/button';
import { useElectionContext } from '@/context/ElectionContext';
import { BallotPdf } from './BallotPdf';
import { useBallotSelections } from './BallotSummary';

// pdfjs is served from public/pdfjs (copied there on postinstall) and loaded with a native import,
// because Next 14's webpack can't bundle pdfjs-dist 5
const PDFJS_URL = '/pdfjs/pdf.min.mjs';
const PDFJS_WORKER_URL = '/pdfjs/pdf.worker.min.mjs';

type Pdfjs = typeof import('pdfjs-dist');
let pdfjsPromise: Promise<Pdfjs> | null = null;

const loadPdfjs = (): Promise<Pdfjs> => {
  pdfjsPromise ??= import(/* webpackIgnore: true */ PDFJS_URL).then((pdfjs: Pdfjs) => {
    pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
    return pdfjs;
  });
  return pdfjsPromise;
};

/**
 * Downloads an image for the PDF, or null if it fails. Skips the browser cache: S3 photos the page already showed
 * are cached without CORS headers, and reusing that copy would make this cross-origin fetch fail.
 */
const fetchImage = async (url: string): Promise<Blob | null> => {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    return response.ok ? await response.blob() : null;
  } catch {
    return null;
  }
};

interface PdfPageCanvasProps {
  doc: PDFDocumentProxy;
  pageNumber: number;
  /** Display width in CSS pixels */
  width: number;
}

/** Draws one PDF page onto a canvas, sharp on high-DPI screens */
const PdfPageCanvas: React.FC<PdfPageCanvasProps> = ({ doc, pageNumber, width }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    let task: RenderTask | null = null;

    doc.getPage(pageNumber).then((page) => {
      const canvas = canvasRef.current;
      if (cancelled || !canvas) return;

      const ratio = window.devicePixelRatio || 1;
      const scale = width / page.getViewport({ scale: 1 }).width;
      const viewport = page.getViewport({ scale: scale * ratio });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${viewport.height / ratio}px`;

      task = page.render({ canvas, viewport });
      task.promise.catch(() => {}); // cancelled when the width changes mid-render
    });

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, pageNumber, width]);

  return <canvas ref={canvasRef} className="block bg-white shadow-md" />;
};

/**
 * Renders the user's ballot to a PDF, shows its pages in a scrollable preview, and lets the user download it.
 * Client-only: import with next/dynamic and ssr: false.
 */
export const BallotPdfPreview: React.FC = () => {
  const { elections, selectedElection } = useElectionContext();
  const selections = useBallotSelections();
  const [blob, setBlob] = useState<Blob | null>(null);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageWidth, setPageWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only regenerate the PDF when the picks actually change
  const selectionsKey = selections.map(({ contest, candidate }) => `${contest.id}:${candidate.id}`).join(',');

  useEffect(() => {
    let cancelled = false;
    const title = selectedElection !== null ? `My ${elections[selectedElection].type} Election Ballot` : 'My Ballot';

    const generate = async () => {
      const candidateImages: Record<number, Blob> = {};
      await Promise.all(selections.map(async ({ contest, candidate }) => {
        const image = candidate.image ? await fetchImage(candidate.image) : null;
        if (image) candidateImages[contest.id] = image;
      }));

      return pdf(
        <BallotPdf
          title={title}
          selections={selections}
          candidateImages={candidateImages}
          fallbackImage={`${window.location.origin}/images/no_candidate_image.png`}
          mascotImage={`${window.location.origin}/branding/veebee-plain.png`}
        />
      ).toBlob();
    };

    generate()
      .then((result) => { if (!cancelled) setBlob(result); })
      .catch((error) => console.error('Failed to generate ballot PDF:', error));

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionsKey, selectedElection]);

  // Load the generated PDF into pdfjs for the preview
  useEffect(() => {
    if (!blob) return;
    let cancelled = false;
    let loaded: PDFDocumentProxy | null = null;

    Promise.all([loadPdfjs(), blob.arrayBuffer()])
      .then(([pdfjs, data]) => pdfjs.getDocument({ data: new Uint8Array(data), isEvalSupported: false }).promise)
      .then((result) => {
        loaded = result;
        if (cancelled) result.destroy();
        else setDoc(result);
      })
      .catch((error) => console.error('Failed to load ballot preview:', error));

    return () => {
      cancelled = true;
      loaded?.destroy();
    };
  }, [blob]);

  // Size pages to fit the preview box
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => setPageWidth(Math.floor(entry.contentRect.width)));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clearvote-ballot.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div
        className="w-full rounded-md border border-gray-300 overflow-y-auto"
        style={{ maxHeight: '70vh', backgroundColor: '#E5E7EB', padding: '16px' }}
      >
        <div ref={containerRef} className="w-full flex flex-col gap-4">
          {!doc || pageWidth === 0 ? (
            <p className="text-sm text-gray-500 py-8">Preparing your ballot…</p>
          ) : (
            Array.from({ length: doc.numPages }, (_, i) => (
              <PdfPageCanvas key={i} doc={doc} pageNumber={i + 1} width={pageWidth} />
            ))
          )}
        </div>
      </div>
      <Button
        onClick={handleDownload}
        disabled={!blob || selections.length === 0}
        className="bg-[#947FEE] hover:bg-purple-800 text-white py-2 px-4 rounded"
      >
        <DownloadIcon style={{ width: '18px' }} />&nbsp;{blob ? 'Download PDF' : 'Generating…'}
      </Button>
    </div>
  );
};

export default BallotPdfPreview;
