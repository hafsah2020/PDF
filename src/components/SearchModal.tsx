import React, { useState, useMemo } from 'react';
import { Search, X, ChevronRight, FileText, ArrowUpRight } from 'lucide-react';
import { tableOfContents, goldenRules } from '../data/handbookContent';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: string) => void;
}

interface SearchEntry {
  title: string;
  sectionId: string;
  snippet: string;
  category: string;
  pageNumber: number;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSection,
}) => {
  const [query, setQuery] = useState('');

  const searchableData: SearchEntry[] = useMemo(() => {
    return [
      {
        title: 'Your 10 Golden Rules',
        sectionId: 'sec-golden-rules',
        snippet: 'Only access info needed. Only collect what is needed. Stop before you share. Keep passwords & OTP private. Lock screen. Ask the DPO.',
        category: 'Core Principles',
        pageNumber: 4,
      },
      {
        title: 'Key Contacts & Escalations',
        sectionId: 'sec-contacts',
        snippet: 'Data Protection Officer Hafsah Anibaba, IT Security mukhtar and adebayo, Legal Compliance, HR Lanre, Finance.',
        category: 'Governance',
        pageNumber: 5,
      },
      {
        title: 'Passwords, OTPs, Devices & Access',
        sectionId: 'sec-passwords-access',
        snippet: 'Never share password or OTP even with IT. Enable MFA on GitHub & WhatsApp. Lock screen before leaving. Reject phantom login requests.',
        category: 'Identity & Access',
        pageNumber: 12,
      },
      {
        title: 'Phishing, CEO Fraud & Strange Links',
        sectionId: 'sec-phishing',
        snippet: 'CEO fraud impersonation on WhatsApp, IT Support OTP trap, unexpected payroll links. Verify out-of-band via phone call.',
        category: 'Threat Awareness',
        pageNumber: 13,
      },
      {
        title: 'Payment & Vendor Scams (BEC)',
        sectionId: 'sec-payment-scams',
        snippet: 'Never change payment or supplier bank details from email alone. Always call verified official number before updating bank accounts.',
        category: 'Financial Protection',
        pageNumber: 15,
      },
      {
        title: 'Personal Email, WhatsApp & Remote Work',
        sectionId: 'sec-remote-work',
        snippet: 'Do not forward work email to personal Gmail/Yahoo. Use DEER Nigeria Google Workspace and GitHub. Screen privacy and public Wi-Fi risks.',
        category: 'Remote & BYOD',
        pageNumber: 16,
      },
      {
        title: 'What to Do if You Clicked',
        sectionId: 'sec-clicked-incident',
        snippet: 'Stop immediately, report to IT/Security. Entered password? Opened attachment? Sent to wrong person? Lost laptop? REPORT FIRST.',
        category: 'Incident Handling',
        pageNumber: 17,
      },
      {
        title: 'Stop Before You Share (S-T-O-P)',
        sectionId: 'sec-stop-share',
        snippet: 'S - Stop. T - Think. O - Open and check (recipient, email, attachments). P - Protect. Would I still send this if it was mine?',
        category: 'Communications',
        pageNumber: 10,
      },
      {
        title: 'Confidentiality at Work & Paper Records',
        sectionId: 'sec-work-confidentiality',
        snippet: 'Do not discuss customer info in public places, beware of screenshots exposing tabs/tokens, dispose of paper via secure shredding.',
        category: 'Workplace Security',
        pageNumber: 11,
      },
      {
        title: 'Requests About Personal Information',
        sectionId: 'sec-data-requests',
        snippet: 'Customer data access/deletion requests must go to DPO. Law enforcement, police, or government requests go to Legal/DPO.',
        category: 'Legal Escalations',
        pageNumber: 18,
      },
      {
        title: 'Why This Matters (NDPA 2023)',
        sectionId: 'sec-why-matters',
        snippet: 'Information belongs to real people. Regulated under Nigeria Data Protection Act 2023. Three things: Personal, Sensitive, Confidential.',
        category: 'Fundamentals',
        pageNumber: 7,
      },
    ];
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return searchableData.slice(0, 6);
    const q = query.toLowerCase();
    return searchableData.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, searchableData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search handbook (e.g., OTP, WhatsApp, phishing, police, DPO)..."
            className="w-full bg-transparent text-slate-900 text-sm focus:outline-none placeholder:text-slate-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 text-slate-500 hover:text-slate-800 bg-slate-200 rounded-md"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No matching sections found for "{query}". Try "password", "DPO", or "incident".
            </div>
          ) : (
            results.map((r) => (
              <button
                key={r.sectionId}
                onClick={() => {
                  onSelectSection(r.sectionId);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-colors group flex items-start justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors">
                      {r.category}
                    </span>
                    <span className="text-xs text-slate-400">Page {r.pageNumber}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                    {r.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {r.snippet}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0 mt-1" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
