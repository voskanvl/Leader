import { defineConfig } from "vite";
// import pugPlugin from "vite-plugin-pug";
import vitePugPlugin from "./vite-plugin-pug-edited";
import { resolve, extname, posix } from "path";
import { readFileSync, readdirSync } from "fs";
import * as yaml from "js-yaml";
import colors from "picocolors";

const options = { pretty: true }; // FIXME: pug pretty is deprecated!
const locals = {
    name: "ШВСМ",
};

const STANDART = "yaml";

function getShortName(file, root) {
    return file.startsWith(root + "/") ? posix.relative(root, file) : file;
}

const merge = standart => {
    console.log(`now merging ${STANDART} files`);
    const fn = { json: JSON.stringify, yaml: yaml.load }[standart];
    const files = readdirSync(resolve(__dirname, "src/data"));
    const jsons = files.filter(file => extname(file) === "." + STANDART);
    return jsons.reduce(
        (acc, file) => ({
            ...acc,
            ...fn(readFileSync(resolve(__dirname, "src/data", file))),
        }),
        {},
    );
};

function CustomHmr() {
    return {
        name: "custom-hmr",
        enforce: "post",
        // HMR
        handleHotUpdate({ file, server }) {
            console.log("file>", file);
            if (file.endsWith("." + STANDART)) {
                server.config.logger.info(
                    colors.green(STANDART + " reload ") +
                        colors.dim(getShortName(file, server.config.root)),
                    { clear: true, timestamp: true },
                );
                server.ws.send({
                    type: "full-update",
                });
            }
        },
        transformIndexHtml: vitePugPlugin({ pugLocals: merge(STANDART) })
            .transformIndexHtml,
    };
}

export default defineConfig({
    // plugins: [pugPlugin.default(options, locals)],
    plugins: [vitePugPlugin({ pugLocals: () => merge(STANDART) })],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                // second: resolve(__dirname, "second.html"),
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
            "@assets": resolve(__dirname, "./assets"),
            "@var": resolve(__dirname, "./src/sass/_variables.sass"),
        },
    },
});
