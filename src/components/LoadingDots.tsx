export function LoadingDots({ text = '正在生成' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-ink/70">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-rose rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2.5 h-2.5 bg-amber rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2.5 h-2.5 bg-moss rounded-full animate-bounce" />
      </div>
      <span className="font-display text-lg">{text}</span>
    </div>
  );
}
