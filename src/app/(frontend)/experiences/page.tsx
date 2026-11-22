import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import EmptyLayout from "@/components/common/empty-layout";
import MenuInitializer from "@/contexts/menu-context/menu-initializer";
import { getDictionary } from "@/lib/i18n/utils";
import { getPage } from "@/lib/payload/queries";
import getMetadata from "@/lib/seo/metadata";

const getExperiencePage = async () => {
  const page = await getPage("experiences");

  if (!page) {
    notFound();
  }

  return page;
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
