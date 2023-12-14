const { PrismaClient } = require("@prisma/client");
const { categories } = require("../lib/placeholder-data");

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  for (const category of categories) {
    const categoryExists = await prisma.category.findUnique({
      where: { slug: category.slug },
    });

    if (!categoryExists) {
      await prisma.category.create({
        data: category,
      });
      console.log(`Created category with slug: ${category.slug}`);
    }
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
