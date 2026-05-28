export function CssBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 opacity-80"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,174,255,0.22),transparent_28%),radial-gradient(circle_at_88%_5%,rgba(124,58,237,0.26),transparent_32%),radial-gradient(circle_at_50%_108%,rgba(236,72,153,0.18),transparent_34%)]" />
      <div className="absolute -left-20 top-24 h-56 w-56 animate-pulse rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -right-16 bottom-16 h-64 w-64 animate-pulse rounded-full bg-violet-500/20 blur-3xl" />
    </div>
  );
}
