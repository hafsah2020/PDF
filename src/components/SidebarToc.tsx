import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  PhoneCall,
  Shield,
  FileCheck,
  FileDown,
  Printer,
  ChevronRight,
  ExternalLink,
  Download,
} from 'lucide-react';
import { tableOfContents } from '../data/handbookContent';
import { HandbookConfig } from '../types';

interface SidebarTocProps {
  config: HandbookConfig;
  activeSectionId: string;
  onSelectSection: (id: string) => void;
  onExportMarkdown: () => void;
  onOpenDownloadPdf?: () => void;
}

export const SidebarToc: React.FC<SidebarTocProps> = ({
  config,
  activeSectionId,
  onSelectSection,
  onExportMarkdown,
  onOpenDownloadPdf,
}) => {
  return (
    <aside className="no-print w-72 shrink-0 border-r border-slate-200 bg-white p-4 h-[calc(100vh-57px)] sticky top-[57px] overflow-y-auto hidden lg:flex flex-col justify-between">
      <div>
        {/* Document meta box */}
        <div className="p-3.5 mb-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
            <span>Official Policy</span>
            <span className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60 font-mono text-[10px]">
              {config.version}
            </span>
          </div>
          <div className="font-bold text-slate-900 text-sm leading-tight">
            {config.documentTitle}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Compliant with NDPA 2023</span>
          </div>
        </div>

        {/* Quick Action Badges */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => onSelectSection('sec-golden-rules')}
            className="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold text-left transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
            <span className="truncate">10 Golden Rules</span>
          </button>
          <button
            onClick={() => onSelectSection('sec-contacts')}
            className="flex items-center gap-1.5 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold text-left transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 shrink-0 text-blue-600" />
            <span className="truncate">Key Contacts</span>
          </button>
        </div>

        {/* Table of contents list */}
        <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-2 mb-2">
          Table of Contents
        </div>

        <nav className="space-y-0.5">
          {tableOfContents.map((item, index) => {
            const isActive = activeSectionId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors group ${
                  isActive
                    ? 'bg-blue-900 text-white font-semibold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-1">
                  <span
                    className={`font-mono text-[10px] w-4 shrink-0 text-right ${
                      isActive ? 'text-blue-200' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="truncate">{item.title}</span>
                </div>
                <span
                  className={`text-[10px] font-mono shrink-0 px-1 py-0.5 rounded ${
                    isActive
                      ? 'bg-blue-800 text-blue-100'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  p.{item.pageNumber}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer controls inside sidebar */}
      <div className="pt-4 border-t border-slate-200 mt-4 space-y-2">
        {onOpenDownloadPdf && (
          <button
            onClick={onOpenDownloadPdf}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        )}

        <button
          onClick={onExportMarkdown}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
        >
          <FileDown className="w-3.5 h-3.5" />
          <span>Copy Clean Markdown</span>
        </button>
      </div>
    </aside>
  );
};
