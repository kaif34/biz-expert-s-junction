import { Routes, Route } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";
import { IndexPage } from "./pages/IndexPage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ContactPage } from "./pages/ContactPage";
import { ClientsPage } from "./pages/ClientsPage";
import { IndustriesPage } from "./pages/IndustriesPage";
import { MissionVisionPage } from "./pages/MissionVisionPage";
import { ProcessPage } from "./pages/ProcessPage";
import { WhyUsPage } from "./pages/WhyUsPage";
import { TermsPage } from "./pages/TermsPage";
import { CareersPage } from "./pages/CareersPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/carrier" element={<CareersPage />} />
        <Route path="/careers-page" element={<CareersPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/mission-vision" element={<MissionVisionPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/why-us" element={<WhyUsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<IndexPage />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}
