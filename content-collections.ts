import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMarkdown } from '@content-collections/markdown';
import { z } from 'zod';

const ressources = defineCollection({
  name: 'ressources',
  directory: 'src/ressources',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMarkdown(context, document);
    return {
      ...document,
      body,
    };
  },
});

export default defineConfig({
  collections: [ressources],
});
