"use client";

import GameCanvas from "@/components/GameCanvas";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-white overflow-hidden"
      style={{
        backgroundImage: "url('/assets/bg/bg_2510_02.jpg')", // Path to your background image
        backgroundSize: "cover", // Ensures the image covers the entire area
        backgroundPosition: "center", // Centers the image
      }}
    >
      {/* Ảnh nền trái */}
      <div className="absolute left-0 top-0 h-full w-[800px] flex items-center justify-center">
        <Image
          src="/assets/bg/chara_l_2510_02.png"
          alt="Left background"
          width={800}
          height={920}
          className="object-contain"
        />
      </div>

      {/* Ảnh nền phải */}
      <div className="absolute right-0 top-0 h-full w-[800px] flex items-center justify-center">
        <Image
          src="/assets/bg/chara_r_2510_02.png"
          alt="Right background"
          width={800}
          height={920}
          className="object-contain"
        />
      </div>

      {/* Khu vực Game chính */}
      <div className="z-10 w-[1200px] h-[700px] border-4 border-purple-500 rounded-xl shadow-xl bg-white">
        <GameCanvas />
      </div>
    </main>
  );
}
