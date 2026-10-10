let seenThisVisit = false;

export function hasVisitedObservatory() {
  return seenThisVisit;
}

export function markObservatoryVisited() {
  seenThisVisit = true;
}
