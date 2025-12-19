import React from "react";

export default function Learn() {
  const steps = [
    {
      title: "1. Setup Environment",
      desc: "Install Node.js and the INDJS CLI to get started.",
      code: "npm install -g indjs",
      color: "bg-blue-500"
    },
    {
      title: "2. Create Project",
      desc: "Generate a new universal project from a template.",
      code: "indjs create my-app",
      color: "bg-purple-500"
    },
    {
      title: "3. Develop Features",
      desc: "Add pages to `pages/` and components to `components/`.",
      code: "export default function Page() { ... }",
      color: "bg-pink-500"
    },
    {
      title: "4. Test on Mobile",
      desc: "Connect your Android device and see changes live.",
      code: "indjs mobile:dev",
      color: "bg-orange-500"
    },
    {
      title: "5. Production Build",
      desc: "Compile optimized assets for all platforms.",
      code: "indjs build:all",
      color: "bg-green-500"
    }
  ];

  return (
    <div className="min-h-screen py-24 container mx-auto px-6">
      <div className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Learning Path</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Follow these steps to become an INDJS master.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 hidden md:block" />

        <div className="space-y-12">
          {steps.map((step, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center gap-8 group animate-fade-in-up`} style={{ animationDelay: `${i * 100}ms` }}>

              {/* Content Left (Even) or Right (Odd) */}
              <div className={`flex-1 w-full ${i % 2 === 0 ? 'md:text-right' : 'md:order-last'}`}>
                <div className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:border-indigo-500/50 transition-colors">
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-zinc-400 mb-4">{step.desc}</p>
                </div>
              </div>

              {/* Center Node */}
              <div className={`w-8 h-8 rounded-full ${step.color} border-4 border-[#030712] relative z-10 shadow-[0_0_20px_currentColor] hidden md:block`} />

              {/* Code Right (Even) or Left (Odd) */}
              <div className={`flex-1 w-full ${i % 2 === 0 ? '' : 'md:text-right'}`}>
                <div className="font-mono text-sm bg-black/50 p-4 rounded-xl border border-white/10 text-indigo-300 shadow-inner">
                  $ {step.code}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-24 animate-fade-in-up animation-delay-500">
        <a href="/docs" className="inline-flex items-center gap-2 text-indigo-400 hover:text-white transition-colors">
          View full documentation <span className="text-xl">→</span>
        </a>
      </div>
    </div>
  );
}
