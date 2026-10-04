import { useState, ReactNode } from 'react';
import { X, Code2, Copy, Check, Database, FileJson } from 'lucide-react';

interface ClipboardItem {
  title: string;
  toolName: string;
  schema: unknown;
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
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-[95vw] h-[90vh] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col overflow-hidden">
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

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              {clipboards.length === 1 ? (
                <ClipboardPanel item={clipboards[0]} />
              ) : (
                <div className="space-y-4">
                  {clipboards.map((item, index) => (
                    <ClipboardPanel key={index} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ClipboardPanel({ item }: { item: ClipboardItem }) {
  const [copiedCol, setCopiedCol] = useState<'schema' | 'data' | null>(null);
  const schemaString = JSON.stringify(item.schema, null, 2);
  const dataString = JSON.stringify(item.data, null, 2);

  const handleCopy = async (type: 'schema' | 'data') => {
    const text = type === 'schema' ? schemaString : dataString;
    await navigator.clipboard.writeText(text);
    setCopiedCol(type);
    setTimeout(() => setCopiedCol(null), 2000);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden h-full flex flex-col">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-gray-900 dark:text-gray-100">{item.title}</span>
          <span className="text-[9px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded font-mono">
            {item.toolName}
          </span>
        </div>
      </div>

      {/* 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700 flex-1 min-h-0">
        {/* Column 1: Schema / Structure */}
        <div className="bg-gray-900 dark:bg-black flex flex-col min-h-0">
          <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <Database className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-medium text-emerald-400">Schema / Structure</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-gray-500 font-mono">{schemaString.length} chars</span>
              <button
                onClick={() => handleCopy('schema')}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                {copiedCol === 'schema' ? (
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
          <div className="flex-1 overflow-y-auto min-h-0">
            <pre className="p-3 text-[11px] text-emerald-300 font-mono leading-relaxed whitespace-pre-wrap">
              {schemaString}
            </pre>
          </div>
        </div>

        {/* Column 2: Actual Data */}
        <div className="bg-gray-900 dark:bg-black flex flex-col min-h-0">
          <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <FileJson className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-medium text-blue-400">Actual Data</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-gray-500 font-mono">{dataString.length} chars</span>
              <button
                onClick={() => handleCopy('data')}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                {copiedCol === 'data' ? (
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
          <div className="flex-1 overflow-y-auto min-h-0">
            <pre className="p-3 text-[11px] text-blue-300 font-mono leading-relaxed whitespace-pre-wrap">
              {dataString}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
