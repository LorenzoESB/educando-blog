"use client";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GhostService } from "@/lib/ghost-service";
import { Button } from "@/components/ui/button";

export default async function Posts({ searchParams }: { searchParams?: { page?: string } }) {
    const rawPage = searchParams?.page;
    const pageNumber = Number(rawPage ?? 1);
    const page = Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
    const perPage = 10;

    const { posts, pagination } = await GhostService.getPostsWithPagination(page, perPage);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Meu Blog Ghost + Next.js</h1>
                <p className="text-gray-600">Blog alimentado por Ghost CMS e Next.js</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {post.feature_image && (
                            <div className="relative h-48">
                                {/* <Image src={post.feature_image} alt={post.title} fill className="object-cover" /> */}
                            </div>
                        )}

                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                                <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
                                    {post.title}
                                </Link>
                            </h2>

                            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <time dateTime={post.published_at}>
                                    {format(new Date(post.published_at), "dd/MM/yyyy", { locale: ptBR })}
                                </time>

                                {post.authors && <span>Por {post.authors[0].name}</span>}
                            </div>

                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {post.tags.slice(0, 3).map((tag) => (
                                        <Link
                                            key={tag.id}
                                            href={`/tags/${tag.slug}`}
                                            className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-700 transition-colors"
                                        >
                                            {tag.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {pagination.pages > 1 && (
                <div className="flex justify-center mt-12 space-x-4">
                    <Button className="bg-blue-200">Anterior</Button>
                    <span className="px-4 py-2">
                        Página {pagination.page} de {pagination.pages}
                    </span>
                    <Button className="bg-blue-200">Próxima</Button>
                </div>
            )}
        </div>
    );
}
