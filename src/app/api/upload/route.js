import { firebaseUpload, isAuth } from "@/app/lib/util";
import { createPost } from "@/app/query/post/query";

export async function POST(request) {
  let message = "";
  let status = 500;

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const tag = formData.get("tag");
    const image = formData.get("image");

    const { isLoggedIn, user } = await isAuth();
    const imageUrl = await firebaseUpload(image);
    if (!imageUrl) {
      status = 500;
      message = "Image Upload failed";
    } else {
      if (isLoggedIn) {
        const { data, msg } = await createPost(
          user.id,
          title,
          description,
          tag,
          imageUrl
        );
        if (data) {
          status = 200;
          message = msg;
        }
      }
    }
  } catch (error) {
    message = "Internal Server Error";
  }

  return new Response(JSON.stringify({ message }), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
