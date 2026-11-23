import { describe, expect, it } from "vitest";

import { isDatabaseConfirmed, isLocalDatabase } from "./is-local-database";

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

describe("isDatabaseConfirmed", () => {
  const remote =
    "postgres://user:pass@ep-example-pooler.eu-central-1.aws.neon.tech/neondb";

  it("lets a script run against a local database unconfirmed", () => {
    expect(
      isDatabaseConfirmed("postgres://p:p@localhost:5432/payload", undefined),
    ).toBe(true);
  });

  it("lets a script run against a remote database once its host is named", () => {
    expect(
      isDatabaseConfirmed(
        remote,
        "ep-example-pooler.eu-central-1.aws.neon.tech",
      ),
    ).toBe(true);
  });

  it("stops a script against a remote database not named, or named wrong", () => {
    expect(isDatabaseConfirmed(remote, undefined)).toBe(false);
    expect(isDatabaseConfirmed(remote, "localhost")).toBe(false);
    expect(isDatabaseConfirmed("not a url", "not a url")).toBe(false);
  });
});
