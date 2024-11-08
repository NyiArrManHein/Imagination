import {
  createPost,
  deletePostById,
  getPost,
  updatePost,
} from "@/app/query/post/query";
import { firebaseDelete, firebaseUpload, isAuth } from "@/app/lib/util";

export async function GET() {
  let posts = null;
  let status = 500;

  try {
    posts = await getPost();
    // console.log("Api fetched posts", posts);
    if (posts) {
      status = 200;
    } else {
      status = 400;
    }
  } catch (error) {
    console.error(error);
  }

  return new Response(JSON.stringify(posts), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

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

export async function PATCH(request) {
  let updatedPost = null;
  let message = "";
  let status = 500;
  try {
    const { postId, title, description, tag } = await request.json();

    const { dbPost, msg } = await updatePost(postId, title, description, tag);
    updatedPost = dbPost;
    message = msg;
    if (updatedPost) {
      status = 200;
    } else {
      status = 400;
    }
  } catch (error) {
    status = 500;
  }
  console.log("ApiUpdatedPost", updatedPost);
  return new Response(JSON.stringify({ updatedPost, message }), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(request) {
  let status = 500;
  let deletePost = null;
  let message = "";
  try {
    const { postId, imageUrl } = await request.json();
    const { dbPost, msg } = await deletePostById(postId);
    deletePost = dbPost;
    message = msg;
    if (deletePost) {
      const imageDelete = await firebaseDelete(imageUrl);
      if (!imageDelete) {
        message =
          "Post deleted from database, but failed to delete image from storage.";
      }
      status = 200;
    } else {
      status = 400;
    }
  } catch (error) {
    console.log(error);
  }

  return new Response(JSON.stringify({ deletePost, message }), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
