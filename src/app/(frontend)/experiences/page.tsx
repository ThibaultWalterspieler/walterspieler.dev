import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import EmptyLayout from "@/components/common/empty-layout";
import MenuInitializer from "@/contexts/menu-context/menu-initializer";
import { getDictionary } from "@/lib/i18n/utils";
import getMetadata from "@/lib/seo/metadata";
import config from "@payload-config";

export const revalidate = 3600;

const getExperiencePage = async () => {
  const payload = await getPayload({
    config,
  });

  const pages = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "experiences",
      },
    },
  });

  if (!pages.docs[0]) {
    notFound();
  }

  return pages.docs[0];
};

const Experiences: FC = async () => {
  const dictionary = await getDictionary();

  return (
    <>
      <MenuInitializer isInnerMenuOpen />
      <EmptyLayout label={dictionary.selectAnExperience} />
    </>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getExperiencePage();

  return getMetadata(page.meta);
}

export default Experiences;
