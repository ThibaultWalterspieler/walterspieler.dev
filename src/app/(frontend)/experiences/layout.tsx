import { PropsWithChildren, Suspense } from "react";

import { getPayload } from "payload";

import LoadingSpinner from "@/components/common/loading-spinner";
import SideMenu from "@/components/common/side-menu";
import SideMenuContent from "@/components/common/side-menu-content";
import { getDictionary } from "@/lib/i18n/utils";
import config from "@payload-config";

type Props = PropsWithChildren;

const getExperiencePosts = async () => {
  const payload = await getPayload({
    config,
  });

  return payload.find({
    collection: "experiencePosts",
  });
};

const ExperiencesLayout = async (props: Props) => {
  const { children } = props;

  const dictionary = await getDictionary();

  const experiencePosts = await getExperiencePosts();

  return (
    <>
      <SideMenu collection="experiences" displayReturnButton isInner>
        <Suspense fallback={<LoadingSpinner />}>
          <SideMenuContent
            collection="experiences"
            data={experiencePosts.docs
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
      <div className="relative flex-1">{children}</div>
    </>
  );
};

export default ExperiencesLayout;
