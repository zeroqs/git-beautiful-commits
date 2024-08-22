#!/usr/bin/env node
import{Command as v}from"commander";import{Command as _}from"commander";import*as p from"node:process";import a from"fs-extra";import s from"node:path";import m from"chalk";var n={error(...e){console.log(m.red(...e))},warn(...e){console.log(m.yellow(...e))},info(...e){console.log(m.cyan(...e))},success(...e){console.log(m.green(...e))},break(){console.log("")}};function f(){let e=s.join("package.json");return a.readJSONSync(e)}function u(){let e=process.cwd();return a.existsSync(s.join(e,"bun.lockb"))?"bun":a.existsSync(s.join(e,"pnpm-lock.yaml"))?"pnpm":a.existsSync(s.join(e,"yarn.lock"))?"yarn":a.existsSync(s.join(e,"package-lock.json"))?"npm":null}function d(e){switch(e){case"npm":return"npm install --save-dev";case"yarn":return"yarn add --dev";case"pnpm":return"pnpm add --save-dev";case"bun":return"bun add --dev";default:throw new Error("Unknown package manager")}}function y(e){switch(e){case"npm":return"npm install";case"yarn":return"yarn";case"pnpm":return"pnpm install";case"bun":return"bun install";default:throw new Error("Unknown package manager")}}async function k(){let e=s.join(process.cwd(),"package.json"),t=await a.readJSON(e);return!!(t.dependencies?.husky||t.devDependencies?.husky)}function h(e){let t=s.resolve(e);return a.existsSync(t)||(n.error(`The path ${t} does not exist. Please try again.`),process.exit(1)),t}function i(e){typeof e=="string"&&(n.error(e),process.exit(1)),e instanceof Error&&(n.error(e.message),process.exit(1)),n.error("Something went wrong. Please try again."),process.exit(1)}import M from"fs-extra";import{execSync as j}from"node:child_process";import x from"node:path";import b from"prompts";var g=[{title:"\u{1F525}"},{title:"\u2604\uFE0F"},{title:"\u{1F300}"},{title:"\u{1F315}"},{title:"\u{1F3DD}\uFE0F"},{title:"\u{1F479}"}];var w=`#!/bin/sh

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


`;async function I(e){if(await k()){n.info("\u{1F4A1} Husky is already installed. Skipping installation. \u{1F4A1}");return}let o=d(e);try{c(`${o} husky`)}catch{n.error("\u{1F4A5} Failed to install Husky. \u{1F4A5}"),process.exit(1)}finally{n.success("\u2705 Husky installed successfully!")}}async function C(e,t){try{let{emoji:o}=await T(),r=g[o].title,l=x.resolve(e,"beautiful-commits.config.json"),O={selectedEmoji:r};await M.writeFile(l,JSON.stringify(O,null,2),"utf8"),await $(e,t)}catch(o){i(o)}}async function T(){return b({type:"select",name:"emoji",message:"\u{1F3AF} Select emoji to add to the start of the commit",hint:"\u{1F4A1} Enter to submit.",choices:g})}async function $(e,t){let o=x.resolve(`${e}/.husky/prepare-commit-msg`),r=y(t);try{c("npx husky-init"),c(r),c('npx husky add .husky/prepare-commit-msg "scripts/prepare-commit-msg.sh"'),c("chmod +x .husky/prepare-commit-msg"),M.writeFileSync(o,w,{encoding:"utf8",mode:493})}catch(l){i(l)}}function c(e){try{j(e,{stdio:"inherit"})}catch(t){i(t)}}import{z as E}from"zod";var P=E.object({cwd:E.string().optional()});var S=new _().name("init").description("\u{1F680} initialize .husky in project and install dependency \u{1F680}").option("-c, --cwd <cwd>","\u{1F4C2} The working directory. Defaults to the current directory. \u{1F4C2}",p.cwd()).action(async e=>{try{let t=P.parse({cwd:e.cwd}),o=h(t.cwd||p.cwd()),r=u();r||(n.error("\u{1F4A5} Unable to detect package manager. \u{1F4A5}"),p.exit(1)),await I(r),await C(o,r)}catch(t){i(t)}});process.on("SIGINT",()=>process.exit(0));process.on("SIGTERM",()=>process.exit(0));async function J(){let e=f(),t=new v().name("beautiful-commits").description("\u2604\uFE0F Customize and make beautiful your commits \u2604\uFE0F").helpOption("-h, --help","\u{1F4A1} display help for commands \u{1F4A1}").version(`\u{1F4E6} ${e.version}`||"\u{1F4E6} 1.0.0","-v, --version","\u{1F4E6} display the version number \u{1F4E6}");t.addCommand(S),t.parse()}J();
//# sourceMappingURL=index.js.map