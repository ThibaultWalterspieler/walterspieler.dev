import { describe, expect, it } from "vitest";

import { shouldRevalidate } from "./should-revalidate";

describe("shouldRevalidate", () => {
  it("refreshes the site when a post is published", () => {
    expect(
      shouldRevalidate({ _status: "published" }, { _status: "draft" }),
    ).toBe(true);
  });

  it("refreshes the site when a published post is edited and republished", () => {
    expect(
      shouldRevalidate({ _status: "published" }, { _status: "published" }),
    ).toBe(true);
  });

  it("refreshes the site when a published post is unpublished", () => {
    expect(
      shouldRevalidate({ _status: "draft" }, { _status: "published" }),
    ).toBe(true);
  });

  it("leaves the site alone while a draft autosaves", () => {
    expect(shouldRevalidate({ _status: "draft" }, { _status: "draft" })).toBe(
      false,
    );
  });

  it("leaves the site alone when a new post is created as a draft", () => {
    expect(shouldRevalidate({ _status: "draft" }, undefined)).toBe(false);
  });

  it("refreshes the site for documents without drafts, like pages and globals", () => {
    expect(shouldRevalidate({}, {})).toBe(true);
    expect(shouldRevalidate({}, undefined)).toBe(true);
  });
});
