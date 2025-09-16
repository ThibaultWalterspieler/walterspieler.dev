import { FC } from "react";

import MainMenuItems from "@/components/common/main-menu-items";
import MiscMenu from "@/components/misc-menu";
import { MainMenu, Me } from "@payload-types";

type Props = {
  me: Me;
  mainMenu: MainMenu;
};

const MainMenuContent: FC<Props> = async (props) => {
  const { me, mainMenu } = props;

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
        <MiscMenu labels={{ legalNotice: "Legal Notice" }} title={"Other"} />
      </footer>
    </>
  );
};

export default MainMenuContent;
