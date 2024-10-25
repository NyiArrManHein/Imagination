import Image from "next/image";

export default function ImageCard() {
  return (
    <div>
      <Image
        className="rounded-2xl"
        src="/naruto.jpg"
        width={250}
        height={250}
      />
    </div>
  );
}
