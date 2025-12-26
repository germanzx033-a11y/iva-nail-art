"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterProps {
  lang: "en" | "es";
}

interface Transformation {
  id: string;
  before: string;
  after: string;
  title: string;
  titleEs: string;
  service: string;
  serviceEs: string;
}

const TRANSFORMATIONS: Transformation[] = [
  {
    id: "1",
    before: "/trabajo1.jpg",
    after: "/trabajo2.jpg",
    title: "Natural to Glamorous",
    titleEs: "Natural a Glamoroso",
    service: "Builder Gel + French",
    serviceEs: "Builder Gel + Francés",
  },
  {
    id: "2",
    before: "/trabajo2.jpg",
    after: "/trabajo3.jpg",
    title: "Classic to Premium",
    titleEs: "Clásico a Premium",
    service: "Acrylic + Custom Design",
    serviceEs: "Acrílico + Diseño",
  },
];

export default function BeforeAfter({ lang }: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeIndex, setActiveIndex] = useState(0);

  const t = {
    en: {
      title: "Real Transformations",
      subtitle: "See the IVA difference",
      before: "Before",
      after: "After",
    },
    es: {
      title: "Transformaciones Reales",
      subtitle: "Ve la diferencia IVA",
      before: "Antes",
      after: "Después",
    },
  };

  const text = t[lang];
  const current = TRANSFORMATIONS[activeIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3">
            {text.title}
          </h2>
          <p className="text-[#4A0404]/60 text-sm sm:text-base">{text.subtitle}</p>
        </div>

        {/* Comparison Slider */}
        <div className="mb-8">
          <div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (background) */}
            <div className="absolute inset-0">
              <Image
                src={current.after}
                alt={`${text.after} - ${lang === "en" ? current.title : current.titleEs}`}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#4A0404] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                {text.after}
              </div>
            </div>

            {/* Before Image (foreground with clip) */}
            <div
              className="absolute inset-0 transition-all duration-100"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={current.before}
                alt={`${text.before} - ${lang === "en" ? current.title : current.titleEs}`}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-white text-[#4A0404] px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                {text.before}
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-[#4A0404]" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 text-center">
            <h3 className="font-serif text-xl text-[#4A0404] mb-2">
              {lang === "en" ? current.title : current.titleEs}
            </h3>
            <p className="text-sm text-[#4A0404]/60">
              {lang === "en" ? current.service : current.serviceEs}
            </p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-3">
          {TRANSFORMATIONS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveIndex(index);
                setSliderPosition(50);
              }}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                activeIndex === index
                  ? "border-[#4A0404] shadow-lg scale-110"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={item.after} alt="" width={80} height={80} className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
