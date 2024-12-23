import { FC, PropsWithChildren, Suspense } from "react";

import { getPayload, TypedLocale } from "payload";

import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SideMenu from "@/components/Common/SideMenu";
import SideMenuContent from "@/components/Common/SideMenuContent";
import * as m from "@/paraglide/messages.js";
import { languageTag } from "@/paraglide/runtime";
import config from "@payload-config";

type Props = PropsWithChildren;

const getBlogPosts = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });

  return payload.find({
    collection: "blogPosts",
    locale: lang,
  });
};

const BlogLayout: FC<Props> = async (props) => {
  const { children } = props;

  const blogPosts = await getBlogPosts(languageTag());

  return (
    <>
      <SideMenu collection="blog" displayReturnButton isInner>
        <Suspense fallback={<LoadingSpinner />}>
          <SideMenuContent
            collection="blog"
            data={blogPosts.docs.map((post) => ({
              title: post.title,
              uid: post.slug,
              startDate: post.createdAt,
            }))}
            title={m.blogPageTitle()}
          />
        </Suspense>
      </SideMenu>
      <div className="relative flex-1">{children}</div>
    </>
  );
};

export default BlogLayout;
