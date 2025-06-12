import type { SanityDocument } from "next-sanity";

import { defineQuery } from "next-sanity";

import { sanityClient } from "@/lib/sanity";
import { PostList } from "@/components/layout/post-list";
import { Pagination } from "@/components/layout/pagination";

const POSTS_PER_PAGE = 6;

const POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[$offset...$limit]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt
}`);

const POSTS_COUNT_QUERY = defineQuery(`count(*[
  _type == "post"
  && defined(slug.current)
])`);

const options = { next: { revalidate: 30 } };

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const limit = offset + POSTS_PER_PAGE;

  const [posts, totalPosts] = await Promise.all([
    sanityClient.fetch<SanityDocument[]>(
      POSTS_QUERY,
      { offset, limit },
      options,
    ),
    sanityClient.fetch<number>(POSTS_COUNT_QUERY, {}, options),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <PostList posts={posts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
}
