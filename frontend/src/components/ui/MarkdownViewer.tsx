import ReactMarkdown from 'react-markdown';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className = '' }: MarkdownViewerProps) {
  if (!content) return null;

  return (
    <div className={`markdown-content text-zinc-300 leading-relaxed font-sans text-xs ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-sm font-bold text-white uppercase tracking-wider mt-3 mb-1.5 border-b border-white/10 pb-1">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xs font-bold text-white uppercase tracking-wider mt-2.5 mb-1">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xs font-semibold text-zinc-200 mt-2 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mb-2 leading-relaxed text-zinc-300">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
          em: ({ children }) => <em className="italic text-zinc-400">{children}</em>,
          ul: ({ children }) => <ul className="space-y-1 my-1.5 pl-4 list-disc marker:text-zinc-500">{children}</ul>,
          ol: ({ children }) => <ol className="space-y-1 my-1.5 pl-4 list-decimal marker:text-zinc-500">{children}</ol>,
          li: ({ children }) => <li className="text-zinc-300 leading-relaxed">{children}</li>,
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-200 font-mono text-[11px] border border-white/10">
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-white/40 pl-3 my-2 text-zinc-400 italic">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
