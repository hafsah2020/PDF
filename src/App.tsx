import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SidebarToc } from './components/SidebarToc';
import { HandbookPages } from './components/HandbookPages';
import { CustomizerModal } from './components/CustomizerModal';
import { SearchModal } from './components/SearchModal';
import { DownloadPdfModal } from './components/DownloadPdfModal';
import { PresentationView } from './components/PresentationView';
import { HandbookConfig, ViewMode } from './types';
import { initialConfig, goldenRules } from './data/handbookContent';
import { Check, Copy, ExternalLink, Printer } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<HandbookConfig>(() => {
    try {
      const saved = localStorage.getItem('deer_handbook_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load local config', e);
    }
    return initialConfig;
  });

  const [viewMode, setViewMode] = useState<ViewMode>('pages');
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-cover');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDownloadPdfOpen, setIsDownloadPdfOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize document title and theme
  useEffect(() => {
    document.title = `${config.companyName} - ${config.documentTitle}`;
  }, [config.companyName, config.documentTitle]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleUpdateConfig = (newVals: Partial<HandbookConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newVals };
      try {
        localStorage.setItem('deer_handbook_config', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleSaveFullConfig = (newConfig: HandbookConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('deer_handbook_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error(e);
    }
    showToast('Handbook settings and variables updated!');
  };

  const handleResetConfig = () => {
    setConfig(initialConfig);
    try {
      localStorage.removeItem('deer_handbook_config');
    } catch (e) {
      console.error(e);
    }
    showToast('Reset to original handbook defaults.');
  };

  const handleSelectSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    if (viewMode === 'presentation') {
      setViewMode('pages');
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportMarkdown = () => {
    const md = `# ${config.companyName}: ${config.documentTitle}
${config.subtitle}
Governing Framework: ${config.governingLaw} | Version: ${config.version}

## Key Contacts
- Data Protection Officer (DPO): ${config.contacts.dpoName} (${config.contacts.dpoEmail} / ${config.contacts.dpoPhone})
- IT Security: ${config.contacts.itSecurityContacts}
- Legal & Compliance: ${config.contacts.legalComplianceEmail}
- HR / Management: ${config.contacts.hrEmail}
- Finance Escalations: ${config.contacts.financeEmail}

## Your 10 Golden Rules
${goldenRules.map((r) => `${r.number}. **${r.title}**: ${r.description}`).join('\n')}

## Approved Systems & Tools
- Approved Sharing Tools: ${config.tools.approvedSharingTools}
- Restricted/Prohibited Tools: ${config.tools.restrictedTools}
- Approved Cloud Storage: ${config.tools.approvedStorage}

## Emergency Incident Response
1. STOP: Do not keep clicking, sending, or sharing.
2. REPORT: Contact DPO immediately (${config.contacts.dpoPhone}).
3. NO-JUDGE RULE: You report. The organisation investigates.
`;

    navigator.clipboard.writeText(md).then(() => {
      showToast('Markdown copy saved to clipboard!');
    });
  };

  // Determine theme background styling
  const getThemeClass = () => {
    switch (config.theme) {
      case 'cyber-teal':
        return 'bg-slate-900/5 text-slate-900';
      case 'slate-monolith':
        return 'bg-zinc-100 text-zinc-900';
      case 'emerald-forest':
        return 'bg-emerald-900/5 text-slate-900';
      case 'executive-navy':
      default:
        return 'bg-slate-100/70 text-slate-900';
    }
  };

  const getFontFamilyClass = () => {
    switch (config.fontFamily) {
      case 'editorial':
        return 'font-editorial';
      case 'code':
        return 'font-code';
      case 'modern':
      default:
        return 'font-modern';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClass()} ${getFontFamilyClass()} flex flex-col`}>
      {/* Toast message alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Header */}
      <Header
        config={config}
        onUpdateConfig={handleUpdateConfig}
        viewMode={viewMode}
        onChangeViewMode={(mode) => setViewMode(mode)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onPrint={handlePrint}
        onOpenDownloadPdf={() => setIsDownloadPdfOpen(true)}
      />

      {/* Presentation Fullscreen Mode */}
      {viewMode === 'presentation' ? (
        <PresentationView config={config} onExit={() => setViewMode('pages')} />
      ) : (
        <div className="flex-1 flex w-full">
          {/* Table of Contents Sticky Sidebar (Hidden on print & small screens) */}
          <SidebarToc
            config={config}
            activeSectionId={activeSectionId}
            onSelectSection={handleSelectSection}
            onExportMarkdown={handleExportMarkdown}
            onOpenDownloadPdf={() => setIsDownloadPdfOpen(true)}
          />

          {/* Main Document Content Canvas */}
          <main className="flex-1 overflow-y-auto pb-16">
            <HandbookPages
              config={config}
              mode={viewMode === 'continuous' ? 'continuous' : 'pages'}
              activeSectionId={activeSectionId}
              onUpdateLogo={(dataUrl) => {
                handleUpdateConfig({ customLogoUrl: dataUrl });
                showToast('Custom logo updated across all pages!');
              }}
            />
          </main>
        </div>
      )}

      {/* Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onSave={handleSaveFullConfig}
        onReset={handleResetConfig}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSection={handleSelectSection}
      />

      {/* Download PDF Modal */}
      <DownloadPdfModal
        isOpen={isDownloadPdfOpen}
        onClose={() => setIsDownloadPdfOpen(false)}
        config={config}
        onNativePrint={handlePrint}
        onEnsurePagesView={() => {
          if (viewMode !== 'pages' && viewMode !== 'continuous') {
            setViewMode('pages');
          }
        }}
      />
    </div>
  );
}
