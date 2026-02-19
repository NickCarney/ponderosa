"use client";

import { useState } from "react";
import {
  Navigation,
  AnnouncementBanner,
  Footer,
  HeroSectionB,
  WhyChooseSectionB,
  EssentialResourcesSectionB,
  ContactSectionB,
} from "./components";

export default function Home() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen">
      {showBanner && (
        <AnnouncementBanner onClose={() => setShowBanner(false)} />
      )}
      <Navigation />
      <HeroSectionB />
      <WhyChooseSectionB />
      <EssentialResourcesSectionB />
      <ContactSectionB />
      <Footer />
    </div>
  );
}
