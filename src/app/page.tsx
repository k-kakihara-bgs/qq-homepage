import { HeroSection } from "@/components/home/HeroSection";
import { ConceptSection } from "@/components/home/ConceptSection";
import { DualIdentity } from "@/components/home/DualIdentity";
import { NewsSection } from "@/components/home/NewsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ConceptSection />
      <DualIdentity />
      <NewsSection />
    </>
  );
}
