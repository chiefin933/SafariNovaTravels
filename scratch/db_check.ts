import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function check() {
  const packageCount = await prisma.package.count();
  const destinationCount = await prisma.destination.count();
  const blogPostCount = await prisma.blogPost.count();

  console.log(JSON.stringify({
    packages: packageCount,
    destinations: destinationCount,
    blogPosts: blogPostCount
  }, null, 2));

  await prisma.$disconnect();
}

check();
