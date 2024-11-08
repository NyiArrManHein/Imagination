import { getPostById } from "@/app/query/post/query";

export async function POST(request) {
  let detailsPost = null;
  let status = 500;

  const { postId } = await request.json();
  try {
    detailsPost = await getPostById(postId);

    status = 200;
  } catch (error) {
    console.error(error);
  }
  return new Response(JSON.stringify(detailsPost), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
