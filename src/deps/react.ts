import _React from "https://esm.sh/[react,react-dom]/react?dev&no-check";
import _ReactDOM from "https://esm.sh/[react,react-dom]/react-dom?dev&no-check";

export const React = _React;
export const ReactDOM = _ReactDOM;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}
