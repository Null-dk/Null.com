/**
 * Generates an edge-refraction normal map for a rounded rectangle ("squircle"
 * enough at these radii) to drive an SVG <feDisplacementMap>.
 *
 * Encoding follows the feDisplacementMap convention:
 *   - red   channel -> X displacement   (128 = neutral)
 *   - green channel -> Y displacement   (128 = neutral)
 *
 * Displacement is concentrated in a band of `depth` px just inside the edge and
 * points along the surface normal, so the backdrop appears to bend at the rim
 * like real glass. The interior stays neutral (no displacement).
 *
 * Returns a PNG data URL, or null when no DOM/canvas is available (SSR/build).
 */
export function generateSquircleDisplacement({
  width,
  height,
  radius = 22,
  depth = 14,
}) {
  if (typeof document === 'undefined') return null;

  // Cap resolution — the map is stretched to the element by the filter, so a
  // smaller buffer keeps generation cheap without a visible quality loss.
  const MAX = 600;
  const scale = Math.min(1, MAX / Math.max(width, height, 1));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  const r = radius * scale;
  const band = Math.max(1, depth * scale);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  const image = ctx.createImageData(w, h);
  const data = image.data;
  const halfW = w / 2;
  const halfH = h / 2;

  // Signed distance to a rounded rectangle centered at the origin.
  // Negative inside, positive outside.
  const sdf = (px, py) => {
    const qx = Math.abs(px) - (halfW - r);
    const qy = Math.abs(py) - (halfH - r);
    const ax = Math.max(qx, 0);
    const ay = Math.max(qy, 0);
    const outside = Math.hypot(ax, ay);
    const inside = Math.min(Math.max(qx, qy), 0);
    return outside + inside - r;
  };

  const eps = 1;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x - halfW + 0.5;
      const py = y - halfH + 0.5;

      const d = sdf(px, py);
      const distFromEdge = -d; // positive inside

      let nx = 0;
      let ny = 0;

      // Only the inner edge band refracts.
      if (d < 0 && distFromEdge < band) {
        // Outward surface normal via finite differences of the SDF.
        const gx = sdf(px + eps, py) - sdf(px - eps, py);
        const gy = sdf(px, py + eps) - sdf(px, py - eps);
        const len = Math.hypot(gx, gy) || 1;

        // Magnitude ramps up toward the very edge (squircle-ish ease).
        const t = 1 - distFromEdge / band; // 0 inside -> 1 at edge
        const m = t * t;

        nx = (gx / len) * m;
        ny = (gy / len) * m;
      }

      const i = (y * w + x) * 4;
      data[i] = 128 + nx * 127;     // R -> X
      data[i + 1] = 128 + ny * 127; // G -> Y
      data[i + 2] = 128;            // B unused
      data[i + 3] = 255;            // A opaque
    }
  }

  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL('image/png');
}
