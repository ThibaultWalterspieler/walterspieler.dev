import { FC } from "react";

import { Metadata } from "next";
import { getPayload, TypedLocale } from "payload";

import Content from "@/components/Common/Content";
import ScrollArea from "@/components/Common/ScrollArea";
import { H1 } from "@/components/Common/Typography";
import { Separator } from "@/components/ui/separator";
import getSchemaProfilePage from "@/lib/schema-dts/profile-page";
import getMetadata from "@/lib/seo/metadata";
import { languageTag } from "@/paraglide/runtime";
import config from "@payload-config";

const getMe = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });
  return payload.findGlobal({ slug: "me", locale: lang });
};

const getHomePage = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });
  const pages = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
    locale: lang,
  });

  return pages.docs[0];
};

const HomeLang: FC = async () => {
  const me = await getMe(languageTag());
  const homePage = await getHomePage(languageTag());

  const jsonLd = getSchemaProfilePage(
    me.fullName,
    me.email,
    me.description,
    me.role,
  );

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
              {me.fullName}
              <span
                className={
                  "mt-3 block text-xl font-normal text-stone-400 md:text-2xl"
                }
              >
                {me.role}
              </span>
            </H1>
            <Separator className="my-6" />
            <Content content={homePage.content} />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage(languageTag());

  return getMetadata(page.meta, languageTag());
}

export default HomeLang;
