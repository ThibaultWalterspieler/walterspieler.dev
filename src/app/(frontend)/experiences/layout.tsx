import { FC, PropsWithChildren, Suspense } from "react";

import { getPayload, TypedLocale } from "payload";

import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SideMenu from "@/components/Common/SideMenu";
import SideMenuContent from "@/components/Common/SideMenuContent";
import { getDictionary } from "@/lib/i18n/utils";
import { languageTag } from "@/paraglide/runtime";
import config from "@payload-config";

type Params = Promise<{
  lang: TypedLocale;
}>;

type Props = PropsWithChildren<{
  params: Params;
}>;

const getExperiencePosts = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });

  return payload.find({
    collection: "experiencePosts",
    locale: lang,
  });
};

const ExperiencesLayout: FC<Props> = async (props) => {
  const { children } = props;

  const dictionary = await getDictionary(languageTag());

  const experiencePosts = await getExperiencePosts(languageTag());

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
