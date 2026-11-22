import "@/styles/globals.css";

import { FC, PropsWithChildren } from "react";

import type { Viewport } from "next";

export const viewport: Viewport = {
  // `--color-background` in src/styles/globals.css
  themeColor: "#10141c",
  colorScheme: "dark",
};

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return children;
};

export default RootLayout;
