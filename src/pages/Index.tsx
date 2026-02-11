import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CourseHighlights from "@/components/CourseHighlights";
import UniversitiesSection from "@/components/UniversitiesSection";
import FeaturesSection from "@/components/FeaturesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CourseHighlights />
      <UniversitiesSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
