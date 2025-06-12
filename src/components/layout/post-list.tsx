import type { SanityDocument } from "next-sanity";

import { PostCard } from "./post-card";

interface PostListProps {
  posts: SanityDocument[];
  className?: string;
}

export function PostList({ posts, className }: PostListProps) {
  return (
    <ul className={`flex flex-col gap-y-8 ${className || ""}`}>
      {posts.map((post) => (
        <li
          key={post._id}
          className="border-b border-default-200 pb-6 last:border-b-0"
        >
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
