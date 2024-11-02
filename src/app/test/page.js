"use client";
import { useEffect, useState } from "react";
import Input from "../components/Input";

import ImageUpload from "../components/ImageUpload";
import { toast } from "sonner";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebaseConfig";
import Image from "next/image";

export default function test() {
  const [imageFile, setImageFile] = useState(null);
  const [images, setImages] = useState([]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (imageFile) {
  //     const formData = new FormData();

  //     formData.append("image", imageFile);
  //     const res = await fetch("/api/upload/", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const { message } = await res.json();
  //     toast(message);
  //   } else {
  //     toast("Please fill in all the fields");
  //   }
  // };

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, "images/");
      try {
        const result = await listAll(imagesRef);
        const urls = await Promise.all(
          result.items.map((item) => getDownloadURL(item))
        );
        setImages(urls);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!imageFile) return;
    const storageRef = ref(storage, `images/${imageFile.name}`);
    try {
      await uploadBytes(storageRef, imageFile);
      // const url = await getDownloadURL(storageRef);
      toast("Image Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading the file", error);
      toast("Image Upload Failed");
    }
  };

  return (
    // <form onSubmit={handleSubmit} className="grid grid-cols-2">
    //   <ImageUpload setImageFile={setImageFile} />
    //   <div className="grid grid-cols-1">
    //     <Input
    //       id="title"
    //       label="Title"
    //       type="text"
    //       value={title}
    //       controller={setTitle}
    //     />

    //     <Input
    //       id="description"
    //       label="Description"
    //       type="text"
    //       value={description}
    //       controller={setDescription}
    //     />

    //     <Input id="tag" label="Tagged topics" value={tag} controller={setTag} />
    //   </div>
    //   <input
    //     type="submit"
    //     value="Publish"
    //     className="border rounded-3xl text-white bg-red-500 py-2 mt-3 cursor-pointer"
    //   />
    // </form>
    <div className="grid grid-cols-1 gap-6">
      <ImageUpload setImageFile={setImageFile} />
      <button onClick={handleUpload}>Upload</button>

      <h1>Gallery</h1>
      <div className="grid grid-cols-1 gap-2 p-5">
        {images.map((url, index) => (
          <>
            {/* <div key={url}>
              <Image
                src={url}
                alt={`Image ${index}`}
                width={200}
                height={200}
                layout="responsive"
              />
            </div> */}
            <p>{url}</p>
          </>
        ))}
      </div>
    </div>
  );
}
