import "../src/assets/scss/index.scss";

export function helloAnything(thing: string): string {
  return `Hello ${thing}!`;
}

export * from "../src/components/Amount";
export * from "../src/components/BooleanIndicator";
export * from "../src/components/LoadingCard";
