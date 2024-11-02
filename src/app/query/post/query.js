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
    console.log("Database fetched posts", data);
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
