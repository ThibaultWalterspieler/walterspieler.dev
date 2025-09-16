import { PropsWithChildren, Suspense } from "react";

import { getPayload } from "payload";

import LoadingSpinner from "@/components/common/loading-spinner";
import SideMenu from "@/components/common/side-menu";
import SideMenuContent from "@/components/common/side-menu-content";
import { getDictionary } from "@/lib/i18n/utils";
import config from "@payload-config";

type Props = PropsWithChildren;

const BlogLayout = async (props: Props) => {
  const { children } = props;

  const dictionary = await getDictionary();

  const blogPosts = await getBlogPosts();

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
            title={dictionary.firstLevelPages.blog}
          />
        </Suspense>
      </SideMenu>
      <div className="relative flex-1">{children}</div>
    </>
  );
};

const getBlogPosts = async () => {
  const payload = await getPayload({
    config,
  });

  return payload.find({
    collection: "blogPosts",
  });
};

export default BlogLayout;
