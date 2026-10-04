import { useState, ReactNode } from 'react';
import { X, Code2, Copy, Check, Database, FileJson, Send } from 'lucide-react';

interface FormField {
  name: string;
  type: string;
  required: boolean;
  value: any;
  description?: string;
}

interface FormDevLinkProps {
  children: ReactNode;
  toolName: string;
  fields: FormField[];
  schema: Record<string, any>;
}

export default function FormDevLink({ children, toolName, fields, schema }: FormDevLinkProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Build JSON payload from form fields
  const payload: Record<string, any> = {};
  fields.forEach(field => {
    // Always include required fields, even if empty
    // Only skip optional fields that are empty
    if (field.required || (field.value !== '' && field.value !== null && field.value !== undefined)) {
      payload[field.name] = field.value === '' ? null : field.value;
    }
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1 text-[9px] font-mono text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
        title="View MCP request payload"
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
                <Send className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">MCP Request Payload</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded font-mono">
                  {toolName}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Legend */}
            <div className="px-5 py-2 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 flex items-center gap-4 text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded border-2 border-red-500"></div>
                <span className="text-gray-700 dark:text-gray-300">Mandatory field</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded border-2 border-gray-400"></div>
                <span className="text-gray-700 dark:text-gray-300">Optional field</span>
              </div>
            </div>

            {/* Content - 2 Columns */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700 min-h-0">
              {/* Column 1: Schema */}
              <div className="bg-gray-900 dark:bg-black flex flex-col min-h-0">
                <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Database className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-medium text-emerald-400">Schema</span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 min-h-0">
                  <pre className="text-[11px] text-emerald-300 font-mono leading-relaxed whitespace-pre-wrap">
                    {JSON.stringify(schema, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Column 2: Payload */}
              <div className="bg-gray-900 dark:bg-black flex flex-col min-h-0">
                <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <FileJson className="w-3 h-3 text-blue-400" />
                    <span className="text-[10px] font-medium text-blue-400">Request Payload</span>
                  </div>
                  <span className="text-[9px] text-gray-500 font-mono">
                    {Object.keys(payload).length} fields
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto p-3 min-h-0">
                  <pre className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap">
                    {formatPayloadWithColors(payload, schema)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function formatPayloadWithColors(payload: Record<string, any>, schema: Record<string, any>): ReactNode {
  const lines: ReactNode[] = [];
  lines.push(<span key="open" className="text-gray-400">{'{'}</span>);

  Object.entries(payload).forEach(([key, value], index) => {
    const fieldSchema = schema[key];
    const isRequired = fieldSchema?.required === true;
    const isEmpty = value === null || value === '' || value === undefined;
    
    const valueColor = value === null ? 'text-red-400' :
                       typeof value === 'string' ? 'text-amber-300' : 
                       typeof value === 'number' ? 'text-purple-300' : 
                       typeof value === 'boolean' ? 'text-cyan-300' : 'text-blue-300';

    lines.push(
      <div key={key} className={`my-0.5 ${isRequired ? 'bg-red-900/10' : ''} ${isRequired && isEmpty ? 'border-l-2 border-red-500 pl-2' : ''}`}>
        <span className="text-gray-400">  "{key}"</span>
        <span className="text-gray-400">: </span>
        <span className={valueColor}>
          {value === null ? 'null' : typeof value === 'string' ? `"${value}"` : JSON.stringify(value)}
        </span>
        {index < Object.entries(payload).length - 1 && <span className="text-gray-400">,</span>}
        {isRequired && <span className="text-red-400 text-[8px] ml-2">● required</span>}
        {isRequired && isEmpty && <span className="text-red-400 text-[8px] ml-2">⚠️ missing!</span>}
      </div>
    );
  });

  lines.push(<span key="close" className="text-gray-400">{'}'}</span>);
  return <>{lines}</>;
}
