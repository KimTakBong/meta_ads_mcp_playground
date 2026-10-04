import { useState, ReactNode } from 'react';
import { X, Code2, Copy, Check } from 'lucide-react';

interface ClipboardItem {
  title: string;
  toolName: string;
  data: unknown;
}

interface DevLinkProps {
  children: ReactNode;
  clipboards: ClipboardItem[];
}

export default function DevLink({ children, clipboards }: DevLinkProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1 text-[9px] font-mono text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
        title="View raw data"
      >
        {children}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Raw Data Inspector</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded font-mono">
                  {clipboards.length} sources
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content - 2 rows */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {clipboards.map((item, index) => (
                <ClipboardPanel key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ClipboardPanel({ item }: { item: ClipboardItem }) {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(item.data, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 dark:bg-black rounded-xl border border-gray-700 dark:border-gray-800 overflow-hidden">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-gray-300">{item.title}</span>
          <span className="text-[9px] px-1.5 py-0.5 bg-blue-900/50 text-blue-300 rounded font-mono">
            {item.toolName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-gray-500 font-mono">{jsonString.length} chars</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* JSON Content */}
      <pre className="p-4 text-[10px] text-gray-300 font-mono overflow-x-auto max-h-64 overflow-y-auto leading-relaxed">
        {jsonString}
      </pre>
    </div>
  );
}
