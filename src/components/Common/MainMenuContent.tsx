import { FC } from "react";

import MainMenuItems from "@/components/Common/MainMenuItems";
import LangSelector from "@/components/LangSelector";
import MiscMenu from "@/components/MiscMenu";
import { getDictionary } from "@/lib/i18n/utils";
import { languageTag } from "@/paraglide/runtime";
import { MainMenu, Me } from "@payload-types";

type Props = {
  mainMenu: MainMenu;
  me: Me;
};

const MainMenuContent: FC<Props> = async (props) => {
  const { me, mainMenu } = props;
  const dictionary = await getDictionary(languageTag());

  return (
    <>
      <header>
        <div className="hidden w-full flex-col p-4 md:flex">
          <span className="text-lg font-bold">{me.fullName}</span>
          <span className="text-xs text-stone-400">{me.role}</span>
        </div>
        <MainMenuItems items={mainMenu.menuItems} />
      </header>
      <footer className="border-t-grey flex justify-between gap-3 p-5 md:border-t lg:flex-col xl:flex-row">
        <MiscMenu
          labels={{ legalNotice: dictionary.menuItems.legalNotice }}
          title={dictionary.menuItems.other}
        />
        <LangSelector />
      </footer>
    </>
  );
};

export default MainMenuContent;
