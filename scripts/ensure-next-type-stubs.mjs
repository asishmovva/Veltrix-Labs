import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const typesDir = join(process.cwd(), ".next", "types");
const cacheLifeStub = join(typesDir, "cache-life.d.ts");

mkdirSync(typesDir, { recursive: true });

if (!existsSync(cacheLifeStub)) {
  writeFileSync(cacheLifeStub, "export {};\n", "utf8");
}
