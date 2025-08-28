import { ghostClient, type GhostPost, type GhostPage } from './ghost';

export class GhostService {
    static async isGhostAvailable(): Promise<boolean> {
        try {
            const response = await fetch(`${process.env.GHOST_API_URL}/ghost/api/content/settings/?key=${process.env.GHOST_CONTENT_API_KEY}`);
            return response.ok;
        } catch (error) {
            console.error('Ghost não está acessível:', error);
            return false;
        }
    }

    static async getPosts(limit = 10, page = 1): Promise<GhostPost[]> {
        try {
            const isAvailable = await this.isGhostAvailable();
            if (!isAvailable) {
                console.warn('Ghost não está disponível');
                return [];
            }

            const posts = await ghostClient.posts.browse({
                limit,
                page,
                include: ['tags', 'authors'],
                order: 'published_at DESC'
            });
            return posts as GhostPost[];
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
            return [];
        }
    }

    static async getPostBySlug(slug: string): Promise<GhostPost | null> {
        console.log('Buscando post com slug:', slug);
        try {
            const post = await ghostClient.posts.read(
                { slug }               
            );
            return post as GhostPost;
        } catch (error) {
            console.error('Erro ao buscar post:', error);
            return null;
        }
    }

    static async getPostsByTag(tagSlug: string, limit = 10): Promise<GhostPost[]> {
        try {
            const posts = await ghostClient.posts.browse({
                filter: `tag:${tagSlug}`,
                limit,
                include: ['tags', 'authors'],
                order: 'published_at DESC'
            });
            return posts as GhostPost[];
        } catch (error) {
            console.error('Erro ao buscar posts por tag:', error);
            return [];
        }
    }

    static async getTags() {
        try {
            const tags = await ghostClient.tags.browse({
                limit: 'all'
            });
            return tags;
        } catch (error) {
            console.error('Erro ao buscar tags:', error);
            return [];
        }
    }

    static async getPageBySlug(slug: string): Promise<GhostPage | null> {
        try {
            const page = await ghostClient.pages.read({ slug });
            return page as GhostPage;
        } catch (error) {
            console.error('Erro ao buscar página:', error);
            return null;
        }
    }

    static async getSettings() {
        try {
            const settings = await ghostClient.settings.browse();
            return settings;
        } catch (error) {
            console.error('Erro ao buscar configurações:', error);
            return null;
        }
    }

    static async getPostsWithPagination(page: number, limit: number) {
        try {
            const isAvailable = await this.isGhostAvailable();
            if (!isAvailable) {
                console.error('❌ Ghost não está acessível');
                throw new Error('Ghost CMS não está acessível');
            }

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Timeout na requisição')), 10000);
            });

            const requestPromise = ghostClient.posts.browse({
                limit: Number(limit),
                page: Number(page),
                include: ['tags', 'authors'],
                order: 'published_at DESC'
            });

            const posts = await Promise.race([requestPromise, timeoutPromise]);

            const postsAny = posts as any;

            return {
                posts: postsAny as GhostPost[],
                pagination: {
                    page: postsAny?.meta?.pagination?.page || 1,
                    limit: postsAny?.meta?.pagination?.limit || limit,
                    pages: postsAny?.meta?.pagination?.pages || 1,
                    total: postsAny?.meta?.pagination?.total || 0,
                    next: postsAny?.meta?.pagination?.next ?? null,
                    prev: postsAny?.meta?.pagination?.prev ?? null
                }
            };
        } catch (error: unknown) {
            const err = error as { message?: string; name?: string; stack?: string } | undefined;
            console.error('❌ Erro detalhado ao buscar posts:', {
                message: err?.message ?? String(error),
                name: err?.name ?? 'UnknownError',
                stack: err?.stack ?? undefined
            });

            return {
                posts: [],
                pagination: {
                    page: 1,
                    limit,
                    pages: 1,
                    total: 0,
                    next: null,
                    prev: null
                }
            };
        }
    }
}