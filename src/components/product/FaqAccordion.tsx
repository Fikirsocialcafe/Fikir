"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  /** Index of the item that should be open on mount (default 0 = first). Pass -1 to open none. */
  defaultOpen?: number;
}

export default function FaqAccordion({ items, defaultOpen = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={faq.q} className="border-b border-fikir-brown/10 last:border-b-0">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="w-full flex items-center justify-between py-3 cursor-pointer text-left font-body text-sm font-medium text-fikir-brown"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`h-4 w-4 text-fikir-brown-light shrink-0 transition-all duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-3 font-body text-sm text-fikir-brown-light leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
