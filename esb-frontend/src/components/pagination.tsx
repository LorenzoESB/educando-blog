// components/Pagination.tsx
import Link from "next/link";

type Props = {
    page: number;
    pages: number;
    prev: number | null;
    next: number | null;
    // Construtor do href (permite reaproveitar em outras páginas/filtros)
    makeHref?: (page: number) => string;
};

// gera itens: 1 … (page-1,page,page+1) … pages
function buildPageItems(current: number, total: number, delta = 1) {
    const items: (number | string)[] = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    items.push(1);
    if (left > 2) items.push("…");
    for (let i = left; i <= right; i++) items.push(i);
    if (right < total - 1) items.push("…");
    if (total > 1) items.push(total);

    // se total pequeno, mostra tudo
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    // garante unicidade e ordem
    return items.filter((v, i, arr) => (i === 0 ? true : v !== arr[i - 1])).filter(Boolean);
}

export default function Pagination({ page, pages, prev, next, makeHref = (p) => `?page=${p}` }: Props) {
    if (pages <= 1) return null;

    const items = buildPageItems(page, pages, 1);

    return (
        <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Paginação">
            {/* Anterior */}
            <Link
                href={prev ? makeHref(prev) : "#"}
                aria-disabled={!prev}
                className={`px-3 py-2 rounded border text-sm ${
                    prev
                        ? "bg-white hover:bg-gray-50 border-gray-300"
                        : "bg-gray-100 text-gray-400 border-gray-200 pointer-events-none"
                }`}
            >
                Anterior
            </Link>

            {/* Números */}
            <ul className="flex items-center gap-1">
                {items.map((it, idx) =>
                    typeof it === "string" ? (
                        <li key={`ellipsis-${idx}`} className="px-3 py-2 text-sm text-gray-500 select-none" aria-hidden>
                            …
                        </li>
                    ) : (
                        <li key={it}>
                            {it === page ? (
                                <span
                                    aria-current="page"
                                    className="px-3 py-2 rounded bg-blue-600 text-white text-sm border border-blue-600"
                                >
                                    {it}
                                </span>
                            ) : (
                                <Link
                                    href={makeHref(it)}
                                    className="px-3 py-2 rounded bg-white hover:bg-gray-50 text-sm border border-gray-300"
                                >
                                    {it}
                                </Link>
                            )}
                        </li>
                    )
                )}
            </ul>

            {/* Próxima */}
            <Link
                href={next ? makeHref(next) : "#"}
                aria-disabled={!next}
                className={`px-3 py-2 rounded border text-sm ${
                    next
                        ? "bg-white hover:bg-gray-50 border-gray-300"
                        : "bg-gray-100 text-gray-400 border-gray-200 pointer-events-none"
                }`}
            >
                Próxima
            </Link>
        </nav>
    );
}
