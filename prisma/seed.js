// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  // --------- CLEAN EXISTING DATA (DEV ONLY) ---------
  // Order of deletion matters because of foreign keys
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  // --------- CREATE USERS ---------
  const adminPasswordHash = await bcrypt.hash("admin123!", 10);
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@goth.store",
      name: "Admin",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  // --------- CREATE CATEGORIES ---------
  const bracelets = await prisma.category.create({
    data: {
      name: "Bracelets",
      slug: "bracelets",
    },
  });

  const earrings = await prisma.category.create({
    data: {
      name: "Earrings",
      slug: "earrings",
    },
  });

  const necklaces = await prisma.category.create({
    data: {
      name: "Necklaces",
      slug: "necklaces",
    },
  });

  const special = await prisma.category.create({
    data: {
      name: "Special",
      slug: "special",
    },
  });

  // --------- CREATE PRODUCTS ---------

  // 1) Silver Snake Bracelet
  const snakeBracelet = await prisma.product.create({
    data: {
      title: "Silver Snake Bracelet",
      slug: "silver-snake-bracelet",
      description:
        "Adjustable silver-tone snake bracelet with gothic scales and detailed head. Perfect for dark, elegant outfits.",
      material: "Stainless steel",
      style: "Gothic",
      sku: "BR-SNAKE-001",
      basePrice: 39.0,
      currency: "USD",
      active: true,
      productType: "BRACELET",
      categoryId: bracelets.id,
      images: {
        create: [
          {
            url: "https://placehold.co/600x600.png?text=Silver+Snake+Bracelet",
            altText: "Silver snake bracelet wrapped around wrist",
            isPrimary: true,
            sortOrder: 0,
          },
          {
            url: "https://placehold.co/600x600.png?text=Bracelet+Detail",
            altText: "Close-up of snake bracelet scales",
            sortOrder: 1,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Wrist size: 6–7 in",
            sku: "BR-SNAKE-001-S",
            price: 39.0,
            stock: 10,
          },
          {
            name: "Wrist size: 7–8 in",
            sku: "BR-SNAKE-001-M",
            price: 41.0,
            stock: 8,
          },
        ],
      },
    },
  });

  // 2) Black Gothic Drop Earrings
  const gothEarrings = await prisma.product.create({
    data: {
      title: "Black Gothic Drop Earrings",
      slug: "black-gothic-drop-earrings",
      description:
        "Long black drop earrings with ornate gothic metalwork. Lightweight and dramatic for evening wear.",
      material: "Alloy, enamel",
      style: "Gothic",
      sku: "ER-GOTH-001",
      basePrice: 29.0,
      currency: "USD",
      active: true,
      productType: "EARRING",
      categoryId: earrings.id,
      images: {
        create: [
          {
            url: "https://placehold.co/600x600.png?text=Gothic+Earrings",
            altText: "Pair of black gothic drop earrings on display card",
            isPrimary: true,
            sortOrder: 0,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Standard hook",
            sku: "ER-GOTH-001-HOOK",
            price: 29.0,
            stock: 15,
          },
        ],
      },
    },
  });

  // 3) Crescent Moon Choker Necklace
  const moonNecklace = await prisma.product.create({
    data: {
      title: "Crescent Moon Choker Necklace",
      slug: "crescent-moon-choker-necklace",
      description:
        "Soft faux leather choker with silver crescent moon pendant. Adjustable length with chain extender.",
      material: "Faux leather, zinc alloy",
      style: "Gothic",
      sku: "NC-MOON-001",
      basePrice: 34.0,
      currency: "USD",
      active: true,
      productType: "NECKLACE",
      categoryId: necklaces.id,
      images: {
        create: [
          {
            url: "https://placehold.co/600x600.png?text=Moon+Choker",
            altText: "Crescent moon choker necklace on velvet stand",
            isPrimary: true,
            sortOrder: 0,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Neck size: 12–14 in",
            sku: "NC-MOON-001-S",
            price: 34.0,
            stock: 12,
          },
          {
            name: "Neck size: 14–16 in",
            sku: "NC-MOON-001-M",
            price: 34.0,
            stock: 12,
          },
        ],
      },
    },
  });

  console.log("Seeded products:", {
    snakeBracelet: snakeBracelet.id,
    gothEarrings: gothEarrings.id,
    moonNecklace: moonNecklace.id,
  });

  console.log("Seeded admin user:", adminUser.email);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
