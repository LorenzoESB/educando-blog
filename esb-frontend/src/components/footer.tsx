import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-muted/50 border-t">
            {/* Main */}
            <div className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Brand */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-primary rounded-lg px-2.5 py-2">
                                    <span className="text-white font-bold text-xl leading-none">EB</span>
                                </div>
                                <div>
                                    <h3 className="gradient-text text-lg font-bold">Educando Seu Bolso</h3>
                                    <p className="text-muted-foreground text-sm">Educação financeira moderna</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                Conteúdo descomplicado para facilitar suas decisões financeiras. Rankings, simuladores e
                                artigos especializados.
                            </p>
                            <div className="flex gap-2">
                                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                                    <Button key={i} variant="ghost" size="icon" className="hover:text-primary">
                                        <Icon className="h-5 w-5" />
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Rankings */}
                        <div>
                            <h4 className="font-semibold mb-4">Rankings</h4>
                            <ul className="space-y-2 text-sm">
                                {[
                                    "Máquinas de cartão",
                                    "Contas digitais",
                                    "Carro por assinatura",
                                    "Cartões de crédito",
                                    "Empréstimos",
                                ].map((t) => (
                                    <li key={t}>
                                        <Link
                                            href="#"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {t}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Ferramentas */}
                        <div>
                            <h4 className="font-semibold mb-4">Ferramentas</h4>
                            <ul className="space-y-2 text-sm">
                                {[
                                    "Simulador de amortização",
                                    "Calculadora de juros",
                                    "Simulador de investimentos",
                                    "Comparador de produtos",
                                    "Planejador financeiro",
                                ].map((t) => (
                                    <li key={t}>
                                        <Link
                                            href="#"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {t}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contato */}
                        <div className="space-y-4">
                            <h4 className="font-semibold">Contato</h4>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4" />
                                    <span>contato@educandoseubolso.com.br</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4" />
                                    <span>+55 (11) 99999-9999</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4" />
                                    <span>São Paulo, SP - Brasil</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <h5 className="font-medium mb-1">Horário de atendimento</h5>
                                <p className="text-sm text-muted-foreground">
                                    Segunda a sexta: 9h às 18h
                                    <br />
                                    Sábado: 9h às 14h
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Bottom */}
            <div className="py-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                        <p className="text-muted-foreground">
                            © 2024 Educando Seu Bolso. Todos os direitos reservados.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            {["Política de Privacidade", "Termos de Uso", "Cookies", "Sobre nós"].map((t) => (
                                <Link
                                    key={t}
                                    href="#"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {t}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
