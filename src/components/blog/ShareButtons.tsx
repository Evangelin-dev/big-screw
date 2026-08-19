import { useState } from "react";
import { Linkedin, MessageCircle, Copy, Check } from "lucide-react";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-on-ink-dim font-medium">Share:</span>

      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-on-ink-dim hover:text-yellow transition-colors duration-200"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-on-ink-dim hover:text-yellow transition-colors duration-200"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      <button
        onClick={handleCopy}
        className="p-2 text-on-ink-dim hover:text-yellow transition-colors duration-200"
        aria-label="Copy link"
        title="Copy link to clipboard"
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </button>
    </div>
  );
}
