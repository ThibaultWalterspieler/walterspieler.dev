"use client";

import { NavigationLink } from "@/components/NavigationLink";
import { MenuContext } from "@/contexts/MenuContext";
import { Locale } from "@/lib/i18n/types";
import { SliceZone } from "@prismicio/client";
import { motion, useAnimation } from "framer-motion";
import { FC, useContext, useEffect } from "react";
import { NavigationItemSlice } from "../../prismicio-types";

type Props = {
	items: SliceZone<NavigationItemSlice>;
	lang: Locale;
};

const MainMenuItems: FC<Props> = ({ items, lang }) => {
	const { isMenuOpen } = useContext(MenuContext) ?? {};
	const controls = useAnimation();

	useEffect(() => {
		if (isMenuOpen) {
			controls.start((i) => ({
				opacity: 1,
				scale: 1,
				filter: "blur(0px)",
				transition: { delay: i * 0.2 + 0.1 },
			}));
		} else {
			controls.start({ opacity: 0, scale: 0.3, filter: "blur(20px)" });
		}
	}, [isMenuOpen, controls]);

	return (
		<div className="flex w-full h-full flex-col text-sm justify-between p-4">
			<div className="md:hidden flex h-full flex-col gap-3 pt-20 md:pt-0">
				{items.map((item, i) => {
					return (
						<motion.div animate={controls} custom={i} key={item.id}>
							<NavigationLink
								key={item.id}
								label={item.primary.name || ""}
								lang={lang}
								link={item.primary.link}
							/>
						</motion.div>
					);
				})}
			</div>
			<div className="hidden md:flex h-full flex-col gap-3 pt-20 md:pt-0">
				{items.map((item) => {
					return (
						<NavigationLink
							key={item.id}
							label={item.primary.name || ""}
							lang={lang}
							link={item.primary.link}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default MainMenuItems;
