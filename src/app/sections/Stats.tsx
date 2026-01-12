import SplitText from "@/app/effects/SplitText";
export default function Stats() {
  return (
    <div id="section2" className="section w-full h-screen relative overflow-hidden">
      {/* Content */}
      <div className="relative z-20 w-full h-full flex items-start justify-end pt-[10%] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mr-[10%]">
          <SplitText
            text="Stats"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            delay={50}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />
        </div>
      </div>
    </div>
  );
}
