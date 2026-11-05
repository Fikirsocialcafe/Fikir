import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import ImpactCounters from "@/components/home/ImpactCounters";
import VisualImpactBlock from "@/components/home/VisualImpactBlock";
import TransparencySection from "@/components/home/TransparencySection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <HowItWorks />
      <ImpactCounters />
      <VisualImpactBlock />
      <TransparencySection />
      <NewsletterSection />
    </>
  );
}
