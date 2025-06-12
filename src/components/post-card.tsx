import type { SanityDocument } from "next-sanity";

import { PortableText } from "next-sanity";
import { Link } from "@heroui/link";

interface PostCardProps {
  post: SanityDocument;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <article className={`space-y-3 ${className || ""}`}>
      <div className="space-y-1">
        <Link className="hover:underline" href={`/post/${post.slug.current}`}>
          <h2 className="text-2xl font-semibold">{post.title}</h2>
        </Link>
        <p className="text-sm text-default-600">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      </div>

      {post.excerpt && (
        <div className="prose prose-sm max-w-none">
          {Array.isArray(post.excerpt) && post.excerpt.length > 0 ? (
            <PortableText value={post.excerpt} />
          ) : typeof post.excerpt === "string" ? (
            <p>{post.excerpt}</p>
          ) : (
            <div>{post.excerpt}</div>
          )}
        </div>
      )}

      <Link
        className="inline-flex items-center text-primary hover:underline"
        href={`/post/${post.slug.current}`}
      >
        Continue reading →
      </Link>
    </article>
  );
}
