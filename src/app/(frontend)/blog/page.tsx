import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import EmptyLayout from "@/components/common/empty-layout";
import MenuInitializer from "@/contexts/menu-context/menu-initializer";
import { getDictionary } from "@/lib/i18n/utils";
import { getPage } from "@/lib/payload/queries";
import getMetadata from "@/lib/seo/metadata";

const Blog: FC = async () => {
  const dictionary = await getDictionary();

  return (
    <>
      <MenuInitializer isInnerMenuOpen />
      <EmptyLayout label={dictionary.selectABlogPost} />
    </>
  );
};

const getBlogPage = async () => {
  const page = await getPage("blog");

  if (!page) {
    notFound();
  }

  return page;
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogPage();

  return getMetadata(page.meta);
}

export default Blog;
