import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: ["**/backend/**/*.test.(js|ts)"],
};

export default createJestConfig(config);
