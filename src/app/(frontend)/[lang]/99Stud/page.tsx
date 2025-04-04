import { cache, FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload, TypedLocale } from "payload";

import Content from "@/components/Common/Content";
import ScrollArea from "@/components/Common/ScrollArea";
import { H1 } from "@/components/Common/Typography";
import { Separator } from "@/components/ui/separator";
import getSchemaOrganization from "@/lib/schema-dts/organization";
import getMetadata from "@/lib/seo/metadata";
import config from "@payload-config";

type Params = Promise<{
  lang: TypedLocale;
}>;

type Props = {
  params: Params;
};

export const revalidate = 3600;

const Stud99Page: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = await params;

  const page = await getPage(lang);
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
            <Content content={page.content} lang={lang} />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

const getPage = cache(async (lang: TypedLocale) => {
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
});

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang } = await params;

  const page = await getPage(lang);

  return getMetadata(page.meta, lang);
}

export default Stud99Page;
