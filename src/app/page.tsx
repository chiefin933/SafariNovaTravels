import { Hero } from "@/components/home/Hero";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDestinations />
      <FeaturedPackages />
      <WhyChooseUs />
      <Newsletter />
    </>
  );
}

