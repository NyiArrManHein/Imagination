import prisma from "@/app/db";

export async function getPost() {
  let data = null;

  try {
    const post = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    data = post;
    // console.log("Database fetched posts", data);
  } catch (error) {
    // console.error("Error fetching posts", error);
  }
  return data;
}

export async function getPostById(postId) {
  let data = null;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    data = post;
  } catch (error) {
    console.error("Error fetching posts", error);
  }
  return data;
}

export async function createPost(userId, title, description, tag, imageUrl) {
  let data = null;
  let msg = "";
  try {
    const post = await prisma.post.create({
      data: {
        creatorId: userId,
        title: title,
        description: description,
        hashtags: tag,
        imageUrl: imageUrl,
      },
    });
    data = post;
    msg = "Post Created";
  } catch (error) {
    msg = "Post Creation Failed";
  }
  return { data, msg };
}

export async function updatePost(postId, title, description, tag) {
  let dbPost = null;
  let msg = "";
  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        title: title,
        description: description,
        hashtags: tag,
      },
    });
    dbPost = post;

    msg = "Post Updated Successfully.";
  } catch (error) {
    msg = "Post Update Failed";
  }
  console.log("DbUpdatedPost", dbPost);
  return { dbPost, msg };
}

export async function deletePostById(postId) {
  let msg = "";
  let dbPost = null;
  try {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    dbPost = post;
    msg = "Post Deleted";
  } catch (error) {
    msg = "Post deletion failed";
  }

  return { dbPost, msg };
}
