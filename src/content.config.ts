import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
    status: z.enum(['wip', 'completed']),
    featured: z.boolean().default(false),
    publish: z.boolean().default(true),
    summary: z.string(),
    role: z.string().optional(),
    year: z.number().optional(),
    stack: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    // Screenshot gallery. Paths are site-absolute (e.g. /shots/foo/bar.jpg).
    // Every shot needs alt text: these carry most of what a visual project
    // communicates, so leaving them undescribed loses the work entirely for
    // anyone not seeing them.
    shots: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        }),
      )
      .default([]),
    links: z
      .object({
        live: z.string().optional(),
        demo: z.string().optional(),
        repo: z.string().optional(),
        video: z.string().optional(),
        poster: z.string().optional(),
        doc: z.string().optional(),
      })
      .default({}),
    updated: z.coerce.date().optional(),
    // source/date/type/ai-first are vault-only fields; stripped by the schema.
  }),
});

export const collections = { projects };
