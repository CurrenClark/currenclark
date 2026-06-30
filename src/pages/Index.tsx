import { useEffect } from "react";
import CubeLink from "@/components/CubeLink";
import ImageWall, { WALL_VH } from "@/components/ImageWall";

// Cubes scattered across the whole wall. left = % of width, top = vh down the page.
// The five projects repeat so a cube or two is always floating in view as you scroll.
// spin = full-rotation duration; all differ and none is faster than 18s.
const cubes = [
  { title: "Peer Pressure", url: "https://www.peer-pressure.app/preview", size: 150, left: 12, top: 6, delay: "0s", spin: "22s" },
  { title: "ModernBlue", url: "https://modernblue.app", size: 120, left: 68, top: 28, delay: "1.1s", spin: "27s" },
  { title: "BRICSHQ", url: "https://bricshq.trade", size: 140, left: 38, top: 52, delay: "0.5s", spin: "19s" },
  { title: "Ballot Hunter", url: "https://ballot-hunter.com", size: 130, left: 80, top: 78, delay: "1.7s", spin: "31s" },
  { title: "Thrift Space", url: "https://thrift-space.com", size: 160, left: 22, top: 104, delay: "2.3s", spin: "24s" },
  { title: "ModernBlue", url: "https://modernblue.app", size: 115, left: 58, top: 128, delay: "0.8s", spin: "20s" },
  { title: "Peer Pressure", url: "https://www.peer-pressure.app/preview", size: 135, left: 30, top: 182, delay: "1.4s", spin: "29s" },
  { title: "Thrift Space", url: "https://thrift-space.com", size: 125, left: 72, top: 206, delay: "2.0s", spin: "23s" },
  { title: "BRICSHQ", url: "https://bricshq.trade", size: 145, left: 18, top: 232, delay: "0.3s", spin: "33s" },
  { title: "Ballot Hunter", url: "https://ballot-hunter.com", size: 130, left: 62, top: 258, delay: "1.9s", spin: "21s" },
  { title: "Peer Pressure", url: "https://www.peer-pressure.app/preview", size: 120, left: 44, top: 284, delay: "1.0s", spin: "26s" },
];

const Index = () => {
  // Inverted scroll: a downward gesture moves the page up, and vice versa.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      window.scrollBy({ top: -e.deltaY, behavior: "auto" });
    };

    let lastY = 0;
    const onTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const y = e.touches[0].clientY;
      window.scrollBy({ top: y - lastY, behavior: "auto" });
      lastY = y;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      className="relative w-full bg-black font-press-start text-white"
      style={{ height: `${WALL_VH}vh` }}
    >
      {/* Image wall — the background for the whole site */}
      <ImageWall />

      {/* Floating clickable cubes scattered across the wall */}
      {cubes.map((c, i) => (
        <div
          key={i}
          className="absolute z-10"
          style={{ left: `${c.left}%`, top: `${c.top}vh`, transform: "translateX(-50%)" }}
        >
          <CubeLink title={c.title} url={c.url} size={c.size} delay={c.delay} spin={c.spin} />
        </div>
      ))}
    </div>
  );
};

export default Index;
