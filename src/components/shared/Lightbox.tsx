import { useEffect } from 'react';
import styled from 'styled-components';
import type { ProjectImage } from '../../data/projects';
import { renderRich } from '../../lib/renderRich';
import { useLang } from '../../i18n/LangContext';
import { ui } from '../../i18n/ui';

interface LightboxProps {
  images: ProjectImage[];
  index: number | null;
  alt?: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({
  images,
  index,
  alt,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const { lang } = useLang();
  const t = ui[lang];
  const isOpen = index !== null && index >= 0 && index < images.length;
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;
  const current = images[index!];
  const src = current.src;
  const caption = current.caption;

  return (
    <Backdrop onClick={onClose} role="dialog" aria-modal="true">
      <CloseBtn type="button" onClick={onClose} aria-label={t.common.close}>
        ×
      </CloseBtn>

      {hasMultiple && (
        <NavBtn
          $side="left"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label={t.common.prev}
        >
          ‹
        </NavBtn>
      )}

      <ImgWrap onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={caption || alt || ''} />
        {caption && <Caption>{renderRich(caption)}</Caption>}
      </ImgWrap>

      {hasMultiple && (
        <NavBtn
          $side="right"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label={t.common.next}
        >
          ›
        </NavBtn>
      )}

      {hasMultiple && (
        <Counter>
          {(index! + 1).toString().padStart(2, '0')} / {images.length.toString().padStart(2, '0')}
        </Counter>
      )}
    </Backdrop>
  );
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 6vh 8vw;
  cursor: zoom-out;
  animation: fadeIn 180ms ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ImgWrap = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  cursor: default;

  img {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  }
`;

const Caption = styled.figcaption`
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
  max-width: 720px;
  letter-spacing: 0.02em;

  a {
    color: #fff;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: rgba(255, 255, 255, 0.4);
    transition: text-decoration-color 150ms ease;

    &:hover {
      text-decoration-color: #fff;
    }
  }
`;

const CloseBtn = styled.button`
  position: fixed;
  top: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 22px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  transition: background 150ms ease;
  z-index: 201;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
`;

const NavBtn = styled.button<{ $side: 'left' | 'right' }>`
  position: fixed;
  top: 50%;
  ${(p) => (p.$side === 'left' ? 'left: 16px;' : 'right: 16px;')}
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 30px;
  line-height: 1;
  padding: 0;
  padding-bottom: 4px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 150ms ease;
  z-index: 201;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }

  @media (max-width: 600px) {
    width: 44px;
    height: 44px;
    font-size: 24px;
  }
`;

const Counter = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.7);
  z-index: 201;
`;
