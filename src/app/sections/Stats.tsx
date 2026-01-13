import Image from "next/image";

export default function Stats() {
  return (
    <div id="stats" className="section w-full h-screen relative overflow-hidden">
      {/* Content */}
      <div className="relative z-20 w-full h-full">
        {/* Left Side - 870 registrants (bottom, much larger) */}
        <div className="absolute left-0 bottom-[5%] z-20 w-fit h-fit transition-transform duration-300 hover:scale-110">
          <Image
            src="/870_registrants_stat.webp"
            width={1400}
            height={1400}
            alt="870 registrants"
            className="w-auto h-auto"
            style={{ maxWidth: "65vw", maxHeight: "65vh" }}
          />
        </div>

        {/* Right Side - 24 hours (top), 60 projects (top, slightly lower, medium) and 300 participants (bottom, slightly above, medium) */}
        <div className="absolute right-[45%] top-[0%] z-30 w-fit h-fit transition-transform duration-300 hover:scale-110">
          <Image
            src="/24_hours_stat.webp"
            width={600}
            height={600}
            alt="24 hours duration"
            className="w-auto h-auto"
            style={{ maxWidth: "90vw", maxHeight: "70vh" }}
          />
        </div>
        <div className="absolute right-[-5%] top-[10%] z-30 w-fit h-fit transition-transform duration-300 hover:scale-110">
          <Image
            src="/60_projects_stat.webp"
            width={600}
            height={600}
            alt="60 projects completed"
            className="w-auto h-auto"
            style={{ maxWidth: "75vw", maxHeight: "60vh" }}
          />
        </div>
        <div className="absolute right-[25%] bottom-[8%] z-30 w-fit h-fit transition-transform duration-300 hover:scale-110">
          <Image
            src="/300_participants_stat.webp"
            width={900}
            height={900}
            alt="300 participants"
            className="w-auto h-auto"
            style={{ maxWidth: "85vw", maxHeight: "70vh" }}
          />
        </div>
      </div>
    </div>
  );
}
