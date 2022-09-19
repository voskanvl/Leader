import { readFileSync, readdirSync } from "fs";
import * as yaml from "js-yaml";
import { resolve, extname } from "path";

const a = yaml.load(
    readFileSync(resolve(process.cwd(), "src/data/top-menu.yaml")),
);
console.log("🚀 ~ a", a);
