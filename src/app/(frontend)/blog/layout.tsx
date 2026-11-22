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
    // A new section's layout is newly inserted DOM, so the page's own
    // PageTransition can't run when entering or leaving it: animate the section.
    <PageTransition>
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
      <div className="relative min-w-0 flex-1">{children}</div>
    </PageTransition>
  );
};

export default BlogLayout;
