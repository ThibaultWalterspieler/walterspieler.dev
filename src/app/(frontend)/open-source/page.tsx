import { cache, FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import Content from "@/components/common/content";
import ScrollArea from "@/components/common/scroll-area";
import { H1 } from "@/components/common/typography";
import { Separator } from "@/components/ui/separator";
import getMetadata from "@/lib/seo/metadata";
import config from "@payload-config";

export const revalidate = 3600;

const OpenSourcePage: FC = async () => {
  const page = await getPage();

  return (
    <ScrollArea className="flex flex-col">
      <div className="content-wrapper">
        <div className="content animate-in fade-in duration-700">
          <H1 className="text-spotlight mb-4 max-w-[60vw] md:mb-4 md:max-w-full">
            {page.title}
          </H1>
          <Separator className="my-6" />
          <Content content={page.content} />
        </div>
      </div>
    </ScrollArea>
  );
};

const getPage = cache(async () => {
  const payload = await getPayload({
    config,
  });
  const pages = await payload.find({
    collection: "pages",
    where: { slug: { equals: "open-source" } },
  });

  if (!pages.docs[0]) {
    notFound();
  }

  return pages.docs[0];
});

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage();

  return getMetadata(page.meta);
}

export default OpenSourcePage;
