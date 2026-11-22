import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import Content from "@/components/common/content";
import PageTransition from "@/components/common/page-transition";
import { H1 } from "@/components/common/typography";
import { Separator } from "@/components/ui/separator";
import { getPage } from "@/lib/payload/queries";
import getMetadata from "@/lib/seo/metadata";

const OpenSourcePage: FC = async () => {
  const page = await getFixedPage();

  return (
    <PageTransition>
      <div className="flex w-full min-w-0 flex-col">
        <div className="content-wrapper">
          <div className="content">
            <H1 className="text-spotlight mb-4 max-w-[60vw] md:mb-4 md:max-w-full">
              {page.title}
            </H1>
            <Separator className="my-6" />
            <Content content={page.content} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const getFixedPage = async () => {
  const page = await getPage("open-source");

  if (!page) {
    notFound();
  }

  return page;
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getFixedPage();

  return getMetadata(page.meta);
}

export default OpenSourcePage;
