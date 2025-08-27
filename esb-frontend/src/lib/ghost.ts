import GhostContentAPI from '@tryghost/content-api';
import GhostAdminAPI from '@tryghost/admin-api';

// Cliente para Content API (público, apenas leitura)
export const ghostClient = new GhostContentAPI({
  url: process.env.GHOST_API_URL!,
  key: process.env.GHOST_CONTENT_API_KEY!,
  version: 'v5.0'
});

// Cliente para Admin API (privado, leitura e escrita)
export const ghostAdminClient = new GhostAdminAPI({
  url: process.env.GHOST_API_URL!,
  key: process.env.GHOST_ADMIN_API_KEY!,
  version: 'v5.0'
});

// Tipos personalizados
export interface GhostPost {
  id: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  created_at: string;
  updated_at: string;
  published_at: string;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  authors: Array<{
    id: string;
    name: string;
    slug: string;
    profile_image: string | null;
  }>;
}

export interface GhostPage {
  id: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  created_at: string;
  updated_at: string;
  published_at: string;
}