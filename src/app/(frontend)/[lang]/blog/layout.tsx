import { PropsWithChildren, Suspense } from "react";

import { getPayload, TypedLocale } from "payload";

import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SideMenu from "@/components/Common/SideMenu";
import SideMenuContent from "@/components/Common/SideMenuContent";
import { getDictionary } from "@/lib/i18n/utils";
import config from "@payload-config";

type Params = Promise<{
  lang: string;
}>;

type Props = PropsWithChildren<{
  params: Params;
}>;

const BlogLayout = async (props: Props) => {
  const { children, params } = props;
  const { lang } = await params;
  const typedLang = lang as TypedLocale;

  const dictionary = await getDictionary(typedLang);

  const blogPosts = await getBlogPosts(typedLang);

  return (
    <>
      <SideMenu collection="blog" displayReturnButton isInner lang={typedLang}>
        <Suspense fallback={<LoadingSpinner />}>
          <SideMenuContent
            collection="blog"
            data={blogPosts.docs.map((post) => ({
              title: post.title,
              uid: post.slug,
              startDate: post.createdAt,
            }))}
            lang={typedLang}
            title={dictionary.firstLevelPages.blog}
          />
        </Suspense>
      </SideMenu>
      <div className="relative flex-1">{children}</div>
    </>
  );
};

const getBlogPosts = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });

  return payload.find({
    collection: "blogPosts",
    locale: lang,
  });
};

export default BlogLayout;
