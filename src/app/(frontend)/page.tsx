import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import Content from "@/components/common/content";
import { H1 } from "@/components/common/typography";
import { Separator } from "@/components/ui/separator";
import { getMe, getPage } from "@/lib/payload/queries";
import getSchemaProfilePage from "@/lib/schema-dts/profile-page";
import getMetadata from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

const Home: FC = async () => {
  const meData = getMe();
  const homePageData = getHomePage();

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
      <div className={cn("flex w-full min-w-0 flex-col")}>
        <div className={cn("content-wrapper")}>
          <div className={cn("content animate-enter")}>
            <H1
              className={cn(
                "text-spotlight mb-4 max-w-[60vw] md:mb-4 md:max-w-full",
              )}
            >
              {me.fullName}
              <span
                className={cn(
                  "mt-3 block text-xl font-normal text-muted md:text-2xl",
                )}
              >
                {me.role}
              </span>
            </H1>
            <Separator className={cn("my-6")} />
            <Content content={homePage.content} />
          </div>
        </div>
      </div>
    </>
  );
};

const getHomePage = async () => {
  const page = await getPage("home");

  if (!page) {
    notFound();
  }

  return page;
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();

  return getMetadata(page.meta);
}

export default Home;
