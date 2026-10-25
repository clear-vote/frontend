import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { trimLink } from '@/utils/helpers';
import { getContestHeading } from './BallotCard';
import type { BallotSelection } from './BallotSummary';

interface BallotPdfProps {
  /** Heading shown at the top of the ballot, e.g. "General Election" */
  title: string;
  selections: BallotSelection[];
  /** Picked candidates' photos already downloaded, by contest id (candidate ids repeat across contests); missing ones use fallbackImage */
  candidateImages: Record<number, Blob>;
  /** Absolute URL of the placeholder image for candidates without a photo */
  fallbackImage: string;
  /** Absolute URL of the Vee Bee mascot shown beside the title */
  mascotImage: string;
}

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 12 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  mascot: { width: 46, height: 50, marginRight: 12 },
  title: { fontSize: 20, fontFamily: 'Helvetica-Bold' },
  contest: { marginBottom: 14 },
  contestHeading: { fontFamily: 'Helvetica-Bold', marginBottom: 6 },
  card: {
    flexDirection: 'row',
    height: 80,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderRadius: 6,
    overflow: 'hidden',
  },
  image: { width: 80, height: 76, objectFit: 'cover', backgroundColor: '#E5E5E5' },
  info: { flex: 1, padding: 10, justifyContent: 'space-between' },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 14 },
  website: { color: '#9CA3AF', fontSize: 11 },
  footer: { position: 'absolute', bottom: 24, left: 40, right: 40, fontSize: 9, color: '#9CA3AF' },
});

/**
 * PDF version of the ballot summary: each contest heading with the pinned candidate's card below it
 */
export const BallotPdf: React.FC<BallotPdfProps> = ({ title, selections, candidateImages, fallbackImage, mascotImage }) => (
  <Document title="My Clearvote Ballot">
    <Page size="LETTER" style={styles.page}>
      <View style={styles.header}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image style={styles.mascot} src={mascotImage} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {selections.map(({ contest, candidate }) => (
        <View key={contest.id} style={styles.contest} wrap={false}>
          <Text style={styles.contestHeading}>{getContestHeading(contest)}</Text>
          <View style={styles.card}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image style={styles.image} src={candidateImages[contest.id] ?? fallbackImage} />
            <View style={styles.info}>
              <Text style={styles.name}>{candidate.name}</Text>
              {candidate.website && <Text style={styles.website}>{trimLink(candidate.website)}</Text>}
            </View>
          </View>
        </View>
      ))}
      <Text style={styles.footer} fixed>Informed by Clearvote, supporting Washington State elections since 2024</Text>
    </Page>
  </Document>
);
