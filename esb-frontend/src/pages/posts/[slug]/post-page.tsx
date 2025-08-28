import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import parse from 'html-react-parser';
import { GhostService } from '@/lib/ghost-service';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  console.log('Parâmetros recebidos:', params);
  const post = await GhostService.getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Cabeçalho do post */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <time dateTime={post.published_at}>
            Publicado em {format(new Date(post.published_at), 'dd/MM/yyyy', { locale: ptBR })}
          </time>
          
          {post.authors[0] && (
            <span>Por {post.authors[0].name}</span>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-full text-sm text-blue-800 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Imagem de destaque */}
      {post.feature_image && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Conteúdo do post */}
      <div className="prose prose-lg max-w-none mb-8">
        {parse(post.html)}
      </div>

      {/* Navegação */}
      <div className="border-t pt-8">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Voltar para o blog
        </Link>
      </div>
    </article>
  );
}

// Gerar metadados para SEO
export async function generateMetadata({ params }: PostPageProps) {
  const post = await GhostService.getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post não encontrado'
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.feature_image ? [{ url: post.feature_image }] : [],
    },
  };
}