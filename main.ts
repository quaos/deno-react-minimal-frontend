import { open } from "./src/deps/opn.ts";

import { runServer } from "./src/server.ts";

async function browse(url: string) {
  await open(url);
  return 0;
}

const commands: Map<string, (opts?: any) => Promise<number>> = new Map([
  // TODO: Revise this later
  ["build", (opts?: any) => {
    let cmd = [
      Deno.execPath(), "bundle", "--config", "tsconfig.json",
      "src/client.tsx", "public/assets/js/client.js",
    ];
    const runOpts = {
      cmd,
      env: Deno.env.toObject(),
    };
    console.log("Deno.run():", runOpts);
    const process: Deno.Process = Deno.run(runOpts);

    return process.status().then(status => status.code)
  }],
  ["serve", (opts?: any) => {
    const host = opts?.host || "localhost";
    const port = opts?.port || 3000;
    return runServer({ host: host, port: port })
      .then(() =>
        (opts?.browse) ? browse(`http://${host}:${port}/`) : Promise.resolve(0)
      )
      .then(() => new Promise((resolve, reject) => {}));
  }],
]);

let rc;
let command;
let cmdOpts = {
  browse: false,
};
for (let arg of Deno.args) {
  if (arg === "--browse") {
    cmdOpts.browse = true;
  } else if (!command) {
    command = commands.get(arg);
  }
}

if (!command) {
  console.error(
    "usage: deno --allow-read --allow-net --unstable main.ts -- [--browse] (serve)",
  );
  rc = -1;
  Deno.exit(rc);
}

try {
  rc = await command(cmdOpts);
} catch (err) {
  console.error(err);
  rc = -1;
}
Deno.exit(rc);
