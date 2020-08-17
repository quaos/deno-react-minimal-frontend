// @deno-types="./types/react-16.9/index.d.ts"
// @ts-ignore
export { default as React } from "https://dev.jspm.io/react@16.9.0";

// @deno-types="./types/react-dom-16.9/index.d.ts"
// @ts-ignore
export { default as ReactDOM } from "https://dev.jspm.io/react-dom@16.9.0";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}
