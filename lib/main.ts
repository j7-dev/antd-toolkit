import "../lib/assets/scss/index.scss";

export function helloAnything(thing: string): string {
  return `Hello ${thing}!`;
}

export * from "./components/Amount";
export * from "./components/BooleanIndicator";
export * from "./components/BooleanRadioButton";
export * from "./components/Countdown";
export * from "./components/DateTime";
export * from "./components/DoubleConfirmSwitch";
export * from "./components/FilterTags";
export * from "./components/LoadingCard";
