import { React, ReactDOM } from "./deps/react.ts";

import App from "./components/App.tsx";

window.addEventListener("DOMContentLoaded", (evt) => {
  ReactDOM.render(
    <App />,
    // @ts-ignore
    document.getElementById("root"),
  );
});

export {};
