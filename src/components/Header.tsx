import React from 'react';
import {
  Printer,
  Sliders,
  Search,
  BookOpen,
  FileText,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  Download,
  ExternalLink,
} from 'lucide-react';
import { DeerLogo } from './DeerLogo';
import { FontFamily, HandbookConfig, ThemeId, ViewMode } from '../types';

interface HeaderProps {
  config: HandbookConfig;
  onUpdateConfig: (newConfig: Partial<HandbookConfig>) => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  onOpenCustomizer: () => void;
  onOpenSearch: () => void;
  onPrint: () => void;
  onOpenDownloadPdf: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onUpdateConfig,
  viewMode,
  onChangeViewMode,
  onOpenCustomizer,
  onOpenSearch,
  onPrint,
  onOpenDownloadPdf,
}) => {
  const themes: { id: ThemeId; name: string; color: string }[] = [
    { id: 'executive-navy', name: 'Executive Navy', color: '#1e3a8a' },
    { id: 'cyber-teal', name: 'Cyber Teal', color: '#0d9488' },
    { id: 'slate-monolith', name: 'Slate Monolith', color: '#334155' },
    { id: 'emerald-forest', name: 'Emerald Forest', color: '#047857' },
  ];

  const fonts: { id: FontFamily; name: string }[] = [
    { id: 'modern', name: 'Modern Sans' },
    { id: 'editorial', name: 'Editorial Serif' },
  ];

  return (
    <header className="app-header no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div
            className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            onClick={() => onChangeViewMode('pages')}
            title="DEER Nigeria Handbook"
          >
            <DeerLogo
              size={36}
              showText={false}
              accentColor={config.accentColor}
              customLogoUrl={config.customLogoUrl}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                DEER Nigeria
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                Handbook Publisher
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {config.subtitle}
            </p>
          </div>
        </div>

        {/* Center: View Mode Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => onChangeViewMode('pages')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              viewMode === 'pages'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Standard multi-page A4 publication layout"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>PDF Pages</span>
          </button>
          <button
            onClick={() => onChangeViewMode('continuous')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              viewMode === 'continuous'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Scrollable document reader mode"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Reader</span>
          </button>
        </div>

        {/* Right: Actions & Tools */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
            title="Search policy handbook"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
          </button>

          {/* Customize Variables & Design */}
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg border border-slate-200 transition-colors"
            title="Customize handbook contacts, tools, and branding"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          {/* Download PDF & Print Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenDownloadPdf}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 active:bg-blue-950 rounded-lg shadow-sm hover:shadow transition-all"
              title="Download PDF directly or Save via Print dialog"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onPrint}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
              title="Quick browser print dialog (Ctrl+P / Cmd+P)"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden md:inline">Print</span>
            </button>

            <a
              href={window.location.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
              title="Open app in standalone browser tab to bypass iframe download restrictions"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
              <span>New Tab</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
