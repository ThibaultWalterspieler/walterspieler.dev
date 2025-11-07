"use client";

import { FC, use } from "react";

import { ChevronRight } from "lucide-react";

import MenuLinkCard from "@/components/common/menu-link-card";
import { MenuContext } from "@/contexts/menu-context";
import { formatDateToMonthYear } from "@/lib/date";

type Props = {
  title: string;
  collection: "blog" | "experiences";
  data: {
    title: string;
    uid: string;
    startDate: string;
    endDate?: string | null;
  }[];
  activeUid?: string | null;
};

const SideMenuContent: FC<Props> = (props) => {
  const { data, title, collection, activeUid } = props;

  const { closeInnerMenu } = use(MenuContext) ?? {};

  return (
    <div className="wrapper bg-eerie-dark h-screen w-full">
      <div className="w-full px-4 pt-10 md:p-4">
        <span className="text-3xl font-bold md:text-lg">{title}</span>
      </div>
      <div className="content mx-auto flex w-full flex-col gap-3 px-4 pt-10 md:p-4">
        {data.map((item) => {
          const href = `/${collection}/${item.uid}`;
          const isActive = activeUid ? item.uid === activeUid : undefined;

          return (
            <MenuLinkCard
              className="shadow-duration-200 px-4 py-5"
              href={href}
              isActive={isActive}
              key={item.uid}
              onClick={closeInnerMenu}
            >
              <div className="z-10 flex flex-col space-y-2 text-base">
                <span className="text-lg font-bold md:text-base">
                  {item.title}
                </span>
                {(item.startDate || (item.startDate && item.endDate)) && (
                  <div className="flex items-center gap-1 text-sm">
                    <span>{formatDateToMonthYear(item.startDate)}</span>
                    {item.endDate && (
                      <>
                        <span> - </span>
                        <span>{formatDateToMonthYear(item.endDate)}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              <ChevronRight
                className="text-pearl-light z-10"
                height={22}
                strokeLinecap="square"
                strokeWidth={1}
              />
            </MenuLinkCard>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenuContent;
