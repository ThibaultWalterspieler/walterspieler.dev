import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import ArticleContent from "@/components/ArticleContent";
import { ScrollArea } from "@/components/ScrollArea";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";
import { SoftwareApplication, WithContext } from "schema-dts";

type Params = {
	lang: Locale;
	uid: string;
};

type Props = {
	params: Params;
};

const WorkPage: FC<Props> = async (props) => {
	const { params } = props;
	const { lang, uid } = params;

	const client = createClient();
	const page = await client
		.getByUID<
			Content.WorkPostDocument & {
				data: {
					work: {
						data: Pick<Content.WorkDocument["data"], "company">;
					};
				};
			}
		>("workPost", uid, {
			lang,
			fetchLinks: [
				"work.company",
				"work.description",
				"work.duration",
				"work.tags",
				"work.logo",
			],
		})
		.catch(() => notFound());

	const company = page?.data?.work?.data?.company[0];

	const jsonLd: WithContext<SoftwareApplication> = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: page.data.meta_title || uid,
		url: `https://walterspieler.dev/works/${uid}`,
		applicationCategory: "WebApplication",
		description: page.data.meta_description || "",
		headline: `${page.data.meta_title} | Thibault Walterspieler`,
		operatingSystem: "Web",
		author: {
			"@type": "Person",
			name: "Thibault Walterspieler",
			jobTitle: "Fullstack Engineer",
			affiliation: "WeAreStudio99",
			url: "https://walterspieler.dev",
		},
		datePublished: page.first_publication_date,
		dateModified: page.last_publication_date,
	};

	return (
		<>
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				type="application/ld+json"
			/>
			<ScrollArea className="flex flex-col md:pl-72 z-0 blueprint-layout">
				<div className="content-wrapper mt-14 md:mt-0">
					<Link href="/works">
						<div className="fixed top-8 left-4 lg:hidden bg-metal/5 z-50 backdrop-blur rounded-lg p-2 border-grey border md:hidden">
							<ChevronLeft size={24} />
						</div>
					</Link>
					<article className="content animate-in fade-in duration-700">
						<ArticleBreadcrumb
							lang={lang}
							title={page.data.meta_title || uid}
						/>
						{company && <ArticleContent company={company} page={page} />}
					</article>
				</div>
			</ScrollArea>
		</>
	);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang, uid } = params;
	const dictionary = await getDictionary(lang);

	const client = createClient();
	const page = await client
		.getByUID("workPost", uid, {
			lang,
		})
		.catch(() => notFound());

	const { works } = dictionary;

	return {
		title: `${page.data.meta_title} | Thibault Walterspieler`,
		description: page.data.meta_description,
		alternates: generateAlternates(`works/${uid}`, lang),
		icons: [
			{
				rel: "icon",
				url: "/favicon.ico",
				sizes: "any",
			},
		],
		twitter: {
			card: "summary_large_image",
			title: `${page.data.meta_title || uid} | Thibault Walterspieler`,
			description: page.data.meta_description || works.metadata.description,
			images: {
				url: "/images/og/default.png",
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
			},
		},
		openGraph: {
			type: "website",
			title: `${page.data.meta_title || uid} | Thibault Walterspieler`,
			description: page.data.meta_description || works.metadata.description,
			url: `/`,
			images: {
				url: "/images/og/default.png",
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
			},
		},
	};
}

export default WorkPage;
