import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ImageCard({ post }) {
  const { push } = useRouter();

  return (
    // <div className="relative w-[216px] h-[216px] cursor-pointer">
    <div className="relative w-[382px] h-[255px] cursor-pointer">
      <Image
        onClick={() => push(`/details/${post.id}`)}
        className="rounded-2xl"
        alt=""
        src={post.imageUrl}
        fill
      />
    </div>
  );
}
