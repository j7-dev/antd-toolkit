import "../src/assets/scss/index.scss";

export function helloAnything(thing: string): string {
  return `Hello ${thing}!`;
}

export * from "./components/Amount";
export { BooleanIndicator } from "./components/BooleanIndicator";
export * from "./components/LoadingCard";
