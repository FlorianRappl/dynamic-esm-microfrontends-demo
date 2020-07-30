import "./path";
import * as React from "react";
import { ProductPage } from "./ProductPage";

declare global {
  interface Window {
    registerPage(Component: React.FC): void;
    registerComponent(name: string, Component: React.FC): void;
    getComponent(name: string): React.FC;
  }
}

if (typeof window.registerPage === "function") {
  window.registerPage(() => {
    const [name, setName] = React.useState(
      () => location.hash.substr(1) || "porsche"
    );

    React.useEffect(() => {
      const handler = () => setName(location.hash.substr(1));
      window.addEventListener("hashchange", handler);
      return () => window.removeEventListener("hashchange", handler);
    }, []);

    return (
      <ProductPage
        name={name}
        BasketInfo={window.getComponent("basket-info")}
        BuyButton={window.getComponent("buy-button")}
        Recommendations={window.getComponent("recommendations")}
      />
    );
  });
}
