"use client";

import React, { Component, ReactNode } from "react";
import Button from "./Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#d4a574] to-[#a67c52] flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#fdf6ec] to-[#f9ede0] rounded-3xl p-12 max-w-lg text-center shadow-2xl">
            <div className="text-6xl mb-4">☕️💔</div>
            <h1 className="text-3xl font-bold mb-4 text-[#6b4423]">
              Oops! Something went wrong
            </h1>
            <p className="text-lg mb-6 text-[#8b6239]">
              Looks like we spilled the coffee! Don&apos;t worry, we&apos;re cleaning it up.
            </p>
            <p className="text-sm mb-8 text-[#8b6239] opacity-75">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
            >
              Brew Again (Reload Page)
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
