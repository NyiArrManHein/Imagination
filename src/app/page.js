"use client";

import { useEffect, useState } from "react";
import ImageCard from "./components/ImageCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const res = await fetch("/api/post/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const posts = await res.json();
    if (res.ok) {
      setPosts(posts);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {posts.length > 0 ? (
            posts.map((post) => <ImageCard key={post.id} post={post} />)
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      )}
    </div>
  );
}
