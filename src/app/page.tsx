// import Sponsors from "@/app/sections/Sponsors";
import { Suspense } from "react";
import Hero from "@/app/sections/Hero";
import About from "@/app/sections/About";
import Clouds from "@/app/sections/Clouds";
import BoardingPass from "@/app/sections/BoardingPass";
import Prizes from "@/app/sections/Tracks";
import Stats from "@/app/sections/Stats";
import Faq from "@/app/sections/FAQ";
import ScheduleSection from "@/app/sections/Schedule";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <>
      <Hero />
      <Clouds />
      <About />
      <Suspense fallback={<div>Loading...</div>}>
        <BoardingPass />
      </Suspense>
      <Stats />
      <Prizes />
      <Faq />
      <Suspense fallback={<div className="section relative w-full overflow-hidden pt-[160px] pb-[200px] flex items-center justify-center"><p className="text-[#151477]">Loading schedule...</p></div>}>
        <ScheduleSection />
      </Suspense>
    </>
  );
}
