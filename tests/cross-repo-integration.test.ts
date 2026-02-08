import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

describe("Cross-repo integration", () => {
  const rootDir = path.resolve(__dirname, "../..");

  describe("auto-backend consumes @auto/shared", () => {
    it("should have @auto/shared in backend dependencies", () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(rootDir, "auto-backend/package.json"), "utf-8"),
      );
      expect(pkg.dependencies["@auto/shared"]).toBeDefined();
    });

    it("should have node_modules/@auto/shared in backend", () => {
      expect(
        fs.existsSync(path.join(rootDir, "auto-backend/node_modules/@auto/shared")),
      ).toBe(true);
    });
  });

  describe("auto-frontend consumes @auto/shared", () => {
    it("should have @auto/shared in frontend dependencies", () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(rootDir, "auto-frontend/package.json"), "utf-8"),
      );
      expect(pkg.dependencies["@auto/shared"]).toBeDefined();
    });

    it("should have node_modules/@auto/shared in frontend", () => {
      expect(
        fs.existsSync(path.join(rootDir, "auto-frontend/node_modules/@auto/shared")),
      ).toBe(true);
    });
  });

  describe("all repos have consistent tooling", () => {
    const repos = ["auto-shared", "auto-backend", "auto-frontend"];

    for (const repo of repos) {
      it(`${repo} should have .prettierrc`, () => {
        expect(fs.existsSync(path.join(rootDir, repo, ".prettierrc"))).toBe(true);
      });

      it(`${repo} should have TypeScript configured`, () => {
        expect(fs.existsSync(path.join(rootDir, repo, "tsconfig.json"))).toBe(true);
      });
    }
  });

  describe("npm install works in all repos", () => {
    const repos = ["auto-shared", "auto-backend", "auto-frontend"];

    for (const repo of repos) {
      it(`${repo} should have node_modules installed`, () => {
        expect(fs.existsSync(path.join(rootDir, repo, "node_modules"))).toBe(true);
      });
    }
  });
});
