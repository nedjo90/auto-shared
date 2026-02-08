import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

describe("CI/CD pipeline configuration", () => {
  const repos = ["auto-shared", "auto-backend", "auto-frontend"];

  for (const repo of repos) {
    describe(`${repo} pipeline`, () => {
      const pipelinePath = path.resolve(__dirname, `../../${repo}/azure-pipelines.yml`);

      it("should have azure-pipelines.yml", () => {
        expect(fs.existsSync(pipelinePath)).toBe(true);
      });

      it("should use Node.js 20", () => {
        const content = fs.readFileSync(pipelinePath, "utf-8");
        expect(content).toContain('versionSpec: "20.x"');
      });

      it("should cache node_modules", () => {
        const content = fs.readFileSync(pipelinePath, "utf-8");
        expect(content).toContain("Cache@2");
        expect(content).toContain("node_modules");
      });

      it("should have lint step", () => {
        const content = fs.readFileSync(pipelinePath, "utf-8");
        expect(content).toContain("npm run lint");
      });

      it("should have type-check step", () => {
        const content = fs.readFileSync(pipelinePath, "utf-8");
        expect(content).toContain("npm run type-check");
      });

      it("should have build step", () => {
        const content = fs.readFileSync(pipelinePath, "utf-8");
        expect(content).toContain("npm run build");
      });
    });
  }
});
