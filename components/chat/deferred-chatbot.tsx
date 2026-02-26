"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LazyBasicChatbot = dynamic(
  () => import("@/components/chat/basic-chatbot").then((mod) => mod.BasicChatbot),
  { ssr: false },
);

export function DeferredChatbot() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const enable = () => {
      if (!isMounted) {
        return;
      }
      setIsEnabled(true);
    };

    const onFirstInteraction = () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      enable();
    };

    const timeoutId = window.setTimeout(enable, 1600);
    window.addEventListener("pointerdown", onFirstInteraction, { passive: true, once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    return () => {
      isMounted = false;
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return <LazyBasicChatbot />;
}
