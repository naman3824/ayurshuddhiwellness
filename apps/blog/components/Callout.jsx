export default function Callout({ children, emoji = '💡' }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4 my-6">
      <span className="text-2xl flex-shrink-0">{emoji}</span>
      <div className="text-gray-200 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
