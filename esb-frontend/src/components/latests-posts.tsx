import { GhostService } from "@/lib/ghost-service";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, User } from "lucide-react";
import Link from "next/link";

export default async function LatestsPosts() {
    const blogPosts = await GhostService.getPosts(5);
    console.log(blogPosts.map(p => p.slug));
    return (
        <section className="py-20 bg-background" id="blog">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Veja os <span className="gradient-text">artigos mais recentes</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Conteúdo especializado para você ficar por dentro das tendências e novidades do mercado
                        financeiro
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {blogPosts.map((post, index) => (
                        <Link key={post.title} href={`/posts/biblicamente-responsaveis`}>
                            <Card
                                className="group hover:shadow-custom-lg transition-all duration-300 hover:scale-105 bg-card border-border/50 overflow-hidden animate-scale-in cursor-pointer"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={post.feature_image!}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between pt-3 border-t border-border/30">
                                        <div className="flex items-center space-x-2">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            {/* <span className="text-sm text-muted-foreground">
                                            {(post.authors ?? []).map((a) => a.name).join(", ")}
                                        </span> */}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="group-hover:text-primary transition-colors duration-300"
                                        >
                                            Ler mais
                                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="group">
                        Ver todos os artigos
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
