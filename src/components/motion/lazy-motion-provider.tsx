"use client";

import { FC, PropsWithChildren } from "react";

import { LazyMotion, MotionConfig } from "motion/react";

// The animation features load in their own chunk after hydration, so `m`
// components ship without the full motion bundle.
const loadFeatures = () =>
  import("./dom-animation").then((module) => module.default);

const LazyMotionProvider: FC<PropsWithChildren> = ({ children }) => (
  <LazyMotion features={loadFeatures} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
);

export default LazyMotionProvider;
