import type { CSSProperties } from "react";

interface CubeLinkProps {
  title: string;
  url: string;
  size: number; // cube edge length in px
  delay: string; // animation delay, e.g. "1.2s"
  spin: string; // full-rotation duration, e.g. "24s" (higher = slower)
}

const CubeLink = ({ title, url, size, delay, spin }: CubeLinkProps) => {
  const cubeStyle = {
    "--cs": `${size}px`,
    animationDelay: delay,
    animationDuration: spin,
  } as CSSProperties;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      className="cube-link block"
    >
      <div className="scene" style={{ animationDelay: delay }}>
        <div className="cube" style={cubeStyle}>
          <span className="cube__face cube__face--front">{title}</span>
          <span className="cube__face cube__face--back">{title}</span>
          <span className="cube__face cube__face--right">{title}</span>
          <span className="cube__face cube__face--left">{title}</span>
          <span className="cube__face cube__face--top" />
          <span className="cube__face cube__face--bottom" />
        </div>
      </div>
    </a>
  );
};

export default CubeLink;
