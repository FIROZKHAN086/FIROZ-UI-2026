'use client';


import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

type Project = {
    title: string;
    description: string;
    image: string;
    category: string;
    tags: string[];
    live: string;
    github: string;
  };

export default function ProjectCard({ project } : { project: Project }) {


  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative w-full max-w-sm rounded-[32px] overflow-hidden bg-neutral-900 text-white shadow-xl group"
    >
      {/* IMAGE */}
      <div className="relative h-[260px]">
        <Image
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
            width={400} height={260}
        />

        {/* TOP RIGHT BADGE */}
        <div className="absolute top-4 right-4 rounded-full bg-black/60 px-4 py-1 text-sm backdrop-blur">
          {project.category}
        </div>

        {/* IMAGE GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold leading-tight">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-neutral-300 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* TAGS */}
    
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-3 pt-2">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full bg-white py-3 text-center text-sm font-semibold text-black transition hover:bg-neutral-200"
          >
            Live Demo
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full border border-white/20 px-4 transition hover:bg-white/10"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
