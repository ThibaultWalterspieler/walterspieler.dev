import { PropsWithChildren, Suspense } from "react";

import LoadingSpinner from "@/components/common/loading-spinner";
import SideMenu from "@/components/common/side-menu";
import SideMenuContent from "@/components/common/side-menu-content";
import { getDictionary } from "@/lib/i18n/utils";
import { getPublishedPosts } from "@/lib/payload/queries";

type Props = PropsWithChildren<{
  params: Promise<{ slug?: string | string[] }>;
}>;

const ExperiencesLayout = async (props: Props) => {
  const { children, params } = props;

  const { slug } = await params;

  const dictionary = await getDictionary();

  const experiencePosts = await getPublishedPosts("experiencePosts");

  const activeUid = Array.isArray(slug) ? slug[0] : slug;

  return (
    <>
      <SideMenu collection="experiences" displayReturnButton isInner>
        <Suspense fallback={<LoadingSpinner />}>
          <SideMenuContent
            activeUid={activeUid}
            collection="experiences"
            data={experiencePosts
              .map((post) => {
                if (typeof post.experience !== "number") {
                  return {
                    title: post.title,
                    uid: post.slug,
                    startDate: post.experience?.startDate,
                    endDate: post.experience?.endDate,
                  };
                }
              })
              .filter(
                (item): item is NonNullable<typeof item> => item !== undefined,
              )}
            title={dictionary.firstLevelPages.experiences}
          />
        </Suspense>
      </SideMenu>
      <div className="relative min-w-0 flex-1">{children}</div>
    </>
  );
};

export default ExperiencesLayout;
