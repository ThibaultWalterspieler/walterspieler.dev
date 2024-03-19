import { Button } from "@/components/ui/button";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {
	InstagramLogoIcon,
	LinkedInLogoIcon,
	StackIcon,
} from "@radix-ui/react-icons";
import { SocialDocumentData } from "../../../prismicio-types";

/**
 * Props for `SocialsList`.
 */
export type SocialsListProps = SliceComponentProps<
	Content.SocialsListSlice & {
		items: {
			social: {
				data: SocialDocumentData;
			};
		}[];
	}
>;

/**
 * Component for "SocialsList" Slices.
 */
const SocialsList = ({ slice }: SocialsListProps): JSX.Element => {
	const { items } = slice;

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="flex flex-wrap my-6 gap-4">
				{items.map((item: { social: { data: SocialDocumentData } }, idx) => {
					if (!item.social.data || !item.social.data.url) {
						return <></>;
					}

					const link =
						"url" in item.social.data.url ? item.social.data.url.url : "/";
					return (
						<Button className="" key={idx} variant="outline">
							{item.social.data.label === "Linkedin" && (
								<LinkedInLogoIcon className="mr-2 h-4 w-4" />
							)}
							{item.social.data.label === "StackOverflow" && (
								<StackIcon className="mr-2 h-4 w-4" />
							)}
							{item.social.data.label === "Instagram" && (
								<InstagramLogoIcon className="mr-2 h-4 w-4" />
							)}
							{item.social.data.label === "Malt" && (
								<svg
									className="mr-2"
									fill="none"
									height="16"
									viewBox="0 0 200 200"
									width="16"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M159.852 26.953c-14.1-14.1-29.162-4.974-38.588 4.452l-44.52 44.523-44.525 44.524c-9.426 9.425-19.292 23.746-4.452 38.584 14.84 14.843 29.161 4.975 38.585-4.451l44.523-44.523 44.523-44.522c9.427-9.427 18.552-24.49 4.454-38.587ZM74.779 23.306 93.634 42.16l19.192-19.192a69.875 69.875 0 0 1 3.957-3.661C114.773 9.167 108.987 0 93.625 0c-15.391 0-21.17 9.203-23.168 19.365 1.436 1.243 2.871 2.489 4.322 3.941ZM112.816 163.359l-19.18-19.181-18.845 18.843a81.041 81.041 0 0 1-4.273 3.969c2.161 10.337 8.277 19.805 23.11 19.805 14.872 0 20.98-9.519 23.127-19.889-1.319-1.135-2.64-2.248-3.939-3.547ZM66.783 69.013h-36.35C17.104 69.013 0 73.21 0 93.149c0 14.877 9.522 20.986 19.894 23.132 1.228-1.417 46.889-47.268 46.889-47.268ZM167.435 69.981c-1.151 1.338-46.907 47.305-46.907 47.305h35.834c13.329 0 30.433-3.149 30.433-24.136 0-15.39-9.2-21.171-19.36-23.169ZM78.693 57.081l6.494-6.494-18.843-18.845c-9.427-9.425-23.746-19.292-38.586-4.452-10.882 10.882-8.465 21.473-2.693 30.071 1.758-.131 53.628-.28 53.628-.28ZM108.571 129.218l-6.511 6.511 19.194 19.192c9.426 9.427 24.488 18.551 38.586 4.453 10.52-10.521 8.106-21.571 2.29-30.423-1.872.135-53.559.267-53.559.267Z"
										fill="#fff"
									/>
								</svg>
							)}

							<a href={link} rel="noreferrer" target="_blank">
								{item.social.data.label}
							</a>
						</Button>
					);
				})}
			</div>
		</section>
	);
};

export default SocialsList;
