import { PropsWithChildren, Suspense } from "react";

import LoadingSpinner from "@/components/common/loading-spinner";
import SideMenu from "@/components/common/side-menu";
import SideMenuContent from "@/components/common/side-menu-content";
import { getDictionary } from "@/lib/i18n/utils";
import { getPublishedPosts } from "@/lib/payload/queries";

type Props = PropsWithChildren<{
  params: Promise<{ slug?: string | string[] }>;
}>;

const BlogLayout = async (props: Props) => {
  const { children, params } = props;

  const { slug } = await params;

  const dictionary = await getDictionary();

  const blogPosts = await getPublishedPosts("blogPosts");

  const activeUid = Array.isArray(slug) ? slug[0] : slug;

  return (
    <>
      <SideMenu collection="blog" displayReturnButton isInner>
        <Suspense fallback={<LoadingSpinner />}>
          <SideMenuContent
            activeUid={activeUid}
            collection="blog"
            data={blogPosts.map((post) => ({
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

export default BlogLayout;
