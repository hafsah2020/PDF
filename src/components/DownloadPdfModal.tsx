import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Eye,
  ShieldCheck,
  Info,
  Loader2,
  BookOpen,
  Image as ImageIcon,
} from 'lucide-react';
import {
  generateOriginalDesignHandbookPdf,
  generateOriginalExecutiveSummaryPdf,
  exportSectionAsImage,
  GeneratedPdfResult,
} from '../utils/pdfGenerator';
import { HandbookConfig } from '../types';

interface DownloadPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: HandbookConfig;
  onNativePrint: () => void;
  onEnsurePagesView?: () => void;
}

export const DownloadPdfModal: React.FC<DownloadPdfModalProps> = ({
  isOpen,
  onClose,
  config,
  onNativePrint,
  onEnsurePagesView,
}) => {
  const [lastGenerated, setLastGenerated] = useState<GeneratedPdfResult | null>(null);
  const [activeType, setActiveType] = useState<'full' | 'summary' | 'image' | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<{ current: number; total: number; message: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadFull = async () => {
    try {
      setIsGenerating(true);
      setErrorMessage(null);
      setActiveType('full');
      setProgress({ current: 0, total: 15, message: 'Initializing original design capture...' });

      if (onEnsurePagesView) {
        onEnsurePagesView();
        await new Promise((r) => setTimeout(r, 60));
      }

      const result = await generateOriginalDesignHandbookPdf(config, (current, total, message) => {
        setProgress({ current, total, message });
      });

      setLastGenerated(result);
      result.download();
    } catch (err: any) {
      console.error('PDF Generation error:', err);
      setErrorMessage(
        err?.message || 'Could not complete capture. Please try the "Native Print" option below.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadSummary = async () => {
    try {
      setIsGenerating(true);
      setErrorMessage(null);
      setActiveType('summary');
      setProgress({ current: 0, total: 4, message: 'Capturing Executive Summary with Original Design...' });

      if (onEnsurePagesView) {
        onEnsurePagesView();
        await new Promise((r) => setTimeout(r, 60));
      }

      const result = await generateOriginalExecutiveSummaryPdf(config, (current, total, message) => {
        setProgress({ current, total, message });
      });

      setLastGenerated(result);
      result.download();
    } catch (err: any) {
      console.error('PDF Generation error:', err);
      setErrorMessage(err?.message || 'Failed to generate executive summary.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = async (sectionId: string, label: string) => {
    try {
      setIsGenerating(true);
      setErrorMessage(null);
      setActiveType('image');
      setProgress({ current: 1, total: 1, message: `Exporting ${label} as high-res PNG image with logo...` });

      if (sectionId === 'sec-cover' && onEnsurePagesView) {
        onEnsurePagesView();
        await new Promise((r) => setTimeout(r, 60));
      }

      const safeName = `${config.companyName.replace(/\s+/g, '_')}_${label.replace(/\s+/g, '_')}_${config.year}`;
      await exportSectionAsImage(sectionId, safeName);
    } catch (err: any) {
      console.error('Image Export error:', err);
      setErrorMessage(err?.message || 'Failed to export image.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Download Original Design Document</h2>
              <p className="text-xs text-slate-300">
                {config.companyName} • Includes Crest Logo, Background Watermark & Styling
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-900 text-left">
          {/* Active Generation Progress Bar */}
          {isGenerating && progress && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span>Capturing Pages with Original Design & Logo...</span>
                </span>
                <span className="font-mono bg-blue-100 px-2 py-0.5 rounded text-blue-800">
                  {Math.round((progress.current / Math.max(1, progress.total)) * 100)}%
                </span>
              </div>
              <div className="w-full bg-blue-200/80 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-150 rounded-full"
                  style={{
                    width: `${Math.round((progress.current / Math.max(1, progress.total)) * 100)}%`,
                  }}
                />
              </div>
              <div className="text-[11px] text-blue-700 font-medium truncate">
                {progress.message}
              </div>
            </div>
          )}

          {/* Success Box if Generated */}
          {lastGenerated && !isGenerating && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>PDF Ready ({lastGenerated.pageCount} Pages)</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                  Logo & Watermark Included
                </span>
              </div>
              <p className="text-[11px] text-emerald-800">
                Your PDF contains the exact heraldic crest logo, background security watermark, and styled sections.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {/* Direct download */}
                <a
                  href={lastGenerated.blobUrl}
                  download={lastGenerated.fileName}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF (.pdf)</span>
                </a>

                {/* Open in new tab */}
                <a
                  href={lastGenerated.blobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold shadow-xs transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>Preview in New Tab</span>
                </a>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Notice: </span>
                {errorMessage}
              </div>
            </div>
          )}

          {/* Primary PDF Options */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              PDF Documents (Exact Original Layout & Images)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Full Handbook */}
              <button
                type="button"
                disabled={isGenerating}
                onClick={handleDownloadFull}
                className="p-4 rounded-xl border-2 border-blue-200 hover:border-blue-600 bg-blue-50/40 hover:bg-blue-50 transition-all text-left flex flex-col justify-between space-y-3 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                    15 Pages
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900">
                    Full Staff Handbook (.pdf)
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Complete 15-page handbook with DEER logo, watermark on all pages, 10 Golden Rules, and statutory NDPA policies.
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 pt-1">
                  <Download className="w-3.5 h-3.5" />
                  <span>Generate & Download</span>
                </div>
              </button>

              {/* Executive Summary Button */}
              <button
                type="button"
                disabled={isGenerating}
                onClick={handleDownloadSummary}
                className="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-500 bg-slate-50/60 hover:bg-slate-50 transition-all text-left flex flex-col justify-between space-y-3 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-slate-800 text-white shadow-xs">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-md">
                    Pages 1–4
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 group-hover:text-slate-800">
                    Executive Summary (.pdf)
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Official cover with crest, table of contents, emergency contacts, and 10 Golden Rules.
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 pt-1">
                  <Download className="w-3.5 h-3.5" />
                  <span>Generate & Download</span>
                </div>
              </button>
            </div>
          </div>

          {/* High-Resolution PNG Image Exports */}
          <div className="space-y-3 border-t border-slate-200 pt-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Direct Image Exports (PNG with Logo & Watermark)
            </div>
            <p className="text-xs text-slate-600">
              Need individual high-resolution graphics for presentations, posters, or intranet bulletins?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                disabled={isGenerating}
                onClick={() => handleDownloadImage('sec-cover', 'Cover_Page')}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left group cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-blue-100 text-blue-800 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Cover Page (PNG Image)</div>
                    <div className="text-[10px] text-slate-500">Heraldic Crest + Gold Metadata</div>
                  </div>
                </div>
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
              </button>

              <button
                type="button"
                disabled={isGenerating}
                onClick={() => handleDownloadImage('sec-golden-rules', '10_Golden_Rules')}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left group cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">10 Golden Rules (PNG Image)</div>
                    <div className="text-[10px] text-slate-500">Staff Baseline Rules Poster</div>
                  </div>
                </div>
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Method 2: Browser Native Print to PDF */}
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Native Browser Vector Print (Alternative)
              </div>
              <span className="text-[10px] font-mono text-slate-400">Ctrl+P / Cmd+P</span>
            </div>
            <p className="text-xs text-slate-600">
              Uses your browser's native print engine with full background graphics and watermarks enabled.
            </p>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNativePrint();
                }}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Open Print Dialog (Entire Handbook)</span>
              </button>
            </div>
          </div>

          {/* Iframe Notice & Standalone Tab Opener */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Need unrestricted print/download dialogs?</span>
            </div>
            <a
              href={window.location.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>NDPA 2023 Statutory Compliance Edition</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
