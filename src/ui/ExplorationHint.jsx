import { useEffect, useState } from "react";

import { hasVisitedObservatory, markObservatoryVisited } from "../data/observatoryVisit";

export default function ExplorationHint() {
  const [visible, setVisible] = useState(() => !hasVisitedObservatory());

  useEffect(() => {
    if (!visible) return;
    markObservatoryVisited();
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="explore-intro" role="status" onAnimationEnd={() => setVisible(false)}>
      <span className="explore-hint-desktop">Move your mouse to explore</span>
      <span className="explore-hint-mobile">Drag the sky to explore</span>
    </div>
  );
}
