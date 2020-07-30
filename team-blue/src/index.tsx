import "./path";
import * as React from "react";
import { BuyButton } from "./BuyButton";
import { BasketInfo } from "./BasketInfo";

interface BasketInfoExtension {}

interface BuyButtonExtension {
  item: string;
}

declare global {
  interface Window {
    registerPage(Component: React.FC): void;
    registerComponent<T>(name: string, Component: React.FC<T>): void;
    getComponent(name: string): React.FC;
  }
}

if (typeof window.registerComponent === "function") {
  const basket: Array<string> = [];

  const addToCart = (item: string) => {
    basket.push(item);
    window.dispatchEvent(new CustomEvent("basket-updated"));
  };

  window.registerComponent<BuyButtonExtension>("buy-button", ({ item }) => {
    return <BuyButton addToCart={addToCart} item={item} />;
  });

  window.registerComponent<BasketInfoExtension>("basket-info", () => {
    const [count, setCount] = React.useState(basket.length);

    React.useEffect(() => {
      const handler = () => setCount(basket.length);
      window.addEventListener("basket-updated", handler);
      return () => window.removeEventListener("basket-updated", handler);
    }, []);

    return <BasketInfo count={count} />;
  });
}
