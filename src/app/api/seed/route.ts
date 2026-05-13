import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { PackageStatus } from "@prisma/client";

const allDestinations = [
  // Budget Trekking Destinations (Using highly realistic photography)
  { name: "Nepal", slug: "nepal", country: "Nepal", continent: "Asia", description: "The ultimate budget trekking paradise in the Himalayas.", mainImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1080" },
  { name: "Peru", slug: "peru", country: "Peru", continent: "South America", description: "Ancient trails and Andean adventures. Home to Machu Picchu.", mainImage: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1080" },
  { name: "Vietnam", slug: "vietnam", country: "Vietnam", continent: "Asia", description: "Affordable mountains and stunning rice terraces in Sapa.", mainImage: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1080" },
  { name: "Kyrgyzstan", slug: "kyrgyzstan", country: "Kyrgyzstan", continent: "Asia", description: "Central Asia's hidden adventure gem with nomadic culture.", mainImage: "https://images.unsplash.com/photo-1569531810315-3ce307593986?q=80&w=1080" },
  { name: "India", slug: "india", country: "India", continent: "Asia", description: "Diverse treks from Himalayan passes to tropical jungles.", mainImage: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1080" },
  { name: "Bolivia", slug: "bolivia", country: "Bolivia", continent: "South America", description: "Rugged landscapes and high-altitude Andean adventure.", mainImage: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1080" },
  { name: "Indonesia", slug: "indonesia", country: "Indonesia", continent: "Asia", description: "Volcano treks and island adventures in Bali and Lombok.", mainImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1080" },
  { name: "Morocco", slug: "morocco", country: "Morocco", continent: "Africa", description: "Desert and mountain treks in the Atlas and Sahara.", mainImage: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1080" },
  { name: "Georgia", slug: "georgia", country: "Georgia", continent: "Europe", description: "Europe's affordable trekking secret in the Caucasus Mountains.", mainImage: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1080" },
  { name: "Tanzania", slug: "tanzania", country: "Tanzania", continent: "Africa", description: "Beyond safaris—home to Mount Kilimanjaro and Mount Meru.", mainImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1080&auto=format&fit=crop" },
  { name: "South Africa", slug: "south-africa", country: "South Africa", continent: "Africa", description: "Vibrant cities and the stunning Cape Mountain ranges.", mainImage: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=1080&auto=format&fit=crop" },
  { name: "Masai Mara", slug: "masai-mara", country: "Kenya", continent: "Africa", description: "Iconic African savannah and wildlife.", mainImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1080&auto=format&fit=crop" },
  { name: "Zanzibar", slug: "zanzibar", country: "Tanzania", continent: "Africa", description: "Pristine beaches and historic Stone Town.", mainImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1080" },
  { name: "Queenstown", slug: "queenstown", country: "New Zealand", continent: "Oceania", description: "Adventure capital of the world.", mainImage: "https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=1080" },
  { name: "Iceland", slug: "iceland", country: "Iceland", continent: "Europe", description: "Land of fire and ice. Volcanoes and glaciers.", mainImage: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1080" },
  { name: "Patagonia", slug: "patagonia", country: "Chile", continent: "South America", description: "Rugged wilderness and remote landscapes.", mainImage: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=1080" },
  { name: "Costa Rica", slug: "costa-rica", country: "Costa Rica", continent: "North America", description: "Jungle and ocean adventures.", mainImage: "https://images.unsplash.com/photo-1519922639192-e73293ca430e?q=80&w=1080" }
];

export async function GET() {
  try {
    // 1. Seed Destinations
    for (const dest of allDestinations) {
      await db.destination.upsert({
        where: { slug: dest.slug },
        update: dest,
        create: dest,
      });
    }

    const nepal = await db.destination.findUnique({ where: { slug: "nepal" } });
    const peru = await db.destination.findUnique({ where: { slug: "peru" } });
    const vietnam = await db.destination.findUnique({ where: { slug: "vietnam" } });
    const tanzania = await db.destination.findUnique({ where: { slug: "tanzania" } });
    const iceland = await db.destination.findUnique({ where: { slug: "iceland" } });
    const patagonia = await db.destination.findUnique({ where: { slug: "patagonia" } });
    const morocco = await db.destination.findUnique({ where: { slug: "morocco" } });
    const queenstown = await db.destination.findUnique({ where: { slug: "queenstown" } });
    const costarica = await db.destination.findUnique({ where: { slug: "costa-rica" } });
    const mara = await db.destination.findUnique({ where: { slug: "masai-mara" } });
    const southafrica = await db.destination.findUnique({ where: { slug: "south-africa" } });

    if (nepal && peru && vietnam && tanzania && iceland && patagonia && morocco && queenstown && costarica && mara && southafrica) {

      // 2. Seed Sample Packages with realistic trekking photos
      const packages = [
        {
          title: "Annapurna Circuit Trek",
          slug: "annapurna-circuit",
          description: "A 12-day journey through the heart of the Himalayas. Stay in local tea houses and cross the Thorong La Pass.",
          price: 850,
          duration: 12,
          images: ["https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1080"],
          destinationId: nepal.id,
          status: PackageStatus.PUBLISHED,
          availability: 20,
          category: "Trekking"
        },
        {
          title: "Classic Inca Trail to Machu Picchu",
          slug: "inca-trail-classic",
          description: "Follow the footsteps of the Incas on this legendary 4-day trek through the Andes mountains.",
          price: 650,
          duration: 4,
          images: ["https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=1080"],
          destinationId: peru.id,
          status: PackageStatus.PUBLISHED,
          availability: 12,
          category: "History"
        },
        {
          title: "Sapa Valley Rice Terrace Hike",
          slug: "sapa-rice-terraces",
          description: "Explore the emerald green rice terraces of Northern Vietnam and stay with local hill tribes.",
          price: 450,
          duration: 5,
          images: ["https://images.unsplash.com/photo-1504457047772-27faf1c00561?q=80&w=1080"],
          destinationId: vietnam.id,
          status: PackageStatus.PUBLISHED,
          availability: 25,
          category: "Culture"
        },
        {
          title: "Mount Kilimanjaro - Marangu Route",
          slug: "kilimanjaro-marangu",
          description: "Reach the 'Roof of Africa' on this 6-day trek up the world's tallest free-standing mountain.",
          price: 2100,
          duration: 6,
          images: ["https://images.unsplash.com/photo-1490761668535-3149d28a4013?q=80&w=1080"],
          destinationId: tanzania.id,
          status: PackageStatus.PUBLISHED,
          availability: 10,
          category: "Adventure"
        },
        {
          title: "Northern Lights & Glaciers",
          slug: "iceland-northern-lights",
          description: "Experience the magic of the Aurora Borealis and explore the stunning waterfalls and glaciers of South Iceland.",
          price: 1800,
          duration: 7,
          images: ["https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1080"],
          destinationId: iceland.id,
          status: PackageStatus.PUBLISHED,
          availability: 15,
          category: "Nature"
        },
        {
          title: "Patagonia W Trek Expedition",
          slug: "patagonia-w-trek",
          description: "Trek through the iconic granite towers and azure lakes of Torres del Paine National Park.",
          price: 1450,
          duration: 9,
          images: ["https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=1080"],
          destinationId: patagonia.id,
          status: PackageStatus.PUBLISHED,
          availability: 12,
          category: "Trekking"
        },
        {
          title: "Sahara Desert Luxury Camp",
          slug: "morocco-sahara-expedition",
          description: "Ride camels into the sunset and sleep under the stars in a luxury nomadic camp in Merzouga.",
          price: 950,
          duration: 4,
          images: ["https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1080"],
          destinationId: morocco.id,
          status: PackageStatus.PUBLISHED,
          availability: 18,
          category: "Adventure"
        },
        {
          title: "Queenstown Adrenaline Rush",
          slug: "queenstown-adrenaline",
          description: "The ultimate thrill-seeker package including bungy jumping, jet boating, and skydiving.",
          price: 1200,
          duration: 5,
          images: ["https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=1080"],
          destinationId: queenstown.id,
          status: PackageStatus.PUBLISHED,
          availability: 30,
          category: "Extreme"
        },
        {
          title: "Costa Rica Jungle Zipline",
          slug: "costa-rica-jungle",
          description: "Soar through the rainforest canopy and discover hidden waterfalls in the land of Pura Vida.",
          price: 880,
          duration: 6,
          images: ["https://images.unsplash.com/photo-1596436889210-94d075253df6?q=80&w=1080"],
          destinationId: costarica.id,
          status: PackageStatus.PUBLISHED,
          availability: 25,
          category: "Nature"
        },
        {
          title: "Masai Mara Great Migration",
          slug: "masai-mara-classic",
          description: "Witness the spectacular wildebeest migration and search for the Big Five in Kenya's most famous park.",
          price: 1600,
          duration: 5,
          images: ["https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1080"],
          destinationId: mara.id,
          status: PackageStatus.PUBLISHED,
          availability: 14,
          category: "Safari"
        },
        {
          title: "Cape Town & Garden Route",
          slug: "cape-town-garden-route",
          description: "Discover the magic of the Mother City and the scenic beauty of the Garden Route. From Table Mountain to wild coastlines.",
          price: 1850,
          duration: 10,
          images: ["https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1080&auto=format&fit=crop"],
          destinationId: southafrica.id,
          status: PackageStatus.PUBLISHED,
          availability: 15,
          category: "Adventure"
        }
      ];


      for (const pkg of packages) {
        await db.package.upsert({
          where: { slug: pkg.slug },
          update: pkg,
          create: pkg,
        });
      }
    }

    // 3. Seed Blog Posts with realistic journalism photos
    const allPosts = [
      {
        title: "Top Budget-Friendly National Parks, Hotels, and Beaches",

        slug: "budget-adventure-guide",
        excerpt: "Adventure travel doesn’t have to drain your savings. Discover the world's most breathtaking budget-friendly destinations.",
        content: `For travelers chasing adventure without spending a fortune, the perfect trip usually combines three things: breathtaking nature, affordable accommodation, and unforgettable outdoor experiences.

# 🌲 Best Budget-Friendly National Parks
## 1. Serengeti National Park
One of Africa’s most iconic wildlife destinations, famous for the Great Migration. Affordable camping safaris and incredible wildlife photography opportunities make it a top choice for adventure seekers.

## 2. Banff National Park
A paradise for hikers and mountain lovers. Explore Lake Louise hiking trails, canoeing, and mountain biking.

## 3. Torres del Paine National Park
One of South America’s most spectacular trekking destinations. The famous W Trek offers dramatic peaks, glaciers, and wild landscapes.

# 🏨 Affordable Hotels for Adventure Travelers

From Selina La Fortuna in Costa Rica to Zostel Leh in the Himalayas, there are incredible budget stays that cater to adventurers.

# 🏖️ Best Budget Adventure Beaches
Diani Beach in Kenya and El Nido in the Philippines offer crystal-clear waters and affordable island hopping tours.`,
        image: "https://images.unsplash.com/photo-1533724141066-40df10444f3c75?q=80&w=1080&auto=format&fit=crop",
        author: "Adventure Guide",
        category: "Budget Travel",
        published: true
      },
      {
        title: "10 Tips for Your First African Safari",
        slug: "tips-first-african-safari",
        excerpt: "Everything you need to know before heading into the wild. From what to pack to the best time to visit.",
        content: "Detailed guide about African safaris with real-world advice on gear, timing, and wildlife behavior...",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1080&auto=format&fit=crop",
        author: "Jane Traveler",
        category: "Travel Tips",
        published: true
      },
      {
        title: "The Ultimate Guide to Zanzibar's Best Beaches",
        slug: "zanzibar-beach-guide",
        excerpt: "Discover the hidden gems of the spice island. Crystal clear waters and white sand await you.",
        content: "From Nungwi to Paje, we explore the most authentic coastal experiences on the island...",
        image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1080&auto=format&fit=crop",
        author: "Marcus Beach",
        category: "Destinations",
        published: true
      }
    ];


    for (const post of allPosts) {
      await db.blogPost.upsert({
        where: { slug: post.slug },
        update: post,
        create: post,
      });
    }

    return NextResponse.json({ message: "Successfully seeded with high-quality realistic photography!" });
  } catch (error) {
    console.error("Seeding failed:", error);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
