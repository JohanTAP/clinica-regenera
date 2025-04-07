import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp'
        }
    },
    compressHTML: true,
    build: {
        inlineStylesheets: 'auto'
    },
    // Configuración para las colecciones de contenido
    content: {
        collections: {
            // Definir la colección 'blog'
            blog: {
                schema: {
                    type: 'content',
                    fields: {
                        title: { type: 'string', required: true },
                        description: { type: 'string', required: true },
                        pubDate: { type: 'date', required: true },
                        updatedDate: { type: 'date', required: false },
                        author: { type: 'string', required: true },
                        authorImage: { type: 'string', required: false },
                        image: { type: 'string', required: true },
                        tags: { type: 'array', items: { type: 'string' }, default: [] }
                    }
                }
            }
        }
    }
});
