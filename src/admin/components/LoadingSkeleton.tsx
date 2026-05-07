export const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-lg border border-[#d4af37]/10 bg-[#d4af37]/10" />
        ))}
      </div>
      <div className="h-12 animate-pulse rounded-lg border border-[#d4af37]/10 bg-[#d4af37]/10" />
      <div className="rounded-lg border border-[#d4af37]/10 bg-black/50 p-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="mb-3 h-12 animate-pulse rounded-lg bg-[#d4af37]/10 last:mb-0" />
        ))}
      </div>
    </div>
  );
};
