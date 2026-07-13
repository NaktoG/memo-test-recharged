import type { Category } from '../domain/entities/category';

export const categories: readonly Category[] = [
  {
    id: 'languages',
    name: 'Lenguajes',
    description: 'Iconos de lenguajes de programacion clasicos y modernos.',
  },
  {
    id: 'frameworks',
    name: 'Frameworks',
    description: 'Frameworks y herramientas para construir productos digitales.',
  },
  {
    id: 'tools',
    name: 'Tools',
    description: 'Herramientas de desarrollo, productividad y plataformas.',
  },
] as const;
