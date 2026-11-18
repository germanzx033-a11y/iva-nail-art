"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyMessageButtonProps {
  text: string;
  label: string;
  copiedLabel: string;
}

/** Copies the booking message template so it can be pasted into any chat (e.g. an Instagram DM). */
export default function CopyMessageButton({ text, label, copiedLabel }: CopyMessageButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Older browsers: fall back to a temporary textarea
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 text-lg text-[#E8C9A8] underline-offset-4 hover:underline"
    >
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
