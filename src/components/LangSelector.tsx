import { FC } from "react";

import { Link } from "@/lib/i18n";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as m from "@/paraglide/messages.js";
import { languageTag } from "@/paraglide/runtime";
import config from "@payload-config";

const LangSelector: FC = async () => {
  const { localization } = await config;

  if (!localization) return null;

  const currentLocale = localization.locales.find(
    (locale) => locale.code === languageTag(),
  );
  const currentLocaleLabel =
    typeof currentLocale?.label === "string" && currentLocale?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{currentLocaleLabel}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{m.languageMenuTitle()}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild disabled={!currentLocale}>
          <Link href={`/`} locale={"fr"}>
            Français 🇫🇷
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild disabled={!currentLocale}>
          <Link href={`/`} locale={"en"}>
            English 🇬🇧
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSelector;
