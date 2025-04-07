/// <reference types="astro/client" />

// Definición de tipos para las colecciones de contenido
declare module 'astro:content' {
  interface CollectionEntry {
    id: string;
    data: {
      title: string;
      description: string;
      pubDate: Date;
      updatedDate?: Date;
      author: string;
      authorImage?: string;
      image: string;
      tags: string[];
    };
    body: string;
  }

  interface Collections {
    blog: CollectionEntry[];
  }
}
