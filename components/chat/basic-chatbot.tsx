"use client";

import Link from "next/link";
import { MessageCircle, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { chatbotFaq } from "@/lib/chat/faq";

export function BasicChatbot() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredFaq = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return chatbotFaq;
    }

    return chatbotFaq.filter(
      (item) =>
        item.question.toLowerCase().includes(value) ||
        item.answer.toLowerCase().includes(value) ||
        item.tag.toLowerCase().includes(value),
    );
  }, [query]);

  return (
    <div className="fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-6">
      {open ? (
        <div className="w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-white/10 bg-graphite-2/95 shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-text-primary">Veltrix Assistant</p>
              <p className="text-xs text-text-secondary">Quick answers about services</p>
            </div>
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              className="text-text-primary hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-graphite/60 px-3">
              <Search className="size-4 text-text-secondary" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pricing, timeline, support..."
                className="h-10 w-full bg-transparent text-sm text-text-primary placeholder:text-text-secondary focus:outline-none"
              />
            </div>
          </div>

          <div className="max-h-[56vh] overflow-y-auto px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {chatbotFaq.slice(0, 4).map((item) => (
                <button
                  key={item.question}
                  type="button"
                  onClick={() => setQuery(item.tag)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-text-primary transition-colors hover:bg-white/10"
                >
                  {item.tag}
                </button>
              ))}
            </div>

            {filteredFaq.length > 0 ? (
              <div className="space-y-3">
                {filteredFaq.map((item) => (
                  <article
                    key={item.question}
                    className="rounded-xl border border-white/10 bg-graphite/50 p-3"
                  >
                    <h3 className="text-sm font-medium text-text-primary">{item.question}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-text-secondary">{item.answer}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-graphite/50 p-4">
                <p className="text-sm text-text-primary">I do not have a matching answer yet.</p>
                <p className="mt-1 text-xs text-text-secondary">
                  Share your question directly and we will respond quickly.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-block text-sm font-medium text-primary hover:opacity-80"
                >
                  Go to Contact
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}

      <Button
        type="button"
        size="lg"
        className="mt-3 gap-2 rounded-full px-5 shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
        onClick={() => setOpen((value) => !value)}
      >
        <MessageCircle className="size-4" />
        Help
      </Button>
    </div>
  );
}
