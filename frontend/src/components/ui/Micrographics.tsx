export const SVGBracket = ({ className = "" }: { className?: string }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute ${className}`}
  >
    <path d="M0 0H3V1H1V3H0V0Z" fill="currentColor" />
    <path d="M10 0H7V1H9V3H10V0Z" fill="currentColor" />
    <path d="M0 10H3V9H1V7H0V10Z" fill="currentColor" />
    <path d="M10 10H7V9H9V7H10V10Z" fill="currentColor" />
  </svg>
);

export const StatusDot = ({ status }: { status: 'safe' | 'pending' | 'danger' | 'info' }) => {
  let color = 'bg-zinc-500';
  if (status === 'safe') color = 'bg-[#10b981]'; // Emerald
  if (status === 'pending') color = 'bg-[#f59e0b]'; // Amber
  if (status === 'danger') color = 'bg-[#ef4444]'; // Crimson
  if (status === 'info') color = 'bg-[#06b6d4]'; // Cyan

  return (
    <span className="relative flex h-2 w-2">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color}`}></span>
      <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`}></span>
    </span>
  );
};
