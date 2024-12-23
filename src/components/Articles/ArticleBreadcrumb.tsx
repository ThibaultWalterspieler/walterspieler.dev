import { FC } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/utils";
import { languageTag } from "@/paraglide/runtime";

type Props = {
  title: string;

  collection: "experiences" | "blog";
};

const ArticleBreadcrumb: FC<Props> = async (props) => {
  const { title, collection } = props;

  const dictionary = await getDictionary(languageTag());

  return (
    <Breadcrumb className="animate-in fade-in mb-5 duration-300">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{dictionary.firstLevelPages.home}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            {collection === "blog" ? (
              <Link href="/blog">{dictionary.firstLevelPages.blog}</Link>
            ) : (
              <Link href="/experiences">
                {dictionary.firstLevelPages.experiences}
              </Link>
            )}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ArticleBreadcrumb;
