import { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

interface DataClipboardProps {
  title: string;
  toolName: string;
  data: unknown;
}

export default function DataClipboard({ title, toolName, data }: DataClipboardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 dark:bg-black rounded-xl border border-gray-700 dark:border-gray-800 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[11px] font-medium text-gray-300">{title}</span>
          <span className="text-[9px] px-1.5 py-0.5 bg-blue-900/50 text-blue-300 rounded font-mono">{toolName}</span>
        </div>
        <span className="text-[10px] text-gray-500">{isOpen ? '▼' : '▶'}</span>
      </button>

      {isOpen && (
        <div className="border-t border-gray-700 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 py-1.5 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800">
            <span className="text-[9px] text-gray-500 font-mono">JSON • {jsonString.length} chars</span>
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
          <pre className="p-4 text-[10px] text-gray-300 font-mono overflow-x-auto max-h-96 overflow-y-auto leading-relaxed">
            {jsonString}
          </pre>
        </div>
      )}
    </div>
  );
}
