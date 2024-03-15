"use client";
import { H1, H2, H3, H4, LI, P, UL } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import { FC } from "react";

type Props = {
	field: RichTextField | null | undefined;
};

const ParagraphBlock: FC<Props> = ({ field }) => {
	const { toast } = useToast();

	const onHyperlinkClick = (text: string) => {
		navigator.clipboard.writeText(text);
		toast({
			description: `My email (${text}) has been copied to your clipboard.`,
		});
	};

	return (
		<PrismicRichText
			components={{
				heading1: ({ children }) => <H1>{children}</H1>,
				heading2: ({ children }) => <H2>{children}</H2>,
				heading3: ({ children }) => <H3>{children}</H3>,
				heading4: ({ children }) => <H4>{children}</H4>,
				paragraph: ({ children }) => <P>{children}</P>,
				list: ({ children }) => <UL className="">{children}</UL>,
				listItem: ({ children }) => <LI>{children}</LI>,
				image: ({ node }) => {
					return (
						<div className="flex justify-center flex-col">
							<Image
								alt={node.alt || ""}
								className="lg:max-w-[48rem] lg:max-h-[550px] object-cover rounded-t-lg"
								height={node.dimensions.height}
								priority={node.copyright?.includes("priority") ? true : false}
								sizes="(max-width: 768px) 90vw, (max-width: 1024px) 688px, 768px"
								src={node.url}
								width={node.dimensions.width}
							/>
							<div className="bg-chinese-black text-stone-400 text-xs lg:max-w-[900px] text-center py-1 px-2 rounded-b">
								{node.alt}
							</div>
						</div>
					);
				},
				hyperlink: ({ text, node }) => {
					if (node.data.url === "[copy]") {
						return (
							<Button
								className="py-0 px-0 bold h-0 leading-7 text-base"
								onClick={() => onHyperlinkClick(text)}
								variant={"link"}
							>
								{text}
							</Button>
						);
					}

					return (
						<a
							className="hover:underline font-semibold hover:text-pearl"
							href={node.data.url}
							rel="noopener"
							target="_blank"
						>
							{text}
						</a>
					);
				},
			}}
			field={field}
		/>
	);
};

export default ParagraphBlock;
