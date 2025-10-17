"use client";

import GameCanvas from "@/components/GameCanvas";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-white overflow-hidden">
      {/* Ảnh nền trái */}
      <div className="absolute left-0 top-0 h-full w-[400px] flex items-center justify-center">
        <Image
          src="/assets/bg/left_bg.png"
          alt="Left background"
          width={400}
          height={720}
          className="object-contain"
        />
      </div>

      {/* Ảnh nền phải */}
      <div className="absolute right-0 top-0 h-full w-[400px] flex items-center justify-center">
        <Image
          src="/assets/bg/right_bg.png"
          alt="Right background"
          width={400}
          height={720}
          className="object-contain"
        />
      </div>

      {/* Khu vực Game chính */}
      <div className="z-10 w-[1280px] h-[720px] border-4 border-purple-500 rounded-xl shadow-xl bg-white">
        <GameCanvas />
      </div>
    </main>
  );
}
