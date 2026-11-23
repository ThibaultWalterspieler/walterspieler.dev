import { PropsWithChildren, Suspense } from "react";

import LoadingSpinner from "@/components/common/loading-spinner";
import PageTransition from "@/components/common/page-transition";
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
      {/*
        Entering or leaving the section inserts or removes this column, so the
        page's own PageTransition inside it can't run: animate the column here.
        Not the inner menu: menus stay put, and it hides its back link on mount,
        which would end a transition that had captured it.
      */}
      <PageTransition>
        <div className="relative min-w-0 flex-1">{children}</div>
      </PageTransition>
    </>
  );
};

export default BlogLayout;
