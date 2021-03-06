import {
  useCache,
} from "https://deno.land/x/denopack@0.8.0/plugin/mod.ts";

export default {
    input: "src/client.tsx",
    output: {
        // TODO: Find the way to properly output files to public/assets/js/
        // as client.bundle.js and client.bundle.js.map
        dir: "./public/assets/js",
        sourcemap: true,
        format: "es",
    },
    plugins: [ 
        ...useCache({
            compilerOptions: {
                lib: ["dom"],
                jsx: "react",
            },
        }),
    ],
};
