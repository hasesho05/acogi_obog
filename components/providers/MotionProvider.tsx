"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

const MotionProvider = (props: { children: ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      {props.children}
    </LazyMotion>
  );
};

export default MotionProvider;
