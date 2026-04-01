import { useState, useEffect, useRef } from "react";
import Frame from "../imports/Frame/Frame";

const DESIGN_WIDTH = 1600;
const DESIGN_HEIGHT = 2000;

export default function App() {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      // Use the container's actual width, not window.innerWidth, to avoid scrollbar issues
      const vw = document.documentElement.clientWidth;
      setScale(vw / DESIGN_WIDTH);
    };
    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(document.documentElement);

    return () => observer.disconnect();
  }, []);

  const scaledHeight = Math.round(DESIGN_HEIGHT * scale);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        maxWidth: "100%",
        height: scaledHeight,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            position: "relative",
          }}
        >
          <Frame />
        </div>
      </div>
    </div>
  );
}
