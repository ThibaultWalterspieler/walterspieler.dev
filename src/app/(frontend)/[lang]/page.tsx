import { cache, FC } from "react";

import { Metadata } from "next";
import { getPayload, TypedLocale } from "payload";

import Content from "@/components/Common/Content";
import ScrollArea from "@/components/Common/ScrollArea";
import { H1 } from "@/components/Common/Typography";
import { Separator } from "@/components/ui/separator";
import getSchemaProfilePage from "@/lib/schema-dts/profile-page";
import getMetadata from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";
import config from "@payload-config";

type Params = Promise<{
  lang: TypedLocale;
}>;

type Props = {
  params: Params;
};

export const revalidate = 3600;

const HomeLang: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = await params;

  const meData = getMe(lang);
  const homePageData = getHomePage(lang);

  const [me, homePage] = await Promise.all([meData, homePageData]);

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
      <ScrollArea className={cn("flex flex-col")}>
        <div
          className={cn("content-wrapper", "animate-in fade-in duration-700")}
        >
          <div className={cn("content animate-in fade-in duration-700")}>
            <H1
              className={cn(
                "text-spotlight mb-4 max-w-[60vw] md:mb-4 md:max-w-full",
              )}
            >
              {me.fullName}
              <span
                className={cn(
                  "mt-3 block text-xl font-normal text-stone-400 md:text-2xl",
                )}
              >
                {me.role}
              </span>
            </H1>
            <Separator className={cn("my-6")} />
            <Content content={homePage.content} lang={lang} />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

const getHomePage = cache(async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });
  const pages = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
    locale: lang,
  });

  return pages.docs[0];
});

const getMe = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });
  return payload.findGlobal({ slug: "me", locale: lang });
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang } = await params;

  const page = await getHomePage(lang);

  return getMetadata(page.meta, lang);
}

export default HomeLang;
