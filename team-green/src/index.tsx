import "./path";
import * as React from "react";
import { Recommendations } from "./Recommendations";

declare global {
  interface Window {
    registerPage(Component: React.FC): void;
    registerComponent<T>(name: string, Component: React.FC<T>): void;
    getComponent(name: string): React.FC;
  }
}

interface RecommendationExtension {
  item: string;
}

if (typeof window.registerComponent === "function") {
  window.registerComponent<RecommendationExtension>(
    "recommendations",
    ({ item }) => <Recommendations item={item} />
  );
}
