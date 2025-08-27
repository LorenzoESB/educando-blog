'use client'
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./switch-theme";
import { Search, Menu } from "lucide-react";
import { Input } from "./ui/input";
import Link from "next/link";

const links = [
    { href: "/", label: "Início" },
    { href: "/simuladores", label: "Simuladores" },
    { href: "/posts", label: "Posts" },
    { href: "/sobre", label: "Sobre" },
];

const Header = () => {
    const pathname = usePathname();
    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-background/90 backdrop-blur-md border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="bg-gradient-primary rounded-lg px-2.5 py-2">
                            <span className="text-white font-bold text-xl leading-none">EB</span>
                        </div>
                        <div className="leading-tight">
                            <span className="gradient-text text-lg font-bold block">Educando Seu Bolso</span>
                        </div>
                    </Link>

                    {/* Navegação desktop */}
                    <nav className="hidden md:flex items-center gap-6">
                        {links.map((l) => {
                            const active = pathname === l.href;
                            return (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className={[
                                        "text-sm transition-colors",
                                        active
                                            ? "text-foreground font-medium"
                                            : "text-muted-foreground hover:text-foreground",
                                    ].join(" ")}
                                >
                                    {l.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Ações */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Busca */}
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Buscar..."
                                className="pl-8 w-56 md:w-64 bg-muted focus-visible:ring-1"
                            />
                        </div>

                        {/* CTA com gradiente */}
                        <Button className="bg-gradient-primary text-white shadow hover:opacity-90">
                            Começar agora
                        </Button>

                        {/* Tema */}
                        <ThemeToggle />
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Abrir menu">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-72">
                                <div className="mt-6 space-y-6">
                                    {/* Busca mobile */}
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input type="search" placeholder="Buscar..." className="pl-8 bg-muted" />
                                    </div>

                                    {/* Links */}
                                    <nav className="grid gap-2">
                                        {links.map((l) => (
                                            <Link
                                                key={l.href}
                                                href={l.href}
                                                className="rounded-md px-3 py-2 text-sm hover:bg-muted text-foreground"
                                            >
                                                {l.label}
                                            </Link>
                                        ))}
                                    </nav>

                                    <Button className="w-full bg-gradient-primary text-white shadow hover:opacity-90">
                                        Começar agora
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
