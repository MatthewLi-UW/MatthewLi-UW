import { useState } from "react";
import PortfolioExperience from "./experience/PortfolioExperience";

export default function App() {
  const [mode, setMode] = useState("field");
  const [selectedConstellation, setSelectedConstellation] = useState(null);
  const [discoveredConstellations, setDiscoveredConstellations] = useState([]);

  return (
    <PortfolioExperience
      mode={mode}
      setMode={setMode}
      selectedConstellation={selectedConstellation}
      setSelectedConstellation={setSelectedConstellation}
      discoveredConstellations={discoveredConstellations}
      setDiscoveredConstellations={setDiscoveredConstellations}
    />
  );
}
