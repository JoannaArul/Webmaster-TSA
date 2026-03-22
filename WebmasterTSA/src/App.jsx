import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import ResourceHub from "./pages/ResourceHub.jsx";
import ResourceHubCalendar from "./pages/ResourceHubCalendar.jsx";
import GrowtheHub from "./pages/GrowtheHub.jsx";
import Discover from "./pages/Discover.jsx";
import Blog from "./pages/Blog.jsx";
import Resume from "./pages/Resume.jsx";
import TeacherRecommendation from "./pages/TeacherRecommendation.jsx";
import BurnedOut from "./pages/BurnedOut.jsx";
import Sleep from "./pages/Sleep.jsx";
import Major from "./pages/Major.jsx";
import Lab from "./pages/Lab.jsx";
import LinkedIn from "./pages/LinkedIn.jsx";
import PathBuilder from "./pages/PathBuilder.jsx";
import ReferencePage from "./pages/ReferencePage.jsx";
import OurMission from "./pages/OurMission.jsx";
import Support from "./pages/Support.jsx";
import BeyondTheClassroom from "./pages/BeyondTheClassroom.jsx";
import TwoMinuteReset from "./pages/TwoMinuteReset.jsx";
import FocusSpace from "./pages/FocusSpace.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-mission" element={<OurMission />} />
        <Route path="/resource-hub" element={<ResourceHub />} />
        <Route path="/resource-hub/calendar" element={<ResourceHubCalendar />} />
        <Route path="/path-builder" element={<PathBuilder />} />
        <Route path="/grow-the-hub" element={<GrowtheHub />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/resume" element={<Resume />} />
        <Route path="/blog/teacher-recommendation" element={<TeacherRecommendation />} />
        <Route path="/blog/burnout" element={<BurnedOut />} />
        <Route path="/blog/sleep" element={<Sleep />} />
        <Route path="/blog/major" element={<Major />} />
        <Route path="/blog/lab" element={<Lab />} />
        <Route path="/blog/linkedin" element={<LinkedIn />} />
        <Route path="/reference-page" element={<ReferencePage />} />
        <Route path="/support" element={<Support />} />
        <Route path="/beyond-the-classroom" element={<BeyondTheClassroom />} />
        <Route path="/two-minute-reset" element={<TwoMinuteReset />} />
        <Route path="/focus-space" element={<FocusSpace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
