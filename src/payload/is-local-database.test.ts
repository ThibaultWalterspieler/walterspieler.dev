import { describe, expect, it } from "vitest";

import { isLocalDatabase } from "./is-local-database";

describe("isLocalDatabase", () => {
  it.each([
    "postgres://payload:payload@localhost:5432/payload",
    "postgresql://payload:payload@127.0.0.1/payload",
    "postgres://payload:payload@[::1]:5432/payload",
    "postgres:///payload?host=/var/run/postgresql",
  ])("treats %s as local", (uri) => {
    expect(isLocalDatabase(uri)).toBe(true);
  });

  it.each([
    "postgres://user:pass@ep-example-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require",
    "postgres://user:pass@localhost.example.com/db",
    "",
    "not a url",
  ])("treats %s as remote", (uri) => {
    expect(isLocalDatabase(uri)).toBe(false);
  });
});
