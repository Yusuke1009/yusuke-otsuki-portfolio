import styled from 'styled-components';

/**
 * Hero 背景の建築的グリッド + 交差円の path line グラフィック。
 */
export function HeroGrid() {
  return (
    <Wrap aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vertical guidelines */}
        <g stroke="#0a0a0a" strokeOpacity="0.06" strokeWidth="0.5">
          <line x1="240" y1="0" x2="240" y2="900" />
          <line x1="720" y1="0" x2="720" y2="900" />
          <line x1="1200" y1="0" x2="1200" y2="900" />
        </g>

        {/* Horizontal guidelines */}
        <g stroke="#0a0a0a" strokeOpacity="0.06" strokeWidth="0.5">
          <line x1="0" y1="150" x2="1440" y2="150" />
          <line x1="0" y1="450" x2="1440" y2="450" />
          <line x1="0" y1="750" x2="1440" y2="750" />
        </g>

        {/* Crosshairs at intersections */}
        <g stroke="#0a0a0a" strokeOpacity="0.4" strokeWidth="0.5" fill="none">
          {[
            [240, 150],
            [720, 150],
            [1200, 150],
            [240, 450],
            [720, 450],
            [1200, 450],
            [240, 750],
            [720, 750],
            [1200, 750],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
              <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
            </g>
          ))}
        </g>

        {/* Intersecting circles (path lines) */}
        <g fill="none" stroke="#0a0a0a" strokeOpacity="0.12" strokeWidth="0.6">
          <circle cx="1120" cy="380" r="360" />
          <circle cx="1120" cy="380" r="240" />
          <circle cx="900" cy="500" r="280" />
          <circle cx="1240" cy="640" r="200" />
        </g>

        {/* Small filled marker dot */}
        <circle cx="240" cy="450" r="3" fill="#0a0a0a" opacity="0.5" />
      </svg>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;
