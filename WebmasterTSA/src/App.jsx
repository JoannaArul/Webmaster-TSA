import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import TheHub from "./pages/TheHub.jsx";
import GrowtheHub from "./pages/GrowtheHub.jsx";
import Discover from "./pages/Discover.jsx";
import Documentation from "./pages/Documentation.jsx";
import OurMission from "./pages/OurMission.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-mission" element={<OurMission />} />
        <Route path="/the-hub" element={<TheHub />} />
        <Route path="/grow-the-hub" element={<GrowtheHub />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
