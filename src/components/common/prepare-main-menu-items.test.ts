import { describe, expect, it } from "vitest";

import { prepareMainMenuItems } from "@/components/common/prepare-main-menu-items";
import { MainMenu, Page } from "@payload-types";

type MenuItem = NonNullable<MainMenu["menuItems"]>[number];

const page = (slug: string) => ({ id: 1, slug }) as Page;

const item = (overrides: Partial<MenuItem>): MenuItem => ({
  id: "item",
  label: "Item",
  type: "other",
  external: false,
  ...overrides,
});

describe("prepareMainMenuItems", () => {
  it("links the page with the 'home' slug to the site root", () => {
    const [home] = prepareMainMenuItems([
      item({ label: "Home", type: "home", page: page("home") }),
    ]);

    expect(home.path).toBe("/");
  });

  it("links any other page by its slug", () => {
    const [blog] = prepareMainMenuItems([
      item({ label: "Blog", type: "blog", page: page("blog") }),
    ]);

    expect(blog.path).toBe("/blog");
  });

  it("uses the typed path as is for an external link", () => {
    const [contact] = prepareMainMenuItems([
      item({
        label: "Contact",
        type: "contact",
        external: true,
        path: "mailto:hello@example.com",
      }),
    ]);

    expect(contact).toMatchObject({
      external: true,
      path: "mailto:hello@example.com",
      type: "contact",
    });
  });

  it("drops an item whose page was not loaded, keeping the others in order", () => {
    const items = prepareMainMenuItems([
      item({ id: "a", label: "Home", page: page("home") }),
      item({ id: "b", label: "Unloaded", page: 42 }),
      item({ id: "c", label: "Blog", page: page("blog") }),
    ]);

    expect(items.map(({ label }) => label)).toEqual(["Home", "Blog"]);
  });

  it("returns no items when the main menu is empty", () => {
    expect(prepareMainMenuItems(undefined)).toEqual([]);
    expect(prepareMainMenuItems(null)).toEqual([]);
  });
});
