import { useState } from "react";
import logoAsset from "@/assets/bej-logo.png.asset.json";
import markAsset from "@/assets/bej-mark.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className={cn("inline-flex items-center gap-3 select-none", className)}>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black shadow-md shadow-orange-500/20 text-lg tracking-wider">
          B
        </div>
        <div className="flex flex-col text-left">
          <span
            className={cn(
              "font-black tracking-tight text-base leading-none",
              onDark ? "text-white" : "text-slate-900",
            )}
          >
            Biz Expert's
          </span>
          <span className="font-extrabold uppercase tracking-widest text-[10px] text-orange-500 leading-tight">
            Junction
          </span>
        </div>
      </div>
    );
  }

  const img = (
    <img
      src="/logo.png"
      alt="Biz Expert's Junction"
      onError={() => setImageError(true)}
      className={cn("h-10 w-auto object-contain sm:h-12", className)}
    />
  );

  if (!onDark) return img;
  return (
    <span className="inline-flex rounded-xl bg-white/90 backdrop-blur-md px-3 py-1.5 shadow-sm border border-slate-200/60">
      {img}
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black shadow-lg shadow-orange-500/25 text-xl tracking-wider",
          className,
        )}
      >
        B
      </div>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="Biz Expert's Junction mark"
      onError={() => setImageError(true)}
      className={cn("h-12 w-auto object-contain", className)}
    />
  );
}
