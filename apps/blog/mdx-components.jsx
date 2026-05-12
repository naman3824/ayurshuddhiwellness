export function useMDXComponents(components) {
  return {
    // Default HTML element overrides for styling
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-white mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-green-400 mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-200 mt-4 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-1">{children}</ol>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-green-400 underline hover:text-green-300 transition-colors">
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-400 my-4">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-800 text-green-300 px-1.5 py-0.5 rounded text-sm">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-800 rounded-xl p-4 overflow-x-auto mb-4">{children}</pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border-collapse border border-gray-700">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-gray-700 bg-gray-800 px-4 py-2 text-left text-green-400 font-semibold">{children}</th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-700 px-4 py-2 text-gray-300">{children}</td>
    ),
    hr: () => <hr className="border-gray-700 my-8" />,
    ...components,
  };
}
