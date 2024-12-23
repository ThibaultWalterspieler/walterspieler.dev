import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload, TypedLocale } from "payload";

import Content from "@/components/Common/Content";
import ScrollArea from "@/components/Common/ScrollArea";
import { H1 } from "@/components/Common/Typography";
import { Separator } from "@/components/ui/separator";
import getSchemaOrganization from "@/lib/schema-dts/organization";
import getMetadata from "@/lib/seo/metadata";
import { languageTag } from "@/paraglide/runtime";
import config from "@payload-config";

type Params = Promise<{
  lang: TypedLocale;
}>;

type Props = {
  params: Params;
};

const getPage = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });
  const pages = await payload.find({
    collection: "pages",
    where: { slug: { equals: "99Stud" } },
    locale: lang,
  });

  if (!pages.docs[0]) {
    notFound();
  }

  return pages.docs[0];
};

const Stud99Page: FC<Props> = async () => {
  const jsonLd = getSchemaOrganization();

  const page = await getPage(languageTag());

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

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(languageTag());

  return getMetadata(page.meta, languageTag());
}

export default Stud99Page;
