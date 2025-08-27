import { NextRequest, NextResponse } from 'next/server';
import { GhostService } from '@/lib/ghost-service';

// GET - Buscar posts
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const tag = searchParams.get('tag');

        let result;

        if (tag) {
            const posts = await GhostService.getPostsByTag(tag, limit);
            result = { posts, pagination: null };
        } else {
            result = await GhostService.getPostsWithPagination(page, limit);
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Erro na API:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar posts' },
            { status: 500 }
        );
    }
}

// POST - Criar novo post (requer autenticação)
// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const { title, html, status = 'draft', tags } = body;

//         if (!title || !html) {
//             return NextResponse.json(
//                 { error: 'Título e conteúdo são obrigatórios' },
//                 { status: 400 }
//             );
//         }

//         const post = await GhostService.createPost({
//             title,
//             html,
//             status,
//             tags
//         });

//         return NextResponse.json(post, { status: 201 });
//     } catch (error) {
//         console.error('Erro ao criar post:', error);
//         return NextResponse.json(
//             { error: 'Erro ao criar post' },
//             { status: 500 }
//         );
//     }
// }