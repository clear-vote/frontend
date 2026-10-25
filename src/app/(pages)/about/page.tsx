import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from "next/link";
import HowToVoteRoundedIcon from '@mui/icons-material/HowToVoteRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';

const reasons = [
    "Do not even realize there is an election going on.",
    "Don't have the time to figure out how to participate.",
    "Are not able to keep track of the key dates and miss the voting schedule.",
];

export default function AboutPage() {
    return (
        <div className="bg-white text-[#2c3e50]" style={{fontFamily: "'IBM Plex Sans', sans-serif"}}>
            {/* Hero */}
            {/* extra 60px of top padding sits under the fixed toolbar, so the title is centered in the visible banner */}
            <section className="px-4 pt-[calc(9rem+60px)] pb-36 text-center text-white the-fancy-background">
                <h1 className="font-bold leading-none tracking-tight text-[clamp(3.5rem,9vw,6rem)]">About Clearvote</h1>
            </section>

            {/* Mission statement */}
            <section className="px-4 py-16 bg-[#faf8fd]">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-12">
                    <p className="flex-1 font-bold leading-tight tracking-tight text-[clamp(1.75rem,3.6vw,2.75rem)] text-center md:text-left">
                        Our goal at Clearvote is to help the public stay up-to-date during local, off-cycle elections and understand <em>who</em> they are voting for.
                    </p>
                    {/* inline height, since .the-fancy-background sets height: 100% and would override a Tailwind height class */}
                    <div className="flex-shrink-0 w-[280px] rounded-2xl flex items-center justify-center shadow-lg the-fancy-background" style={{height: "330px"}}>
                        <Image
                            src="/images/star-photo.jpg"
                            alt="Team-photo"
                            width={190}
                            height={280}
                            className="w-[190px] h-[280px] object-cover rounded-lg border-4 border-white shadow-xl -rotate-2"
                        />
                    </div>
                </div>
            </section>

            {/* The why? */}
            <section className="px-4 pt-20">
                <div className="mx-auto max-w-6xl">
                    <h2 className="font-bold text-[2.5rem] leading-tight mb-12 text-center">The Why</h2>
                    <div className="flex flex-col md:flex-row md:items-start gap-10 lg:gap-20">
                        <div className="flex flex-col gap-6 md:w-[360px] flex-shrink-0">
                            <div className="rounded-2xl bg-[#f3f1fd] p-10">
                                <p className="font-bold text-[5.5rem] text-[#6b52e0] leading-none mb-4">70%</p>
                                <p className="font-semibold text-[1.25rem] leading-snug">Voter turnout in Federal elections</p>
                            </div>
                            <div className="rounded-2xl bg-[#f9eef3] p-10">
                                <p className="font-bold text-[5.5rem] text-[#b03a7a] leading-none mb-4">20%</p>
                                <p className="font-semibold text-[1.25rem] leading-snug">Voter turnout in off-cycle elections (yikes)</p>
                            </div>
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-semibold text-[1.5rem] leading-snug mb-12">
                                Urban estimates for voter turnout in federal elections are around 70% with off-cycle elections in contests like primary elections being as low as 20%.
                            </p>

                            {/* Reasons people don't vote */}
                            <h3 className="font-semibold text-[1.5rem] leading-snug pb-6 border-b border-[#e9e5f5]">Many people are interested in participating but do not, mainly because they either:</h3>
                            <ol>
                                {reasons.map((reason, i) => (
                                    <li key={reason} className="flex items-center gap-8 py-8 border-b border-[#e9e5f5]">
                                        <span className="font-bold text-[2.5rem] leading-none text-[#6b52e0] w-14 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                        <span className="font-semibold text-[1.125rem]">{reason}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* The How */}
            <section className="px-4 pt-20">
                <div className="mx-auto max-w-6xl">
                    <h2 className="font-bold text-[2.5rem] leading-tight mb-8 text-center">The How</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="rounded-2xl bg-[#f3f1fd] p-10">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#6b52e0] text-white">
                                <HowToVoteRoundedIcon style={{fontSize: "2rem"}} />
                            </div>
                            <p className="font-semibold text-[1.5rem] leading-snug">Clearvote allows you to easily access information on the candidates at all levels on your ballot and choose who you want to vote for. We helped over 3000 Washingtonians find election information in 2024 alone.</p>
                        </div>
                        <div className="rounded-2xl p-10 text-white the-fancy-background">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/25">
                                <PublicRoundedIcon style={{fontSize: "2rem"}} />
                            </div>
                            <p className="font-semibold text-[1.5rem] leading-snug">We believe through the open-source nature and community-driven approach of Clearvote, we can enhance the political agency of individuals globally on a small scale, where each &quot;chapter&quot; of Clearvote is catered to the needs of that particular community.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Are Not */}
            <section className="px-4 pt-20">
                <div className="mx-auto max-w-6xl">
                    <h2 className="font-bold text-[2.5rem] leading-tight mb-4 text-center">Who We Are Not</h2>
                    <p className="font-semibold text-[1.5rem] leading-snug">An application like this could in theory be used for control, but we believe this isn&apos;t possible for the main reason that people are more skeptical when it comes to politics than anything else. Our primary asset is trust.</p>
                    <br/>
                    <p className="font-semibold text-[1.5rem] leading-snug">We are not data collectors, political anaylsts, think tanks, lobbyists, or any other form of corporate shills. We are individuals who want people go out and make well informed votes which will impact their community.</p>
                </div>
            </section>

            <section className="px-4 py-20 text-center">
                <Link href="/decisionFlow" passHref>
                    <Button className="bg-[#947fee] hover:bg-[#D3D3D3] text-white">Let&apos;s Get Started!</Button>
                </Link>
            </section>
        </div>
    )
}
