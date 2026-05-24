import { useRef, useState, type ReactNode } from 'react';
import styled from 'styled-components';
import type { Project } from '../../data/projects';
import { theme } from '../../styles/theme';

const PREVIEW_MAX = 4;

export function pickPreviewSet(p: Project): string[] {
  const set: string[] = [];
  if (p.kv) set.push(p.kv);
  for (const phase of p.phases) {
    if (!phase.images) continue;
    for (const img of phase.images) {
      if (!set.includes(img.src)) set.push(img.src);
      if (set.length >= PREVIEW_MAX) return set;
    }
  }
  if (set.length === 0 && p.thumbnail) set.push(p.thumbnail);
  return set;
}

interface PreviewItem {
  id: string;
  images: string[];
}

export function useHoverImagePreview() {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const containerProps = {
    ref: containerRef,
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      const c = containerRef.current;
      const p = previewRef.current;
      if (!c || !p) return;
      const rect = c.getBoundingClientRect();
      p.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0) translate(24px, -50%)`;
    },
    onMouseLeave: () => setHoverId(null),
  };

  const getRowProps = (id: string) => ({
    onMouseEnter: () => setHoverId(id),
  });

  const previewLayer = (items: PreviewItem[]): ReactNode => (
    <Preview ref={previewRef} $visible={hoverId !== null}>
      {items.map((item) => {
        if (item.images.length === 0) return null;
        const active = hoverId === item.id;
        return (
          <PreviewGrid key={item.id} $active={active}>
            {item.images.map((src, i) => (
              <PreviewCell key={src} $delay={i * 40}>
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />
              </PreviewCell>
            ))}
          </PreviewGrid>
        );
      })}
    </Preview>
  );

  return { containerProps, getRowProps, previewLayer };
}

const Preview = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 256px;
  height: 144px;
  pointer-events: none;
  z-index: 20;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transition: opacity 200ms ease;
  will-change: transform;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const PreviewGrid = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  opacity: ${(p) => (p.$active ? 1 : 0)};
  transform: ${(p) => (p.$active ? 'scale(1)' : 'scale(0.94)')};
  transition: opacity 220ms ease, transform 260ms ease;
  filter: drop-shadow(0 12px 32px rgba(10, 10, 10, 0.18));
`;

const PreviewCell = styled.div<{ $delay: number }>`
  position: relative;
  background: ${theme.colors.bg.subtle};
  overflow: hidden;
  aspect-ratio: 16 / 9;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 180ms ease;
    transition-delay: ${(p) => p.$delay}ms;
  }
`;
