// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("deps/react", ["https://dev.jspm.io/react@16.9.0", "https://dev.jspm.io/react-dom@16.9.0"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_16_9_0_1_1) {
                exports_1({
                    "React": react_16_9_0_1_1["default"]
                });
            },
            function (react_dom_16_9_0_1_1) {
                exports_1({
                    "ReactDOM": react_dom_16_9_0_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("components/App", ["deps/react"], function (exports_2, context_2) {
    "use strict";
    var react_ts_1, styles, App;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (react_ts_1_1) {
                react_ts_1 = react_ts_1_1;
            }
        ],
        execute: function () {
            styles = {
                logo: {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "192px",
                    height: "192px",
                },
            };
            App = (props) => {
                let [loading, setLoading] = react_ts_1.React.useState(true);
                react_ts_1.React.useEffect(() => {
                    const timerId = setTimeout(() => setLoading(false), 1000);
                    return () => {
                        //cleanup
                        clearTimeout(timerId);
                    };
                }, []);
                return (react_ts_1.React.createElement("div", { className: "container" },
                    react_ts_1.React.createElement("p", null,
                        react_ts_1.React.createElement("img", { src: "assets/img/deno-logo.png", style: styles.logo }),
                        react_ts_1.React.createElement("img", { src: "assets/img/react-logo192.png", style: styles.logo })),
                    react_ts_1.React.createElement("pre", null,
                        "Loading ...",
                        (loading) ? "" : " OK!"),
                    react_ts_1.React.createElement("p", null, "Open up App.tsx to start working on your app!")));
            };
            exports_2("default", App);
        }
    };
});
System.register("client", ["deps/react", "components/App"], function (exports_3, context_3) {
    "use strict";
    var react_ts_2, App_tsx_1;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (react_ts_2_1) {
                react_ts_2 = react_ts_2_1;
            },
            function (App_tsx_1_1) {
                App_tsx_1 = App_tsx_1_1;
            }
        ],
        execute: function () {
            window.addEventListener("DOMContentLoaded", (evt) => {
                react_ts_2.ReactDOM.render(react_ts_2.React.createElement(App_tsx_1.default, null), 
                // @ts-ignore
                document.getElementById("root"));
            });
        }
    };
});

__instantiate("client", false);
