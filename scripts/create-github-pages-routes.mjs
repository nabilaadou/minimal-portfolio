import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const distDirectory = new URL("../dist/", import.meta.url);
const indexFile = new URL("index.html", distDirectory);
const routeFiles = [
	"404.html",
	"blogs/index.html",
	"blogs/1/index.html",
];

for (const routeFile of routeFiles) {
	const targetPath = join(distDirectory.pathname, routeFile);
	await mkdir(dirname(targetPath), { recursive: true });
	await copyFile(indexFile, targetPath);
}
