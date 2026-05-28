"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { CssBackground } from "./css-background";

const CinematicBg = dynamic(() => import("./cinematic-bg").then((mod) => mod.CinematicBg), {
  ssr: false,
  loading: () => <CssBackground />,
});

class BackgroundErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return <CssBackground />;
    }
    return this.props.children;
  }
}

export function AppBackground() {
  return (
    <BackgroundErrorBoundary>
      <CinematicBg />
    </BackgroundErrorBoundary>
  );
}
