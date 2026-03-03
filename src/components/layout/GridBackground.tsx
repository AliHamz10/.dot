export function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        opacity: "var(--grid-overlay-opacity)",
        backgroundImage:
          "linear-gradient(rgba(126,163,95,var(--grid-line-opacity)) 1px, transparent 1px), linear-gradient(90deg, rgba(126,163,95,var(--grid-line-opacity)) 1px, transparent 1px)",
        backgroundSize: "var(--grid-size) var(--grid-size)",
      }}
    />
  );
}
