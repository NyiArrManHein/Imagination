"use client";
import { useEffect, useState } from "react";

import Input from "./Input";
import { toast } from "sonner";

export default function EditPost({ post, setPost }) {
  // const [edit,  setEditPost] = useState(post);
  const [etitle, esetTitle] = useState(post.title || "");
  const [edescription, esetDescription] = useState(post.description || "");
  const [ehashtags, esetHashtags] = useState(post.hashtags || "");

  const handleEdit = async (e) => {
    e.preventDefault();
    const tags = ehashtags
      .trim()
      .split(" ")
      .filter((tag) => tag !== "");
    const isValid = tags.every((tag) => tag.startsWith("#"));
    if (!isValid) {
      toast("Please add '#' before each tag.");
    } else {
      const data = {
        postId: post.id,
        title: etitle,
        description: edescription,
        tag: ehashtags,
      };

      const res = await fetch("/api/post/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const { updatedPost, message } = await res.json();
      if (res.ok) {
        setPost(updatedPost);
      }
      toast(message);
    }
  };

  return (
    <form onSubmit={handleEdit} className="gird grid-cols-1 gap-2 p-20">
      <Input
        id="title"
        label="Title"
        type="text"
        value={etitle}
        controller={esetTitle}
      />

      <Input
        id="description"
        label="Description"
        type="text"
        value={edescription}
        controller={esetDescription}
      />

      <Input
        id="hashtags"
        label="Tagged topics"
        value={ehashtags}
        controller={esetHashtags}
      />

      <div className="grid grid-cols-2 gap-2 mt-3">
        <input
          type="submit"
          value="Save"
          className="rounded-full bg-gray-100 p-4 me-2"
        />
        {/* <button className="rounded-full bg-black text-white p-4 me-2">
          Cancel
        </button> */}
      </div>
    </form>
  );
}
