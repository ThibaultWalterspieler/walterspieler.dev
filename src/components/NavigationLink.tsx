"use client";

import { FC, use, useMemo } from "react";

import {
  BoltIcon,
  DraftingCompass,
  ExternalLink,
  Nfc,
  Sparkle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import WeAreStudio99 from "@/components/Icons/Company/WeAreStudio99";
import { MenuContext } from "@/contexts/MenuContext";
import { cn } from "@/lib/utils";
import { languageTag } from "@/paraglide/runtime";

type Props = {
  label: string;
  path: string;
  type:
    | "home"
    | "blog"
    | "lab"
    | "experiences"
    | "contact"
    | "99Stud"
    | "other";
  external?: boolean;
};

const NavigationLink: FC<Props> = (props) => {
  const { label, path, type, external } = props;

  const pathname = usePathname();
  const { closeMainMenu = () => {} } = use(MenuContext) ?? {};

  const isActive = useMemo(() => {
    let isActive = false;
    if (path) {
      const splittedPathname = pathname.split("/").filter(Boolean);
      const splittedUrl = path.split("/").filter(Boolean);
      if (splittedUrl.length === 0) {
        isActive = splittedPathname.length === 0;
      } else if (splittedUrl.length === 1 && splittedUrl[0] === languageTag()) {
        isActive =
          splittedPathname.length === 1 &&
          splittedPathname[0] === languageTag();
      } else {
        isActive = splittedUrl.every(
          (part, index) => splittedPathname[index] === part,
        );
      }
    }

    if (external) {
      return false;
    }

    return isActive;
  }, [path, external, pathname]);

  return (
    <Link
      className={cn(
        "border-grey bg-metal active:bg-eerie-light group relative flex items-center justify-between rounded-lg border p-4 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]",
        {
          "bg-chinese-black": isActive,
          "hover:bg-eerie-light": !isActive,
        },
      )}
      href={path}
      onClick={() => {
        closeMainMenu();
      }}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer nofollow" : undefined}
    >
      <div className={cn("flex items-center gap-2 text-xl md:text-base")}>
        {type === "home" && <BoltIcon className="w-4" />}
        {type === "blog" && <Sparkle className="w-4" />}
        {type === "experiences" && <DraftingCompass className="w-4" />}
        {type === "99Stud" && <WeAreStudio99 className="w-4" />}
        {type === "contact" && <Nfc className="w-4" />}
        <span className={cn("overflow-hidden text-ellipsis")}>{label}</span>
      </div>
      {type === "contact" && (
        <ExternalLink
          className={cn("absolute right-4 w-4 text-stone-400")}
          strokeWidth={1}
        />
      )}
    </Link>
  );
};

export default NavigationLink;
