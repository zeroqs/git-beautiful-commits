#!/usr/bin/env node
import{Command as F}from"commander";import{Command as J}from"commander";import*as m from"node:process";import s from"fs-extra";import a from"node:path";import p from"chalk";var n={error(...e){console.log(p.red(...e))},warn(...e){console.log(p.yellow(...e))},info(...e){console.log(p.cyan(...e))},success(...e){console.log(p.green(...e))},break(){console.log("")}};function y(){let e=a.join("package.json");return s.readJSONSync(e)}function k(){let e=process.cwd();return s.existsSync(a.join(e,"bun.lockb"))?"bun":s.existsSync(a.join(e,"pnpm-lock.yaml"))?"pnpm":s.existsSync(a.join(e,"yarn.lock"))?"yarn":s.existsSync(a.join(e,"package-lock.json"))?"npm":null}function h(e){switch(e){case"npm":return"npm install --save-dev";case"yarn":return"yarn add --dev";case"pnpm":return"pnpm add --save-dev";case"bun":return"bun add --dev";default:throw new Error("Unknown package manager")}}function w(e){switch(e){case"npm":return"npm install";case"yarn":return"yarn";case"pnpm":return"pnpm install";case"bun":return"bun install";default:throw new Error("Unknown package manager")}}async function f(){let e=a.join(process.cwd(),"package.json"),t=await s.readJSON(e);return!!(t.dependencies?.husky||t.devDependencies?.husky)}function x(e){let t=a.resolve(e);return s.existsSync(t)||(n.error(`The path ${t} does not exist. Please try again.`),process.exit(1)),t}function i(e){typeof e=="string"&&(n.error(e),process.exit(1)),e instanceof Error&&(n.error(e.message),process.exit(1)),n.error("Something went wrong. Please try again."),process.exit(1)}import d from"fs-extra";import{execSync as b}from"node:child_process";import*as I from"node:os";import C from"node:path";import T from"prompts";var u=[{title:"\u{1F525}"},{title:"\u2604\uFE0F"},{title:"\u{1F300}"},{title:"\u{1F315}"},{title:"\u{1F3DD}\uFE0F"},{title:"\u{1F479}"}];var M=`#!/bin/sh

COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2
SHA1=$3

CONFIG_FILE="./beautiful-commits.config.json"

if [ -f "$CONFIG_FILE" ]; then
  EMOJI=$(grep -oP '"selectedEmoji":\\s*"\\K[^"]+' "$CONFIG_FILE")
  if [ -z "$EMOJI" ]; then
    EMOJI="\u2604\uFE0F"
  fi
else
  EMOJI="\u2604\uFE0F"
fi

if [ "$COMMIT_SOURCE" = "merge" ]; then
  exit 0
fi

if [ ! -f "$COMMIT_MSG_FILE" ]; then
  echo "Error: Commit message file not found."
  exit 1
fi

COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")
echo "$EMOJI $COMMIT_MSG" > "$COMMIT_MSG_FILE"


`;async function E(e){if(await f()){n.info("\u{1F4A1} Husky is already installed. Skipping installation. \u{1F4A1}");return}let o=h(e);try{c(`${o} husky`)}catch{n.error("\u{1F4A5} Failed to install Husky. \u{1F4A5}"),process.exit(1)}finally{n.success("\u2705 Husky installed successfully!")}}async function P(e,t){try{let{emoji:o}=await _(),r=u[o].title,l=C.resolve(e,"beautiful-commits.config.json"),g={selectedEmoji:r};await d.writeFile(l,JSON.stringify(g,null,2),"utf8"),await v(e,t)}catch(o){i(o)}}async function _(){return T({type:"select",name:"emoji",message:"\u{1F3AF} Select emoji to add to the start of the commit",hint:"\u{1F4A1} Enter to submit.",choices:u})}async function v(e,t){let o=C.resolve(`${e}/.husky/prepare-commit-msg`),r=w(t),l=await f(),g=d.existsSync(`${e}/.husky`);try{(!l||!g)&&(c("npx husky-init"),c(r)),c('echo "npx --no -- commitlint --edit $1" > .husky/prepare-commit-msg'),I.platform()!=="win32"&&c("chmod +x .husky/prepare-commit-msg"),d.writeFileSync(o,M,{encoding:"utf8",mode:493})}catch($){i($)}}function c(e){try{b(e,{stdio:"inherit"})}catch(t){i(t)}}import{z as S}from"zod";var O=S.object({cwd:S.string().optional()});var j=new J().name("init").description("\u{1F680} initialize .husky in project and install dependency \u{1F680}").option("-c, --cwd <cwd>","\u{1F4C2} The working directory. Defaults to the current directory. \u{1F4C2}",m.cwd()).action(async e=>{try{let t=O.parse({cwd:e.cwd}),o=x(t.cwd||m.cwd()),r=k();r||(n.error("\u{1F4A5} Unable to detect package manager. \u{1F4A5}"),m.exit(1)),await E(r),await P(o,r)}catch(t){i(t)}});process.on("SIGINT",()=>process.exit(0));process.on("SIGTERM",()=>process.exit(0));async function G(){let e=y(),t=new F().name("beautiful-commits").description("\u2604\uFE0F Customize and make beautiful your commits \u2604\uFE0F").helpOption("-h, --help","\u{1F4A1} display help for commands \u{1F4A1}").version(`\u{1F4E6} ${e.version}`||"\u{1F4E6} 1.0.0","-v, --version","\u{1F4E6} display the version number \u{1F4E6}");t.addCommand(j),t.parse()}G();
//# sourceMappingURL=index.js.map