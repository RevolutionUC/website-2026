"use client";

import Image from "next/image";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const GsapScrollTrigger = () => {
  const scrollRef = useRef<any>(null);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(scrollRef.current.children);

      // Define from/to positions for each cloud individually
      const cloudAnimations = [
        { from: { x: -800, y: -150, scale: 1 }, to: { x: -500, y: -150, scale: 1 } },    // Cloud 0 - from left
        { from: { x: -1000, y: 30, scale: 1 }, to: { x: -350, y: 30, scale: 1.5 } },    // Cloud 1 - from left
        { from: { x: -900, y: -20, scale: 1 }, to: { x: -200, y: -20, scale: 1 } },    // Cloud 2 - from left
        { from: { x: -1100, y: 100, scale: 1 }, to: { x: -300, y: 130, scale: 0.5 } },      // Cloud 3 - from left
        { from: { x: 800, y: -100, scale: 1 }, to: { x: 400, y: -100, scale: 1 } },      // Cloud 4 - from right
        { from: { x: 1000, y: 90, scale: 1 }, to: { x: 450, y: 90, scale: 1 } },      // Cloud 5 - from right
        { from: { x: 900, y: -140, scale: 1 }, to: { x: 500, y: -140, scale: 1 } },      // Cloud 6 - from right
        { from: { x: 1100, y: 100, scale: 1 }, to: { x: 650, y: 30, scale: 1 } },      // Cloud 7 - from right
      ];

      boxes.forEach((box: any, index: number) => {
        const animation = cloudAnimations[index] || cloudAnimations[0];

        gsap.fromTo(box, 
          animation.from,
          {
            ...animation.to,
            scrollTrigger: {
              trigger: box,
              start: "bottom bottom",
              end: "top 20%",
              scrub: true,
              //markers: true,
            },
            //ease: "power2.out",
            //markers: true,
          }
        );
      });
    },
    { scope: scrollRef },
  );

  return (
    <main>
      <div id="clouds" className="section absolute top-[45%] left-0 right-0 h-screen z-[60] overflow-visible">
        <Image
          src="/cloud_final1.webp"
          alt="Cloud"
          width={400}
          height={200}
          priority
          className="absolute top-[-15%] left-[5%] w-[400px] opacity-80"
          data-speed="0.8"
        />
        <Image
          src="/cloud_final1.webp"
          alt="Cloud"
          width={800}
          height={400}
          priority
          className="absolute top-[30%] left-[-10%] w-[600px] opacity-70"
          data-speed="0.6"
        />
        <Image
          src="/cloud_final5.webp"
          alt="Cloud"
          width={800}
          height={450}
          priority
          className="absolute top-[10%] right-[-25%] w-[800px] opacity-75"
          data-speed="1.2"
        />
        <Image
          src="/cloud_final4.webp"
          alt="Cloud"
          width={800}
          height={400}
          priority
          className="absolute top-[50%] right-[5%] w-[400px] opacity-80"
          data-speed="0.9"
        />
        <Image
          src="/cloud_final3.webp"
          alt="Cloud"
          width={800}
          height={450}
          priority
          className="absolute top-[50%] left-[15%] w-[400px] opacity-65"
          data-speed="0.7"
        />
      </div>

      <div className="h-[70vh] w-full relative flex justify-center overflow-y-visible z-200" ref={scrollRef}>
        <Image
          src="/cloud_final1.webp"
          alt="Cloud"
          width={800}
          height={450}
          loading="lazy"
          className="scroll-box h-110 absolute"
        />
        <Image
          src="/cloud_final2.webp"
          alt="Cloud"
          width={800}
          height={450}
          loading="lazy"
          className="scroll-box h-100 absolute"
        />
        <Image
          src="/cloud_final1.webp"
          alt="Cloud"
          width={800}
          height={450}
          loading="lazy"
          className="scroll-box h-100 absolute"
        />
        <Image
          src="/cloud_final5.webp"
          alt="Cloud"
          width={800}
          height={450}
          loading="lazy"
          className="scroll-box h-100 absolute"
        />
        <Image
          src="/cloud_final1.webp"
          alt="Cloud"
          width={800}
          height={450}
          loading="lazy"
          className="scroll-box h-150 absolute"
        />
        <Image
          src="/cloud_final1.webp"
          alt="Cloud"
          width={800}
          height={450}
          loading="lazy"
          className="scroll-box h-120 absolute"
        />
        <Image
          src="/cloud_final4.webp"
          alt="Cloud"
          width={800}
          height={450}
          loading="lazy"
          className="scroll-box h-100 absolute"
        />
        <Image
          src="/cloud_final5.webp"
          alt="Cloud"
          width={800}
          height={450}
          loading="lazy"
          className="scroll-box h-100 absolute"
        />
      </div>
    </main>
  );
};

export default GsapScrollTrigger;
