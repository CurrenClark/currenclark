// Packed irregular mosaic that FULLY covers the background — no black gaps.
// Varied row heights and column counts/widths (uneven sizes, not a grid). Each
// image is used exactly once. Tiles are oversized by `O` so they overlap every
// seam and bleed off the page edges. Total height = 3 viewports (3 pages tall).

const modules = import.meta.glob("../assets/collage/*.{webp,jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

const images = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src as string);

// Irregular layout: mix of 1/2/3-column rows with varied widths and heights.
// Column widths in each row sum to 100 (vw); row heights sum to 300 (vh) = 3 pages.
const ROWS = [
  { h: 50, cols: [46, 54] },
  { h: 44, cols: [30, 36, 34] },
  { h: 58, cols: [100] },
  { h: 46, cols: [38, 28, 34] },
  { h: 54, cols: [56, 44] },
  { h: 48, cols: [48, 52] },
];

const O = 4; // overlap/bleed in vw & vh so seams and edges never show black

export const WALL_VH = ROWS.reduce((s, r) => s + r.h, 0); // 300 = 3 pages tall

interface Tile {
  src: string;
  left: number;
  top: number;
  w: number;
  h: number;
  z: number;
}

const tiles: Tile[] = [];
{
  let top = 0;
  let idx = 0;
  for (const row of ROWS) {
    let left = 0;
    for (const w of row.cols) {
      tiles.push({
        src: images[idx % images.length],
        left: left - O,
        top: top - O,
        w: w + O * 2,
        h: row.h + O * 2,
        z: idx + 1,
      });
      left += w;
      idx++;
    }
    top += row.h;
  }
}

const ImageWall = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-black">
    {tiles.map((t, i) => (
      <img
        key={i}
        src={t.src}
        alt=""
        aria-hidden="true"
        draggable={false}
        loading={t.top < 100 ? "eager" : "lazy"}
        className="absolute select-none object-cover"
        style={{
          left: `${t.left}vw`,
          top: `${t.top}vh`,
          width: `${t.w}vw`,
          height: `${t.h}vh`,
          zIndex: t.z,
        }}
      />
    ))}
  </div>
);

export default ImageWall;
