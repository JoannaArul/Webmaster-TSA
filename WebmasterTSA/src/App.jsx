import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

import Home from "./pages/Home.jsx";
import ResourceHub from "./pages/ResourceHub.jsx";
import AddResource from "./pages/AddResource.jsx";
import FindYou from "./pages/FindYou.jsx";
import WorkLog from "./pages/WorkLog.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resource-hub" element={<ResourceHub />} />
        <Route path="/add-resource" element={<AddResource />} />
        <Route path="/find-ecs" element={<FindYou />} />
        <Route path="/work-logs" element={<WorkLog />} />
      </Routes>
    </BrowserRouter>
  );
}
