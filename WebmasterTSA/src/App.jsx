import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

import Home from "./pages/Home.jsx";
import ResourceHub from "./pages/ResourceHub.jsx";
import Programs from "./pages/Programs.jsx";
import Scholarships from "./pages/Scholarships.jsx";
import FindECS from "./pages/FindECS.jsx";
import WorkLogs from "./pages/WorkLogs.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resource-hub" element={<ResourceHub />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/find-ecs" element={<FindECS />} />
        <Route path="/work-logs" element={<WorkLogs />} />
      </Routes>
    </BrowserRouter>
  );
}
