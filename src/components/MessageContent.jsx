import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const normalizeMarkdown = (text) => {
  return text
    .replace(/\n{3,}/g, "\n\n")
    .replace(/([a-zA-Z0-9`])\n([a-zA-Z0-9`])/g, "$1 $2")
    .replace(/\n([,.:;])/g, "$1")
    .trim();
};

export default function MessageContent({ text, role }) {
  if (role === 'user') {
    return (
      <div className="text-base text-zinc-900 whitespace-pre-wrap break-words">
        {text}
      </div>
    );
  }
  const cleanedText = normalizeMarkdown(text);

  return (
    <div className="text-zinc-100 leading-8 text-base">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="text-gray-300 leading-7 mb-6">
              {children}
            </p>
          ),

          h1: ({ children }) => (
            <h1 className="text-2xl font-semibold text-white mt-10 mb-6">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              {children}
            </h3>
          ),

          ul: ({ children }) => (
            <ul className="list-disc ml-6 mb-6 text-gray-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 mb-6 text-gray-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="mb-2 leading-7">
              {children}
            </li>
          ),

          hr: () => <hr className="border-white/10 my-10" />,

          code: ({ inline, children }) => {
            const content = String(children).trim();
            if (inline) {
              return (
                <code className="bg-white/5 text-indigo-300/90 px-1 py-0.5 rounded text-[13px] font-mono">
                  {children}
                </code>
              );
            }
            const isRealCode =
              content.includes("{") ||
              content.includes("}") ||
              content.includes(";") ||
              content.includes("=>") ||
              content.includes("import ") ||
              content.includes("export ") ||
              content.split("\n").length > 1;

            if (!isRealCode) {
              return (
                <code className="bg-white/5 text-indigo-300/90 px-1 py-0.5 rounded text-[13px] font-mono">
                  {children}
                </code>
              );
            }
            return (
              <div className="my-8 rounded-xl border border-white/10 bg-black/60 overflow-hidden">
                <div className="px-4 py-2 text-[11px] uppercase tracking-widest text-gray-400 border-b border-white/10">
                  Code
                </div>
                <pre className="p-5 overflow-x-auto">
                  <code className="font-mono text-sm text-gray-200 leading-6">
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
        }}
      >
        {cleanedText}
      </ReactMarkdown>
    </div>
  );
}