"use client";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";

import { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import EditPost from "@/app/components/EditPost";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function details({ params }) {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const fetchPosts = async () => {
    const res = await fetch("/api/details/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: Number(params.postId) }),
    });
    const detailsPost = await res.json();

    if (res.ok) {
      setPost(detailsPost);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async () => {
    const data = {
      postId: post.id,
      imageUrl: post.imageUrl,
    };
    const res = await fetch("/api/post", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const { deletePost, message } = await res.json();
    if (res.ok) {
      push("/");
    }
  };
  return (
    <div className="flex justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1">
            {/* <div className="relative w-[500px] h-[500px]"> */}
            <div className="relative w-[693px] h-[462px]">
              <Image className="object-fill" src={post.imageUrl} alt="" fill />
            </div>
            <div className="flex flex-row justify-between mt-5">
              <div>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <p>{post.hashtags}</p>
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer dropdown-toggle">
                  <BsThreeDots size={30} />
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
                >
                  <li>
                    <a
                      onClick={() =>
                        document.getElementById("edit_modal").showModal()
                      }
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a onClick={handleDelete}>Delete</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Modal id="edit_modal">
            <EditPost post={post} setPost={setPost} />
          </Modal>
        </>
      )}
    </div>
  );
}
