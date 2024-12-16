import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex justify-center p-2 bg-gradient-to-b from-[#f0f4f8] to-white" style={{fontFamily: "'IBM Plex Sans', sans-serif", textAlign: "center"}}>
            <div className="mb-4 w-full max-w-4xl flex flex-col items-center py-5">
                <br/>
                <h1 className="font-bold my-12 text-[#2c3e50]" style={{fontSize: "25pt"}}>About Us</h1>
                
                <div className="text-center max-w-2xl mb-8">
                    <p>Our goal at Clearvote is to help the public stay up-to-date during <strong className="text-[#947fee]">local</strong>, <strong className="text-[#947fee]">off-cycle</strong> elections and understand <strong className="text-[#947fee]">who</strong> they are voting for.</p>
                </div>

                <Image src="/images/star-photo.jpg" alt="Team-photo" width={200} height={100} className="rounded-lg shadow-xl mb-12" />

                <h2 className="font-semibold text-[#2c3e50]" style={{fontSize: "25pt"}}>Why?</h2>
                <br/>
                <div className="mb-8 max-w-2xl">
                    <p className="mb-4">Urban estimates for voter turnout in <strong>federal elections</strong> are around <strong>70%</strong> with <strong>off-cycle elections</strong> in contests like primary elections being as low as <strong>20%</strong>. Many people are interested in participating but do not, mainly because they either:</p>
                    <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li>Do not even know there is an election going on.</li>
                        <li>Don&apos;t have the time to figure out how to participate.</li>
                        <li>Are not able to keep track of the key dates and miss the voting schedule.</li>
                    </ol>
                </div>

                <h2 className="font-semibold text-[#2c3e50]" style={{fontSize: "25pt"}}>How?</h2>
                <br/>
                <div className="mb-8 max-w-2xl">
                    <p>Clearvote allows you to easily access information on the candidates at all levels on <strong className="text-[#947fee]">your</strong> ballot and choose who  <strong className="text-[#947fee]">you</strong> want to vote for.</p>
                    <br/>
                    <p>We believe through the open-source nature and community-driven approach of Clearvote, we can enhance the political agency of individuals globally on a small scale, where each &quot;chapter&quot; of Clearvote is catered to the needs of that particular community.</p>
                </div>

                <h2 className="font-semibold text-[#2c3e50]" style={{fontSize: "25pt"}}>Who We Are Not</h2>
                <br/>
                <div className="text-lg mb-8 max-w-2xl">
                    <p className="mb-4">An application like this could in theory be used for control, but we believe this isn&apos;t possible for the main reason that people are more skeptical when it comes to politics than anything else. Our primary asset is <strong className="text-[#947fee]">Trust</strong>. We are not:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Data Collectors</li>
                        <li>Political Analysts</li>
                        <li>Think Tanks</li>
                        <li>Lobbyists</li>
                        <li>All other forms of Corporate Shills</li>
                    </ul>
                </div>

                <Link href="/decisionFlow" passHref>
                    <Button className="bg-[#947fee] hover:bg-[#D3D3D3] text-white">Let&apos;s Get Started!</Button>
                </Link>
            </div>
        </div>
    )
}
