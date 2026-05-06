'use client';

import { useLayoutEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  text: string;
  name: string;
  role: string;
  stars?: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    text: 'Exceptional execution across design systems and interactive engineering. Clean, intentional work that sets a high bar.',
    name: 'Alex Chen',
    role: 'Lead Designer, Google',
    stars: 5,
  },
  {
    text: 'The motion design is thoughtful and purposeful. Every interaction has a reason. That clarity is rare.',
    name: 'Sarah Mitchell',
    role: 'Director of Motion, Figma',
    stars: 5,
  },
  {
    text: 'Frontend work of this caliber — performance, accessibility, and elegance all in harmony.',
    name: 'James Garrett',
    role: 'Principal Engineer, Netflix',
    stars: 5,
  },
  {
    text: 'A systems thinker who codes. Rare combination. The architectural decisions show deep experience.',
    name: 'Emma Rodriguez',
    role: 'VP Engineering, Stripe',
    stars: 5,
  },
  {
    text: 'Portfolio that actually showcases the work instead of distracting from it. Understands restraint.',
    name: 'Marcus Johnson',
    role: 'Creative Director, Studio',
    stars: 5,
  },
];

const FOCAL = 900;
const SPACING = 700;
const SIDE = 320;

const WORLD_Z = TESTIMONIALS.map((_, i) => (i + 1) * SPACING);
const WORLD_X = TESTIMONIALS.map((_, i) => (i % 2 === 0 ? -SIDE : SIDE));
const TOTAL_TRAVEL = (TESTIMONIALS.length + 1) * SPACING;

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="relative flex flex-col gap-4 p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden w-[min(420px,90vw)]">
      <div className="absolute top-4 right-6 text-6xl font-serif text-zinc-700 leading-none select-none pointer-events-none">
        "
      </div>

      <div className="flex gap-1">
        {Array.from({ length: t.stars ?? 5 }).map((_, i) => (
          <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-base text-zinc-300 leading-relaxed relative z-10">{t.text}</p>

      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-zinc-800">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-white">{t.name[0]}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-zinc-400">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsScene() {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 640) return;

    const outer = outerRef.current;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
    if (!outer || cards.length === 0) return;

    const cam = { z: 0 };

    const updateCards = () => {
      cards.forEach((card, i) => {
        const relZ = WORLD_Z[i] - cam.z;

        if (relZ <= 0) {
          gsap.set(card, { opacity: 0, pointerEvents: 'none' });
          return;
        }

        const rawScale = FOCAL / relZ;
        const scale = Math.min(rawScale, 2.8);
        const screenX = WORLD_X[i] * rawScale;

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: screenX,
          scale,
          opacity: 1,
          pointerEvents: 'none',
        });
      });
    };

    updateCards();

    const tl = gsap.timeline({ onUpdate: updateCards });
    tl.to(cam, { z: TOTAL_TRAVEL, duration: 1, ease: 'none' });

    const st = ScrollTrigger.create({
      trigger: outer,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      animation: tl,
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* Desktop perspective walk */}
      <div
        ref={outerRef}
        className="hidden sm:block relative"
        style={{
          height: `${(TESTIMONIALS.length + 1) * 100}vh`,
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
        }}
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
          <div className="absolute top-12 inset-x-0 flex justify-center z-20 pointer-events-none">
            <p className="text-3xl font-light text-white tracking-wide">Trusted by leaders</p>
          </div>

          <div className="relative w-full h-full">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  zIndex: TESTIMONIALS.length - i,
                }}
              >
                <Card t={t} />
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 inset-x-0 flex justify-center z-20 pointer-events-none">
            <p className="text-xs text-zinc-500 animate-pulse">scroll to continue ↓</p>
          </div>
        </div>
      </div>

      {/* Mobile stacked list */}
      <div className="sm:hidden py-16 px-4 bg-black">
        <h2 className="text-2xl font-light text-white text-center mb-12 tracking-wide">Trusted by leaders</h2>
        <div className="flex flex-col gap-6 max-w-md mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </>
  );
}
