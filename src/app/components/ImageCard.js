import Image from "next/image";

export default function ImageCard({ post }) {
  return (
    <div className="relative w-full h-56">
      <Image className="rounded-2xl" alt="" src={post.imageUrl} fill />
    </div>
  );
}
