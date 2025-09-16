"use client";

import { FC, use, useMemo } from "react";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuContext } from "@/contexts/MenuContext";
import { formatDateToMonthYear } from "@/lib/date";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  collection: "blog" | "experiences";
  data: {
    title: string;
    uid: string;
    startDate: string;
    endDate?: string | null;
  }[];
};

const SideMenuContent: FC<Props> = (props) => {
  const { data, title, collection } = props;

  const { closeInnerMenu } = use(MenuContext) ?? {};

  const pathname = usePathname();
  const splitPathname = pathname.split("/");
  const currentPage = splitPathname[splitPathname.length - 1];

  const isActiveArray = useMemo(
    () => data.map((item) => currentPage === item.uid),
    [data, currentPage],
  );

  return (
    <div className="wrapper bg-eerie-dark h-screen w-full">
      <div className="w-full px-4 pt-10 md:p-4">
        <span className="text-3xl font-bold md:text-lg">{title}</span>
      </div>
      <div className="content mx-auto flex w-full flex-col gap-3 px-4 pt-10 md:p-4">
        {data.map((item, idx) => {
          const href = `/${collection}/${item.uid}`;

          const isActive = isActiveArray[idx];

          return (
            <Link href={href} key={item.uid} onClick={closeInnerMenu}>
              <div
                className={cn(
                  "shadow-duration-200 group border-grey bg-metal hover:bg-eerie-light active:bg-eerie-light relative flex items-center justify-between rounded-lg border p-4 px-4 py-5 transition-all hover:scale-[1.01] active:scale-[0.98]",
                  {
                    "[0_1000px_0_0_hsl(0_0%_20%)_inset] overflow-hidden":
                      isActive,
                  },
                )}
              >
                {isActive && (
                  <>
                    <span className="spark mask-gradient animate-flip before:animate-rotate pointer-events-none absolute inset-0 h-[100%] w-[100%] rounded-lg [mask:linear-gradient(#7ACCB8,_transparent_50%)] before:absolute before:[inset:0_auto_auto_50%] before:aspect-square before:w-[200%] before:[translate:-50%_-15%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,#7ACCB8_360deg)] before:content-['']" />
                    <span className="backdrop bg-chinese-black pointer-events-none absolute inset-px rounded-lg transition-colors duration-200" />
                  </>
                )}
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
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenuContent;
