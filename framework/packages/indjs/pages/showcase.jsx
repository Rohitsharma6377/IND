import React from "react";

export default function Showcase() {
    const projects = [
        {
            title: "INDJS Documentation",
            desc: "The very application you are looking at now. Built with INDJS v3.0.",
            image: "📚",
            type: "Documentation",
            link: "https://indjs.dev"
        },
        {
            title: "E-Commerce Starter",
            desc: "A full-stack e-commerce template with cart, checkout, and admin panel.",
            image: "🛍️",
            type: "Web & Mobile",
            link: "#"
        },
        {
            title: "Crypto Dashboard",
            desc: "Real-time cryptocurrency tracking app with desktop widgets.",
            image: "📈",
            type: "Desk & Web",
            link: "#"
        },
        {
            title: "Task Master",
            desc: "A productivity app synched across your phone and laptop.",
            image: "✅",
            type: "Universal",
            link: "#"
        },
        {
            title: "Social Connect",
            desc: "Social media platform with real-time chat and feed.",
            image: "💬",
            type: "Social",
            link: "#"
        },
        {
            title: "Travel Guide",
            desc: "Interactive maps and guides for travelers.",
            image: "🌍",
            type: "Mobile First",
            link: "#"
        }
    ];

    return (
        <div className="min-h-screen py-24 container mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Built with INDJS</h1>
                <p className="text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    Explore the next generation of universal applications.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-300 group flex flex-col animate-fade-in-up"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <div className="h-48 bg-slate-100 dark:bg-white/5 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                            {project.image}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                                <span className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300">
                                    {project.type}
                                </span>
                            </div>
                            <p className="text-slate-600 dark:text-zinc-400 mb-6 text-sm flex-1 leading-relaxed">
                                {project.desc}
                            </p>
                            <a
                                href={project.link}
                                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm group-hover:gap-3 transition-all"
                            >
                                View Project <span>→</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-24 p-8 rounded-3xl bg-indigo-600 dark:bg-indigo-900/20 border border-indigo-500/20 text-center animate-fade-in-up animation-delay-500">
                <h2 className="text-3xl font-bold text-white mb-4">Have something to share?</h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto">
                    Built something amazing with INDJS? Submit your project to be featured in our showcase.
                </p>
                <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-lg">
                    Submit Project
                </button>
            </div>
        </div>
    );
}
