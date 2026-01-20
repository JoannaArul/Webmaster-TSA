import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import ResourceHub from "./pages/ResourceHub.jsx";
import BuildTheHub from "./pages/BuildTheHub.jsx";
import FindYou from "./pages/FindYou.jsx";
import Documentation from "./pages/Documentation.jsx";
import Mission from "./pages/Mission.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resource-hub" element={<ResourceHub />} />
        <Route path="/build-the-hub" element={<BuildTheHub />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/find-ecs" element={<FindYou />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
