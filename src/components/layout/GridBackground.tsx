export function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-45"
      style={{
        backgroundImage:
          "linear-gradient(rgba(126,163,95,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(126,163,95,0.12) 1px, transparent 1px)",
        backgroundSize: "42px 42px",
      }}
    />
  );
}
