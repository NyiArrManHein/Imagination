"use client";
import { useEffect, useState } from "react";
import Input from "../components/Input";

import ImageUpload from "../components/ImageUpload";
import { toast } from "sonner";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebaseConfig";
import Image from "next/image";

export default function create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tags = hashtags
      .trim()
      .split(" ")
      .filter((tag) => tag !== "");

    const isValid = tags.every((tag) => tag.startsWith("#"));
    if (!isValid) {
      toast("Please add '#' before each tag.");
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tag", hashtags);
      formData.append("image", imageFile);
      const res = await fetch("/api/post/", {
        method: "POST",
        body: formData,
      });
      const { message } = await res.json();
      if (res.ok) {
        toast(message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 p-7">
      {/* <input
        type="submit"
        value="Publish"
        className="absolute top-0 right-0 border rounded-3xl text-white bg-red-500 py-2 cursor-pointer"
      /> */}
      <div className="w-full h-20 relative">
        {imageFile && (
          <input
            type="submit"
            value="Publish"
            className="absolute top-0 right-0 border rounded-3xl text-white bg-red-500 p-3 cursor-pointer"
          />
        )}
      </div>
      <div className="grid xl:grid-cols-2 lg:grid-cols-1">
        <ImageUpload
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          setImageFile={setImageFile}
        />
        {imageFile && (
          <div className="grid grid-cols-1">
            <Input
              id="title"
              label="Title"
              type="text"
              value={title}
              controller={setTitle}
            />

            <Input
              id="description"
              label="Description"
              type="text"
              value={description}
              controller={setDescription}
            />

            <Input
              id="hashtags"
              label="Tagged topics"
              value={hashtags}
              controller={setHashtags}
            />
          </div>
        )}
      </div>
    </form>
  );
}
