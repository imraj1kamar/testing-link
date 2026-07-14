
import Hero from "@/components/Hero";
import Ethos from "@/components/Ethos";
import Property from "@/components/Property";
import Amenities from "@/components/Amenities";
import InfinityPool from "@/components/InfinityPool";
import CuratedStays from "@/components/CuratedStays";
import Dining from "@/components/Dining";
import EventsHighlights from "@/components/EventsHighlights";
import Gallery from "@/components/Gallery";
import NatureHighlights from "@/components/NatureHighlights";
import NearbyAttractions from "@/components/NearbyAttractions";
import FacilitiesSection from "@/components/FacilitiesSection";
// import Testimonials from "@/components/Testimonials"; 


export default function Home() {
  return (
    
    <main className=" min-h-screen text-white font-sans scroll-smooth">
      <Hero />
      <Ethos />
      <Property />
      <CuratedStays />
      <FacilitiesSection/>
      <InfinityPool />
      <Amenities />
      <Dining />
      <EventsHighlights />
      <Gallery />
      <NatureHighlights />
      <NearbyAttractions />
      {/* <Testimonials />  */}
    </main>
  );
}