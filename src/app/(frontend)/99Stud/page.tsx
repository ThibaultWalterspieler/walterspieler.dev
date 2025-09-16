import { cache, FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import Content from "@/components/Common/Content";
import ScrollArea from "@/components/Common/ScrollArea";
import { H1 } from "@/components/Common/Typography";
import { Separator } from "@/components/ui/separator";
import getSchemaOrganization from "@/lib/schema-dts/organization";
import getMetadata from "@/lib/seo/metadata";
import config from "@payload-config";

export const revalidate = 3600;

const Stud99Page: FC = async () => {
  const page = await getPage();
  const jsonLd = getSchemaOrganization();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
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
    </>
  );
};

const getPage = cache(async () => {
  const payload = await getPayload({
    config,
  });
  const pages = await payload.find({
    collection: "pages",
    where: { slug: { equals: "99Stud" } },
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

export default Stud99Page;
