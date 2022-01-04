import { React, ReactDOM } from "./deps/react.ts";
//TEST {
import { encode } from "./deps/std.ts";
console.log("encode:", encode);
// import { getSystemErrorName } from "./deps/std.ts";
// console.log("getSystemErrorName:", getSystemErrorName);
// }

import App from "./components/App.tsx";

window.addEventListener("DOMContentLoaded", (evt) => {
  ReactDOM.render(
    <App />,
    // @ts-ignore
    document.getElementById("root"),
  );
});

export {};
