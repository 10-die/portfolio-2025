'use client';

import { useEffect } from 'react';
import InteractiveHero from '@/components/InteractiveHero';
import { TestimonialsScene } from '@/components/sections/TestimonialsScene';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  useEffect(() => {
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  return (
    <main className="w-full overflow-x-hidden bg-black text-white">
      {/* Interactive 3D Hero */}
      <InteractiveHero />

      {/* Capabilities Section */}
      <section className="relative w-full py-24 px-4 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-center mb-16">Capabilities</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Design Systems',
                desc: 'Scalable, cohesive frameworks built for flexibility and consistency across products.',
              },
              {
                title: 'Frontend Engineering',
                desc: 'React, TypeScript, performance optimization, accessibility-first builds that scale.',
              },
              {
                title: 'Motion & Animation',
                desc: 'GSAP, Three.js, Framer Motion. Smooth, purposeful motion that feels natural.',
              },
              {
                title: 'Interaction Design',
                desc: 'Micro-interactions and flows that feel intuitive, responsive, and delightful.',
              },
              {
                title: 'Systems Thinking',
                desc: 'Architecture, scalability, and thoughtful technical decision-making at scale.',
              },
              {
                title: 'Creative Coding',
                desc: 'Generative art, shaders, and experimental interactions that push boundaries.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all hover:bg-zinc-800"
              >
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Scene */}
      <TestimonialsScene />

      {/* Featured Work Section */}
      <section className="relative w-full py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-center mb-16">Featured Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Design System at Scale',
                desc: 'Built and maintained a component library used across 50+ products, 200+ engineers.',
                tags: ['React', 'TypeScript', 'Storybook', 'Design Tokens'],
              },
              {
                title: 'Interactive 3D Experience',
                desc: 'Scroll-driven perspective walk system with 60fps smooth motion on mobile.',
                tags: ['Three.js', 'GSAP', 'WebGL', 'Performance'],
              },
              {
                title: 'Motion Language System',
                desc: 'Defined and implemented motion guidelines used across 10 major products.',
                tags: ['Framer Motion', 'Animation', 'Design', 'Documentation'],
              },
              {
                title: 'Real-time Collaboration UI',
                desc: 'Built multiplayer experience handling 100k+ concurrent users with sub-100ms latency.',
                tags: ['React', 'WebSockets', 'Backend', 'Optimization'],
              },
            ].map((project, idx) => (
              <a
                key={idx}
                href="#"
                className="group p-8 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm group-hover:bg-blue-900 group-hover:text-blue-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-24 px-4 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight mb-6">Let's Work Together</h2>
          <p className="text-xl text-zinc-400 mb-12">
            Whether you need a design system, interactive experience, or technical leadership—let's build something exceptional.
          </p>

          <button className="group px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 mx-auto mb-12">
            Start a Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex gap-8 justify-center pt-12 border-t border-zinc-800">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors font-medium">
              Email
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors font-medium">
              GitHub
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors font-medium">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
