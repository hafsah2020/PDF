import React from 'react';
import {
  Shield,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  PhoneCall,
  Mail,
  HelpCircle,
  FileText,
  UserCheck,
  Send,
  Eye,
  Camera,
  FileWarning,
  Laptop,
  Globe,
  Share2,
  Briefcase,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { DeerLogo } from './DeerLogo';
import { goldenRules, incidentChecklistItems } from '../data/handbookContent';
import { HandbookConfig } from '../types';

interface HandbookPagesProps {
  config: HandbookConfig;
  mode: 'pages' | 'continuous';
  activeSectionId?: string;
  onUpdateLogo?: (dataUrl: string) => void;
}

export const HandbookPages: React.FC<HandbookPagesProps> = ({
  config,
  mode,
  activeSectionId,
  onUpdateLogo,
}) => {
  const isContinuous = mode === 'continuous';

  // Running Page Header helper
  const PageHeader: React.FC<{ title: string; category?: string }> = ({ title, category }) => (
    <div className="relative z-10 flex items-center justify-between pb-3 mb-6 border-b border-slate-200 text-[11px] text-slate-500 font-medium">
      <div className="flex items-center gap-2">
        <DeerLogo
          size={20}
          showText={false}
          monochrome
          accentColor={config.accentColor}
          customLogoUrl={config.customLogoUrl}
        />
        <span className="font-bold text-slate-900 tracking-wider uppercase text-[10px]">
          {config.companyName}
        </span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-600 truncate">{config.subtitle}</span>
      </div>
      <div className="flex items-center gap-2">
        {category && (
          <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
            {category}
          </span>
        )}
      </div>
    </div>
  );

  // Running Page Footer helper
  const PageFooter: React.FC<{ pageNum: number; totalPages?: number }> = ({
    pageNum,
    totalPages = 15,
  }) => (
    <div className="relative z-10 flex items-center justify-between pt-4 mt-8 border-t border-slate-200 text-[11px] text-slate-400 font-mono">
      <div>
        <span>{config.companyName} Internal Staff Policy</span>
        <span className="mx-2 text-slate-300">•</span>
        <span>{config.governingLaw}</span>
      </div>
      <div className="font-semibold text-slate-600">
        Page {pageNum} of {totalPages}
      </div>
    </div>
  );

  // Subtle security watermark overlay for all pages
  const WatermarkOverlay: React.FC<{ size?: number }> = ({ size = 460 }) => {
    if (!config.showWatermark) return null;
    return (
      <div
        className="watermark-element absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        style={{ opacity: (config.watermarkOpacity ?? 7) / 100 }}
        aria-hidden="true"
      >
        {config.customLogoUrl ? (
          <img
            src={config.customLogoUrl}
            alt="DEER Nigeria Watermark"
            className="w-[420px] max-w-[65%] max-h-[65%] object-contain filter grayscale"
            referrerPolicy="no-referrer"
          />
        ) : (
          <DeerLogo
            size={size}
            showText={false}
            isWatermark={true}
            accentColor={config.accentColor}
          />
        )}
      </div>
    );
  };

  const containerClass = isContinuous
    ? 'space-y-12 max-w-4xl mx-auto py-6 px-4'
    : 'space-y-8 max-w-[850px] mx-auto py-6 px-4';

  const sheetClass = isContinuous
    ? 'relative overflow-hidden bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs'
    : 'relative overflow-hidden pdf-page-sheet bg-white rounded-xl p-8 sm:p-12 border border-slate-200 shadow-md min-h-[1100px] flex flex-col justify-between';

  return (
    <div className={`document-wrapper ${containerClass}`}>
      {/* ========================================================================= */}
      {/* PAGE 1: COVER PAGE */}
      {/* ========================================================================= */}
      {config.showCover && (
        <section id="sec-cover" className={`${sheetClass} text-center`}>
          <WatermarkOverlay size={520} />

          {/* Top header mark */}
          <div className="relative z-10 flex justify-between items-center text-xs font-semibold text-slate-400 tracking-wider uppercase">
            <span>Official Policy Document</span>
            <span className="font-mono text-slate-500">REF: DPO-SEC-{config.year}-01</span>
          </div>

          {/* Central Heraldic Shield & Title */}
          <div className="my-auto py-10 flex flex-col items-center">
            <label
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const file = e.dataTransfer.files?.[0];
                if (file && file.type.startsWith('image/') && onUpdateLogo) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    onUpdateLogo(event.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="relative group mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs flex items-center justify-center cursor-pointer hover:border-blue-300 transition-all"
              title="Click or drop logo image to replace logo across all pages"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && onUpdateLogo) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      onUpdateLogo(event.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <DeerLogo
                size={140}
                showText
                accentColor={config.accentColor}
                customLogoUrl={config.customLogoUrl}
              />
              <div className="no-print absolute -bottom-2 bg-slate-900/90 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                Drop or click to update logo
              </div>
            </label>

            <div className="space-y-3 max-w-2xl mx-auto">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight uppercase">
                {config.documentTitle}
              </h1>
              <div className="h-1 w-24 bg-blue-900 mx-auto rounded-full my-4" />
              <p className="text-base sm:text-lg text-slate-600 font-medium">
                {config.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 italic max-w-md mx-auto">
                {config.targetAudience}
              </p>
            </div>
          </div>

          {/* Bottom metadata box */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-left bg-slate-50/70 p-4 rounded-xl">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Applicable Entity</div>
              <div className="font-semibold text-slate-800">{config.companyName}</div>
              <div className="text-slate-500">{config.country}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Statutory Framework</div>
              <div className="font-semibold text-slate-800">{config.governingLaw}</div>
              <div className="text-slate-500">Statutory Compliance</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Document Status</div>
              <div className="font-semibold text-emerald-700">{config.version}</div>
              <div className="text-slate-500">Effective Year: {config.year}</div>
            </div>
          </div>
          <PageFooter pageNum={1} />
        </section>
      )}

      {/* ========================================================================= */}
      {/* PAGE 2: TABLE OF CONTENTS */}
      {/* ========================================================================= */}
      {config.showToc && (
        <section id="sec-toc" className={sheetClass}>
          <WatermarkOverlay />
          <PageHeader title="Table of Contents" category="Executive Index" />
          <div className="space-y-6 flex-1">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-2xl font-bold text-slate-900">Contents</h2>
              <p className="text-xs text-slate-500 mt-1">
                Quick reference guide to data protection, security protocols, and incident escalation.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 text-xs">
              {[
                { title: 'Key Contacts & Escalations', page: 3, desc: 'DPO, IT Security, Legal, HR and Finance contacts' },
                { title: 'Your 10 Golden Rules', page: 4, desc: 'Essential baseline rules every employee must know' },
                { title: 'Why This Matters & Three Things We Protect', page: 5, desc: 'NDPA 2023 foundation, Personal and Confidential data taxonomy' },
                { title: 'What Information Must I Protect? (DO & DON\'T)', page: 6, desc: 'Classification guidelines and everyday handling rules' },
                { title: 'Stop Before You Share (S-T-O-P Framework)', page: 7, desc: 'Protocol for emails, customer reports, and external tools' },
                { title: 'Confidentiality at Work & Paper Records', page: 8, desc: 'Clean desk guidelines, screenshot risks, and secure shredding' },
                { title: 'Passwords, OTPs, Devices & Access Security', page: 9, desc: 'Multi-factor authentication, screen locks, zero credential sharing' },
                { title: 'Phishing, Social Engineering & Impersonation', page: 10, desc: 'CEO fraud, IT Support OTP scams, and suspicious links' },
                { title: 'Payment & Vendor Scams (BEC Risks)', page: 11, desc: 'Supplier bank change verification and executive pushback scripts' },
                { title: 'Personal Email, WhatsApp & Remote Work', page: 12, desc: 'Official Google Workspace & GitHub standards, BYOD and Wi-Fi risks' },
                { title: 'What to Do if You Clicked (Incident Response)', page: 13, desc: 'Incident response protocol and company no-judge reporting policy' },
                { title: 'Requests About Personal Information & Authorities', page: 14, desc: 'Subject access rights, law enforcement, and vendor vetting' },
                { title: 'Roles & Responsibilities Across the Organisation', page: 15, desc: 'Individual responsibility, manager oversight, and disciplinary terms' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border-b border-dotted border-slate-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-slate-400 w-5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="font-semibold text-slate-900">{item.title}</span>
                      <span className="text-slate-400 block text-[11px]">{item.desc}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-xs">
                    p. {item.page}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <PageFooter pageNum={2} />
        </section>
      )}

      {/* ========================================================================= */}
      {/* PAGE 3: KEY CONTACTS */}
      {/* ========================================================================= */}
      <section id="sec-contacts" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Key Contacts" category="Governance" />
        <div className="space-y-6 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Key Contacts</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Below are the primary contact details for data protection, security, legal, and finance escalations across the organisation. Save these to your address book immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DPO Lead Card */}
            <div className="p-5 rounded-xl border-2 border-blue-600 bg-blue-50/40 shadow-xs md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-600 text-white">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">
                      Primary Regulatory & Privacy Officer
                    </div>
                    <div className="font-bold text-slate-900 text-base">
                      Data Protection Officer / Data Protection Team
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-blue-100 text-blue-900">
                  Lead Authority
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-blue-200/80 text-xs">
                <div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">Officer Name</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{config.contacts.dpoName}</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">Direct Email</div>
                  <a href={`mailto:${config.contacts.dpoEmail}`} className="font-mono text-blue-800 hover:underline font-medium text-xs mt-0.5 block">
                    {config.contacts.dpoEmail}
                  </a>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">Phone / WhatsApp</div>
                  <a href={`tel:${config.contacts.dpoPhone}`} className="font-mono font-bold text-slate-900 hover:text-blue-800 text-xs mt-0.5 block">
                    {config.contacts.dpoPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* IT Security */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-xs">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>IT / Cybersecurity Operations</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                For malware alerts, credential locks, lost devices, or suspicious links:
              </p>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-blue-900 font-semibold break-all">
                {config.contacts.itSecurityContacts}
              </div>
            </div>

            {/* Legal & Compliance */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-xs">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Legal & Regulatory Compliance</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                For court orders, regulatory letters, police requests, or NDPA inquiries:
              </p>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-900 font-semibold min-h-[38px] flex items-center">
                {config.contacts.legalComplianceEmail || '\u00A0'}
              </div>
            </div>

            {/* HR / People Management */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-xs">
                <UserCheck className="w-4 h-4 text-purple-600" />
                <span>HR / People Operations</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                For staff confidentiality agreements, onboarding policy, and disciplinary inquiries:
              </p>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-900 font-semibold">
                {config.contacts.hrEmail}
              </div>
            </div>

            {/* Finance Escalation */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-xs">
                <PhoneCall className="w-4 h-4 text-amber-600" />
                <span>Finance & Payment Escalations</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                For urgent verification of vendor banking details and high-value approvals:
              </p>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-900 font-semibold">
                {config.contacts.financeEmail}
              </div>
            </div>
          </div>
        </div>
        <PageFooter pageNum={3} />
      </section>

      {/* ========================================================================= */}
      {/* PAGE 4: YOUR 10 GOLDEN RULES */}
      {/* ========================================================================= */}
      <section id="sec-golden-rules" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Core Principles" category="Baseline Standards" />
        <div className="space-y-4 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your 10 Golden Rules</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Protecting information is part of everyone's job. You do not need to be a lawyer or a cybersecurity expert. You only need to follow these rules and ask for help whenever you are unsure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {goldenRules.map((rule) => (
              <div
                key={rule.number}
                className="p-3 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                  {rule.number}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                    {rule.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-900 text-white rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-300" />
            <span>Golden Principle #10: When you are unsure, always ASK the DPO!</span>
          </div>
        </div>
        <PageFooter pageNum={4} />
      </section>

      {/* ========================================================================= */}
      {/* PAGE 5: WHY THIS MATTERS & THREE THINGS WE PROTECT */}
      {/* ========================================================================= */}
      <section id="sec-why-matters" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Why This Matters" category="Legal Foundation" />
        <div className="space-y-5 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Why This Matters</h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
              Information belongs to real people and real businesses. Poor handling can expose customers, employees, and the organisation to fraud, embarrassment, financial loss, identity misuse, or irreversible legal harm.
            </p>
          </div>

          {/* Legal Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Statutory Benchmark
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              Nigerian data protection rules require organisations to handle personal information fairly, for proper purposes, and with appropriate security. The <strong className="text-blue-900">{config.governingLaw}</strong> is the organisation's primary legal reference. However, this handbook is not a law textbook — it gives you practical operational directives for work.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3">Three Things We Protect</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Category 1 */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
                <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>1. Personal Information</span>
                </div>
                <p className="text-[11px] text-slate-600 mb-2 leading-relaxed">
                  Information relating to an identified or identifiable living person.
                </p>
                <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Examples:</div>
                <div className="text-xs text-slate-800 font-mono space-y-0.5 bg-white p-2 rounded border border-blue-100">
                  <div>• Full name & Phone</div>
                  <div>• Email & Home address</div>
                  <div>• Employee ID & IP address</div>
                  <div>• Customer order history</div>
                </div>
              </div>

              {/* Category 2 */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
                <div className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>2. Sensitive Personal Data</span>
                </div>
                <p className="text-[11px] text-slate-600 mb-2 leading-relaxed">
                  High-risk information that could cause severe discrimination or harm if exposed.
                </p>
                <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Examples:</div>
                <div className="text-xs text-slate-800 font-mono space-y-0.5 bg-white p-2 rounded border border-rose-100">
                  <div>• Biometrics & Fingerprints</div>
                  <div>• Health & Medical data</div>
                  <div>• Religious beliefs & Unions</div>
                  <div>• Criminal record history</div>
                </div>
              </div>

              {/* Category 3 */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>3. Confidential Business Data</span>
                </div>
                <p className="text-[11px] text-slate-600 mb-2 leading-relaxed">
                  Proprietary company assets, strategic plans, and commercial secrets.
                </p>
                <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Examples:</div>
                <div className="text-xs text-slate-800 font-mono space-y-0.5 bg-white p-2 rounded border border-amber-100">
                  <div>• Financials & Pricing terms</div>
                  <div>• Business plans & Contracts</div>
                  <div>• Passwords & System codes</div>
                  <div>• Unpublished project files</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PageFooter pageNum={5} />
      </section>

      {/* ========================================================================= */}
      {/* PAGE 6: WHAT INFORMATION MUST I PROTECT? & BASIC RULES */}
      {/* ========================================================================= */}
      <section id="sec-what-protect" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Data Classification & Handling" category="Standards" />
        <div className="space-y-5 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">What Information Must I Protect?</h2>
            {/* The simple test quote */}
            <div className="my-3 p-3.5 bg-slate-900 text-white rounded-xl border-l-4 border-amber-400">
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                The Simple Litmus Test
              </div>
              <p className="text-xs sm:text-sm font-semibold mt-0.5 italic">
                "If the information is about a person, customer, employee, supplier, or the organisation and is not meant for everyone — protect it."
              </p>
            </div>
          </div>

          {/* DO and DON'T side-by-side grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DO card */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center gap-2 font-black text-xs text-emerald-900 uppercase tracking-wider mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mandatory Actions (DO)</span>
              </div>
              <ul className="space-y-2 text-xs text-emerald-950 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Treat all customer and employee information with extreme care.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Use confidential information solely for your assigned work functions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Keep documents and screens shielded from anyone who lacks access rights.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Consult your manager, DPO, or Compliance team whenever uncertain.</span>
                </li>
              </ul>
            </div>

            {/* DON'T card */}
            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
              <div className="flex items-center gap-2 font-black text-xs text-rose-900 uppercase tracking-wider mb-2.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Strictly Prohibited (DON'T)</span>
              </div>
              <ul className="space-y-2 text-xs text-rose-950 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Look at customer or colleague records out of personal curiosity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Send company files or customer records to friends, family, or personal mail.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Post confidential work information or internal screenshots online.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Discuss private customer or company business in public areas or transit.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 6 Data Protection Questions */}
          <div className="pt-2">
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              The 6 Basic Data Protection Questions
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              You do not need to memorise legal codes. Ask these 6 questions before handling data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { q: '1. Why do I need this information?', a: 'Must have a valid, authorized work purpose. Curiosity is forbidden.' },
                { q: '2. Do I need all of it?', a: 'Collect only the bare minimum required. Never gather data "just in case."' },
                { q: '3. Am I using it for the right purpose?', a: 'Data gathered for one task cannot be reused for another without approval.' },
                { q: '4. Is this correct & accurate?', a: 'Take reasonable steps to maintain accuracy. Never ignore reported errors.' },
                { q: '5. Does the person know what we are doing?', a: 'Ensure transparency. Never make unauthorized privacy commitments.' },
                { q: '6. Is it safe & encrypted?', a: 'Protect records from loss, theft, accidental leakage, and rogue access.' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900">{item.q}</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <PageFooter pageNum={6} />
      </section>

      {/* ========================================================================= */}
      {/* PAGE 7: STOP BEFORE YOU SHARE */}
      {/* ========================================================================= */}
      <section id="sec-stop-share" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Communications & Sharing" category="Protocol" />
        <div className="space-y-5 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Stop Before You Share</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Sharing information is one of the easiest ways for a costly security mistake to occur. Access must be strictly limited to individuals whose job functions require it.
            </p>
          </div>

          {/* S-T-O-P Step Workflow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60">
              <div className="font-black text-lg text-blue-900 font-mono">S</div>
              <div className="font-bold text-slate-900 text-xs mt-1">STOP</div>
              <p className="text-[11px] text-slate-600 mt-1">
                Do not press Send immediately. Pause and resist rushing under artificial pressure.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60">
              <div className="font-black text-lg text-blue-900 font-mono">T</div>
              <div className="font-bold text-slate-900 text-xs mt-1">THINK</div>
              <p className="text-[11px] text-slate-600 mt-1">
                Why am I sharing this? Does this recipient need it? Am I authorized to distribute it?
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60">
              <div className="font-black text-lg text-blue-900 font-mono">O</div>
              <div className="font-bold text-slate-900 text-xs mt-1">OPEN & CHECK</div>
              <p className="text-[11px] text-slate-600 mt-1">
                Inspect recipient address, CC/BCC, attached files, shared links, and internal document tabs.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60">
              <div className="font-black text-lg text-blue-900 font-mono">P</div>
              <div className="font-bold text-slate-900 text-xs mt-1">PROTECT</div>
              <p className="text-[11px] text-slate-600 mt-1">
                Use approved systems. Apply password encryption or access revocation where required.
              </p>
            </div>
          </div>

          {/* Approved vs Prohibited Systems Table */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Tool & Infrastructure Authorisation Matrix
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Approved Sharing Tools</span>
                </div>
                <div className="text-emerald-950 font-mono text-[11px]">
                  {config.tools.approvedSharingTools}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                <div className="font-bold text-rose-900 mb-1 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Restricted / Prohibited Tools</span>
                </div>
                <div className="text-rose-950 font-mono text-[11px]">
                  {config.tools.restrictedTools}
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Scenario Comparison */}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-800">
              Practical Scenario: Autocomplete Mistake
            </div>
            <p className="text-slate-600 text-[11px]">
              You need to email a sensitive customer report to your manager. Your mail client autocompletes two people with similar names.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
              <div className="bg-rose-100 text-rose-900 p-2 rounded border border-rose-200">
                <strong>WRONG:</strong> Click the first suggested contact and hit Send immediately without verifying.
              </div>
              <div className="bg-emerald-100 text-emerald-900 p-2 rounded border border-emerald-200">
                <strong>RIGHT:</strong> Expand the email address. Confirm full address, attachment contents, then send.
              </div>
            </div>
          </div>

          <div className="text-center font-editorial italic text-slate-700 text-sm font-medium border-t border-slate-200 pt-3">
            "Would I still send this document if the personal information belonged to me?"
          </div>
        </div>
        <PageFooter pageNum={7} />
      </section>

      {/* ========================================================================= */}
      {/* PAGE 8: CONFIDENTIALITY AT WORK & PHYSICAL SECURITY */}
      {/* ========================================================================= */}
      <section id="sec-work-confidentiality" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Workplace Confidentiality" category="Physical & Visual Security" />
        <div className="space-y-5 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Confidentiality at Work</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Confidential information should only be seen or heard by people who strictly need it for their work. Internal sharing is limited to staff whose job functions require access.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
              <div className="font-bold text-emerald-900 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Office Security DOs</span>
              </div>
              <ul className="space-y-1.5 text-emerald-950 font-medium">
                <li>• Check who is in the room before discussing confidential matters.</li>
                <li>• Lock your computer screen every time you step away from your desk.</li>
                <li>• Collect printouts from shared office printers immediately.</li>
                <li>• Store physical files in locked cabinets and digital files in approved drives.</li>
                <li>• Conduct meetings behind closed doors when reviewing sensitive files.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs">
              <div className="font-bold text-rose-900 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Office Security DON'Ts</span>
              </div>
              <ul className="space-y-1.5 text-rose-950 font-medium">
                <li>• Discuss customer records in staircase, cabs, cafes, or public lounges.</li>
                <li>• Leave printed payroll or client files unattended on communal printer trays.</li>
                <li>• Leave sensitive whiteboards un-erased or conference room papers behind.</li>
                <li>• Photograph company system screens with personal smartphone cameras.</li>
                <li>• Disclose files to third parties simply because they sound authoritative.</li>
              </ul>
            </div>
          </div>

          {/* Screenshot Warning Callout */}
          <div className="p-4 rounded-xl border-l-4 border-amber-500 bg-amber-50/60 text-xs space-y-2">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-amber-700" />
              <span>Be Extremely Careful With Screenshots</span>
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              Screenshots frequently leak more data than intended. When taking a screenshot for work, verify that it does not inadvertently capture:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-[10px] text-slate-800">
              <div className="bg-white p-1.5 rounded border border-amber-200">• Customer names</div>
              <div className="bg-white p-1.5 rounded border border-amber-200">• Browser URL/tabs</div>
              <div className="bg-white p-1.5 rounded border border-amber-200">• API tokens/passwords</div>
              <div className="bg-white p-1.5 rounded border border-amber-200">• Unrelated team chats</div>
            </div>
          </div>

          {/* Paper Shredding */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center gap-3">
            <FileWarning className="w-6 h-6 text-slate-600 shrink-0" />
            <div>
              <div className="font-bold text-slate-900">Do Not Forget Paper Records</div>
              <p className="text-slate-600 text-[11px] mt-0.5">
                A catastrophic data leak does not require a hacker. A paper document left in a trash bin can cause a regulatory breach. All paper records must be shredded using cross-cut shredders.
              </p>
            </div>
          </div>
        </div>
        <PageFooter pageNum={8} />
      </section>

      {/* ========================================================================= */}
      {/* PAGE 9: PASSWORDS, OTPS, DEVICES & ACCESS */}
      {/* ========================================================================= */}
      <section id="sec-passwords-access" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Access Security" category="Identity & Credential Hygiene" />
        <div className="space-y-5 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Passwords, OTPs, Devices & Access</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Your company account is your personal legal responsibility. Activities under your credentials are tied directly to you.
            </p>
          </div>

          {/* Red Alert: OTP Rule */}
          <div className="p-4 rounded-xl bg-rose-600 text-white shadow-md flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-widest text-rose-200">
                Absolute Zero-Tolerance Directive
              </div>
              <div className="text-base sm:text-lg font-black">
                NEVER SHARE AN OTP (ONE-TIME PASSWORD) WITH ANYONE.
              </div>
              <p className="text-xs text-rose-100">
                Staff must NEVER share OTPs — even if the requester claims to be IT Support, your manager, or a banking official. If someone asks for your OTP, STOP immediately.
              </p>
            </div>
          </div>

          {/* Password sharing prohibitions */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs">
            <div className="font-bold text-slate-900 mb-2">
              Who are you forbidden from sharing your password with?
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-700">
              <div className="flex items-center gap-1.5 p-2 bg-white rounded border border-slate-200">
                <span className="text-rose-500 font-bold font-mono">✕</span>
                <span>Your direct line manager</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white rounded border border-slate-200">
                <span className="text-rose-500 font-bold font-mono">✕</span>
                <span>Colleagues & teammates</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white rounded border border-slate-200">
                <span className="text-rose-500 font-bold font-mono">✕</span>
                <span>Friends & family members</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white rounded border border-slate-200">
                <span className="text-rose-500 font-bold font-mono">✕</span>
                <span>Anyone claiming to be IT Support</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white rounded border border-slate-200">
                <span className="text-rose-500 font-bold font-mono">✕</span>
                <span>Bank or merchant agents</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white rounded border border-slate-200">
                <span className="text-rose-500 font-bold font-mono">✕</span>
                <span>Any WhatsApp or SMS requester</span>
              </div>
            </div>
          </div>

          {/* Multi-Factor Authentication & Screen Lock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50">
              <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Mandatory Multi-Factor Authentication</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                MFA is mandatory on your work Google email, GitHub account, and corporate communication lines. MFA provides a critical protective barrier even if your password is stolen.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50">
              <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-blue-600" />
                <span>Lock Before You Leave (Win + L)</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Whenever you leave your desk — even for 30 seconds to grab a glass of water — press <strong>Win + L</strong> (Windows) or <strong>Cmd + Ctrl + Q</strong> (Mac) to lock your display.
              </p>
            </div>
          </div>

          {/* Phantom Push Notification Attack */}
          <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs space-y-1">
            <div className="font-bold text-amber-400">
              What If Your Phone Prompts an Unexpected MFA Login Approval?
            </div>
            <p className="text-slate-300 text-[11px]">
              If an authenticator notification appears on your phone when you are not actively logging in:
            </p>
            <div className="flex items-center gap-2 pt-1 font-mono text-xs">
              <span className="bg-rose-600 text-white px-2 py-0.5 rounded">DON'T: Approve to dismiss it</span>
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded">DO: Reject & alert IT immediately</span>
            </div>
          </div>
        </div>
        <PageFooter pageNum={9} />
      </section>

      {/* ========================================================================= */}
      {/* PAGE 10: PHISHING & IMPERSONATION */}
      {/* ========================================================================= */}
      <section id="sec-phishing" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Threat Awareness" category="Phishing & Social Engineering" />
        <div className="space-y-4 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Phishing & Impersonation</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Attackers rarely "hack" computers directly — they trick a human being. Phishing, CEO fraud, WhatsApp scams, and impersonation are our highest-volume risk factors.
            </p>
          </div>

          {/* Warning Signs Checklist */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
            <div className="font-bold text-amber-900 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Universal Phishing Red Flags</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] text-amber-950 font-medium">
              <div>• Creates extreme sudden urgency</div>
              <div>• Demands secrecy ("Don't tell anyone")</div>
              <div>• Solicits a password, OTP, or PIN</div>
              <div>• Unsolicited links or downloads</div>
              <div>• Odd spelling in domain name</div>
              <div>• Urgent requests for funds/gift cards</div>
            </div>
          </div>

          {/* 3 Real-World Attack Scenarios */}
          <div className="space-y-2.5">
            {/* Scenario 1: CEO Fraud */}
            <div className="p-3 rounded-xl border border-slate-200 bg-white shadow-2xs text-xs space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-900">Example 1: "The CEO" Urgent WhatsApp Request</span>
                <span className="bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-mono text-[10px]">High Threat</span>
              </div>
              <div className="bg-slate-50 p-2 rounded border-l-2 border-slate-400 font-mono text-[11px] text-slate-700 italic">
                "Hi. I'm in an important board meeting right now. I need you to send me the customer database details immediately. Don't call me, just message back."
              </div>
              <p className="text-slate-600 text-[11px]">
                <strong className="text-rose-700">PROTOCOL:</strong> Never assume authenticity based on a display name or avatar. Verify unusual requests via an established secondary telephone call.
              </p>
            </div>

            {/* Scenario 2: IT Support */}
            <div className="p-3 rounded-xl border border-slate-200 bg-white shadow-2xs text-xs space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-900">Example 2: "IT Support" Fake Account Termination Trap</span>
                <span className="bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-mono text-[10px]">Credential Harvesting</span>
              </div>
              <div className="bg-slate-50 p-2 rounded border-l-2 border-slate-400 font-mono text-[11px] text-slate-700 italic">
                "Your account will be permanently deactivated in 10 minutes. Tell me your OTP right now so I can renew your security certificate."
              </div>
              <p className="text-slate-600 text-[11px]">
                <strong className="text-rose-700">PROTOCOL:</strong> DO NOT SEND THE OTP. Real IT teams never ask for an OTP. Report to official contacts immediately.
              </p>
            </div>

            {/* Scenario 3: Strange Link */}
            <div className="p-3 rounded-xl border border-slate-200 bg-white shadow-2xs text-xs space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-900">Example 3: The Fake "Payroll Correction" Link</span>
                <span className="bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-mono text-[10px]">Malware / Phishing</span>
              </div>
              <div className="bg-slate-50 p-2 rounded border-l-2 border-slate-400 font-mono text-[11px] text-slate-700 italic">
                "Payroll correction required for monthly bonus. Sign in with your Google account now to claim."
              </div>
              <p className="text-slate-600 text-[11px]">
                <strong className="text-rose-700">PROTOCOL:</strong> Inspect the sender domain carefully. Never input work passwords on non-Google authentication endpoints.
              </p>
            </div>
          </div>
        </div>
        <PageFooter pageNum={10} />
      </section>

      {/* ========================================================================= */}
      {/* PAGE 11: PAYMENT & VENDOR SCAMS */}
      {/* ========================================================================= */}
      <section id="sec-payment-scams" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Financial Integrity" category="Business Email Compromise (BEC)" />
        <div className="space-y-5 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Payment & Vendor Scams</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Requests involving bank accounts and funds deserve extraordinary diligence. Vendor bank-detail alterations and spoofed executive payment directives are standard Business Email Compromise (BEC) tactics.
            </p>
          </div>

          {/* Golden Rule for Invoicing */}
          <div className="p-4 rounded-xl bg-blue-900 text-white shadow-sm space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-300">
              Universal Financial Control Rule
            </div>
            <div className="text-base sm:text-lg font-bold">
              Never change payment or banking details from an email alone.
            </div>
            <p className="text-xs text-blue-100 leading-relaxed">
              Even if the vendor email address matches perfectly, the signature block is identical, and the tone seems friendly: compromise of vendor mailboxes is common. You must perform an out-of-band telephone verification using the pre-registered company number.
            </p>
          </div>

          {/* What to Watch For Grid */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs">
            <div className="font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
              High-Risk Payment Red Flags
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              <div className="p-2 bg-white rounded border border-slate-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Sudden notification of revised banking accounts</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Requests to bypass normal procurement approvals</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Senior executives instructing secret transactions</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Requests to purchase retail vouchers or gift cards</span>
              </div>
            </div>
          </div>

          {/* Pressure Response Script */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
            <div className="font-bold text-emerald-950">
              How to Respond When You Are Pressured:
            </div>
            <p className="text-emerald-900 text-[11px]">
              If a senior manager, supplier, or executive pressures you to skip verification:
            </p>
            <div className="p-3 bg-white rounded-lg border border-emerald-300 font-editorial text-sm italic text-slate-900 font-semibold">
              "I need to follow our mandatory verification process before making this change or releasing these funds."
            </div>
            <p className="text-[11px] text-emerald-800 font-medium">
              Security verification rules still apply regardless of how senior the requester claims to be.
            </p>
          </div>
        </div>
        <PageFooter pageNum={11} />
      </section>

      {/* ========================================================================= */}
      {/* PAGE 12: PERSONAL EMAIL, WHATSAPP & REMOTE WORK */}
      {/* ========================================================================= */}
      <section id="sec-remote-work" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Remote Operations" category="BYOD & Cloud Protocols" />
        <div className="space-y-5 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Personal Email, WhatsApp, Devices & Remote Work
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Work information must strictly remain inside approved corporate systems.
            </p>
          </div>

          {/* Storage & Messaging policy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Personal Email & Cloud Storage Ban</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Professional and customer data must never be forwarded to personal Gmail, Yahoo, or Outlook accounts. Do not upload files to personal Dropbox, iCloud, or private Drive folders.
              </p>
              <div className="bg-white p-2 rounded border border-slate-200 font-mono text-[11px] text-slate-800">
                Approved Work Storage: <strong className="text-blue-900">{config.tools.approvedStorage}</strong>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-emerald-600" />
                <span>Collaboration & Messaging (WhatsApp & GitHub)</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                We make official use of GitHub, WhatsApp, and Google Email. Information should be stored in access-restricted documents on GitHub/Google Drive, sharing only permissioned links on WhatsApp. Never upload raw unencrypted customer files directly into open chat groups.
              </p>
            </div>
          </div>

          {/* Working outside the office DOs and DON'Ts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="font-bold text-emerald-900 mb-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Remote Work DOs</span>
              </div>
              <ul className="space-y-1 text-emerald-950 text-[11px]">
                <li>• Position your screen so it cannot be viewed by onlookers.</li>
                <li>• Use approved VPN and secure corporate connections.</li>
                <li>• Lock your computer whenever you walk away at home or cafes.</li>
                <li>• Store work hardware in safe, discreet locations when travelling.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
              <div className="font-bold text-rose-900 mb-1.5 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Remote Work DON'Ts</span>
              </div>
              <ul className="space-y-1 text-rose-950 text-[11px]">
                <li>• Leave laptops unattended in vehicles, coffee shops, or airports.</li>
                <li>• Permit family members or friends to use company laptops.</li>
                <li>• Connect to unencrypted public Wi-Fi without VPN encryption.</li>
                <li>• Leave printed business memos lying around shared home spaces.</li>
              </ul>
            </div>
          </div>
        </div>
        <PageFooter pageNum={12} />
      </section>

      {/* ========================================================================= */}
      {/* PAGE 13: WHAT TO DO IF YOU CLICKED */}
      {/* ========================================================================= */}
      <section id="sec-clicked-incident" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Incident Handling" category="Emergency Containment" />
        <div className="space-y-4 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">What to Do if You Clicked</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Mistakes happen to everyone. What determines our company's survival is how swiftly you report the issue.
            </p>
          </div>

          {/* Specific Triggers & Immediate Containment */}
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0 font-mono text-[10px]">1</span>
              <div>
                <div className="font-bold text-slate-900">If you clicked a suspicious link:</div>
                <div className="text-slate-600 text-[11px]">
                  STOP immediately. Discontinue using the suspicious page. Report immediately to IT Security ({config.contacts.itSecurityContacts}). State what was clicked and whether any file was downloaded.
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0 font-mono text-[10px]">2</span>
              <div>
                <div className="font-bold text-slate-900">If you entered your password:</div>
                <div className="text-slate-600 text-[11px]">
                  Alert IT/Security immediately to reset credentials across all systems. Do not wait to see if an unauthorized login occurs.
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0 font-mono text-[10px]">3</span>
              <div>
                <div className="font-bold text-slate-900">If you opened a suspicious attachment:</div>
                <div className="text-slate-600 text-[11px]">
                  Disconnect your device from Wi-Fi/Ethernet immediately to isolate potential malware, and notify IT Security.
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0 font-mono text-[10px]">4</span>
              <div>
                <div className="font-bold text-slate-900">If you sent information to the wrong person:</div>
                <div className="text-slate-600 text-[11px]">
                  Report to DPO ({config.contacts.dpoEmail}). Provide details: what was sent, to whom, exact timestamp, and whether recipient was requested to delete. Do not conceal the mistake.
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0 font-mono text-[10px]">5</span>
              <div>
                <div className="font-bold text-slate-900">If you lost a work laptop, phone, or storage media:</div>
                <div className="text-slate-600 text-[11px]">
                  Notify the DPO and IT immediately for remote wipe. Do not wait until the next working day.
                </div>
              </div>
            </div>
          </div>

          {/* No-Judge Rule Banner */}
          <div className="p-4 rounded-xl bg-emerald-600 text-white shadow-sm space-y-1.5">
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-200">
              Protective Staff Safety Culture
            </div>
            <div className="text-base font-black">
              OUR NO-JUDGE RULE: REPORT FIRST.
            </div>
            <p className="text-xs text-emerald-50 leading-relaxed">
              You are never expected to determine whether an occurrence technically constitutes a "data breach" or "cyberattack" under the NDPA. That is the specialist responsibility of the DPO. Employees who promptly report accidents are protected and supported.
            </p>
          </div>
        </div>
        <PageFooter pageNum={13} />
      </section>

      {/* ========================================================================= */}
      {/* PAGE 14: REQUESTS ABOUT PERSONAL INFORMATION & AUTHORITIES */}
      {/* ========================================================================= */}
      <section id="sec-data-requests" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Legal Rights & Inquiries" category="Subject Rights & Public Authorities" />
        <div className="space-y-5 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Requests About Personal Information</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Customers, staff, or vendors have statutory rights under the Nigeria Data Protection Act 2023.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
            <div className="font-bold text-slate-900">Typical Data Subject Requests (DSR) You May Encounter:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 italic">
              <div className="p-2 bg-white rounded border border-slate-200">"What information do you hold about me?"</div>
              <div className="p-2 bg-white rounded border border-slate-200">"Please correct my registered information."</div>
              <div className="p-2 bg-white rounded border border-slate-200">"Please delete all my personal data from your systems."</div>
              <div className="p-2 bg-white rounded border border-slate-200">"Stop sending me marketing messages and unsubscribe me."</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>What YOU Should DO:</span>
              </div>
              <p className="text-emerald-950 text-[11px] leading-relaxed">
                Acknowledge the inquiry politely and professionally. Inform them that their request has been forwarded to the Data Protection Officer for legal fulfillment. Immediately route the message to <strong className="font-mono">{config.contacts.dpoEmail}</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
              <div className="font-bold text-rose-900 mb-1 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>What YOU Must NEVER DO:</span>
              </div>
              <ul className="text-rose-950 text-[11px] space-y-1">
                <li>• Never delete databases or user accounts on your own initiative.</li>
                <li>• Never make promises that records will be purged without review.</li>
                <li>• Never disclose records without verifying legal identity.</li>
                <li>• Never ignore or discard a customer's privacy message.</li>
              </ul>
            </div>
          </div>

          {/* Police & Regulatory Requests */}
          <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Inquiries From Police, Government, or Regulatory Authorities</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              If an external police officer, law enforcement agent, tax inspector, or court official requests customer or corporate data:
            </p>
            <div className="p-2.5 bg-slate-800 rounded border border-slate-700 font-mono text-xs text-amber-200">
              DO NOT make the disclosure decision yourself. Immediately route the request to Legal & Compliance{config.contacts.legalComplianceEmail ? ` (${config.contacts.legalComplianceEmail})` : ''} and the DPO.
            </div>
          </div>
        </div>
        <PageFooter pageNum={14} />
      </section>

      {/* ========================================================================= */}
      {/* PAGE 15: ROLES & RESPONSIBILITIES */}
      {/* ========================================================================= */}
      <section id="sec-responsibilities" className={sheetClass}>
        <WatermarkOverlay />
        <PageHeader title="Governance & Accountability" category="Organizational Matrix" />
        <div className="space-y-4 flex-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your Responsibilities</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Information security is everyone's responsibility, but distinct teams hold specific accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* All employees */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span>All Employees & Contractors</span>
              </div>
              <ul className="text-slate-600 text-[11px] space-y-1">
                <li>• Follow this handbook faithfully in daily work.</li>
                <li>• Guard passwords and never share OTPs.</li>
                <li>• Lock screens when unattended.</li>
                <li>• Check all recipient details before transmitting data.</li>
                <li>• Report all mistakes and suspicious activity promptly.</li>
              </ul>
            </div>

            {/* People Managers */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span>People Managers</span>
              </div>
              <ul className="text-slate-600 text-[11px] space-y-1">
                <li>• Support direct reports in complying with security rules.</li>
                <li>• Ensure system access levels mirror job duties strictly.</li>
                <li>• Cultivate a zero-blame, rapid-incident reporting culture.</li>
                <li>• Never encourage staff to bypass established safeguards.</li>
              </ul>
            </div>

            {/* DPO Team */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-purple-600" />
                <span>Data Protection Officer (DPO)</span>
              </div>
              <ul className="text-slate-600 text-[11px] space-y-1">
                <li>• Supervise statutory compliance with the NDPA 2023.</li>
                <li>• Advise executive leadership on privacy risks and DPIAs.</li>
                <li>• Serve as official liaison with data protection regulators.</li>
                <li>• Manage subject access and deletion requests.</li>
              </ul>
            </div>

            {/* IT Security */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>IT & Infrastructure Security</span>
              </div>
              <ul className="text-slate-600 text-[11px] space-y-1">
                <li>• Enforce access controls, MFA, and data encryption.</li>
                <li>• Monitor network logs for intrusion and phishing attempts.</li>
                <li>• Remotely wipe lost or compromised hardware.</li>
                <li>• Maintain disaster recovery and secure system backups.</li>
              </ul>
            </div>
          </div>

          {/* Disciplinary Notice */}
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-900">What Happens If You Break a Rule?</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              The organisation may take disciplinary measures where someone deliberately, recklessly, or carelessly violates information security rules in accordance with our HR disciplinary policy. However, genuine, honest mistakes reported immediately are protected under our safety culture.
            </p>
          </div>
        </div>
        <PageFooter pageNum={15} />
      </section>
    </div>
  );
};
