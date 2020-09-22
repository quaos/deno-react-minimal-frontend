# Deno+React Frontend, minimal setup

## Requirements

* Needs to install [denopack](https://denopack.mod.land/) (workaround for `deno bundle` not bundling React libs properly)
```shell
deno run --allow-run --allow-read https://deno.land/x/denopack@0.9.0/install.ts
```
* Adds `~/.deno/bin` path to your system or user's `PATH` environment variable
```shell
# for *nix and MacOS
export PATH="${PATH};~/.deno/bin"

# for Windows
set PATH=%PATH%:%HOME%\.deno\bin
```
* Needs [denon](https://github.com/denosaurs/denon) for debugging/live reloading

## How to start

* npm
```shell
npm run build
npm start
```

* yarn
```shell
yarn run build
yarn start
```

* denon (version ^2.3.3)
```shell
denon start
```
