"use client";
import React from "react";
import Image from "next/image";

const HeroMandalaBackground = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      <div className="w-96 h-96 relative">
        <Image
          src="/assets/mandala.png"
          alt="Background Mandala"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>
    </div>
  );
};

export default HeroMandalaBackground;
