import { Fragment } from 'react';
import type { ReactNode } from 'react';

// `**bold**` と `[label](url)` を <strong>/<a> に変換する軽量インラインパーサー。
// 段落構造はそのままに、強調・リンクだけ装飾する。
export function renderRich(text: string): ReactNode {
  const pattern = /(\*\*[^*\n]+\*\*|\[[^\]\n]+\]\([^)\n]+\))/g;
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*\n]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]\n]+)\]\(([^)\n]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
