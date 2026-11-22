import { FC, PropsWithChildren } from "react";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Space_Grotesk } from "next/font/google";

import Analytics from "@/components/analytics";
import MainMenuContent from "@/components/common/main-menu-content";
import SideMenu from "@/components/common/side-menu";
import { MenuContextProvider } from "@/contexts/menu-context";
import { getMainMenu, getMe } from "@/lib/payload/queries";
import { cn } from "@/lib/utils";

import type { Viewport } from "next";

type Props = PropsWithChildren;

export const viewport: Viewport = {
  // `--color-background` in src/styles/globals.css
  themeColor: "#10141c",
  colorScheme: "dark",
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const RootLayout: FC<Props> = async (props) => {
  const { children } = props;

  const [me, mainMenu] = await Promise.all([getMe(), getMainMenu()]);

  return (
    <html lang="en">
      <body
        className={cn(
          "relative",
          "bg-background text-foreground selection:bg-selection min-h-dvh font-sans antialiased",
          spaceGrotesk.variable,
        )}
      >
        <SpeedInsights />
        <Analytics />
        <MenuContextProvider>
          <div className="lg:flex">
            <SideMenu>
              <MainMenuContent mainMenu={mainMenu} me={me} />
            </SideMenu>
            <div className="blueprint-layout flex flex-1">{children}</div>
          </div>
        </MenuContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
