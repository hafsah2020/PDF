import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  AlertTriangle,
  Lock,
  PhoneCall,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { DeerLogo } from './DeerLogo';
import { goldenRules } from '../data/handbookContent';
import { HandbookConfig } from '../types';

interface PresentationViewProps {
  config: HandbookConfig;
  onExit: () => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({
  config,
  onExit,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      title: config.documentTitle,
      subtitle: `${config.companyName} • Staff Training & Compliance`,
      badge: 'Welcome',
      content: (
        <div className="text-center space-y-6 max-w-xl mx-auto py-6">
          <DeerLogo
            size={110}
            showText
            accentColor={config.accentColor}
            customLogoUrl={config.customLogoUrl}
          />
          <p className="text-slate-600 text-base leading-relaxed">
            Welcome to the DEER Nigeria Data Privacy & Protection Handbook walkthrough.
            Protecting sensitive information is mandatory for all employees, contractors, and temporary staff.
          </p>
          <div className="p-3 bg-blue-50 text-blue-900 rounded-xl border border-blue-200 text-xs font-semibold">
            Governed by the {config.governingLaw}
          </div>
        </div>
      ),
    },
    {
      title: 'Your 10 Golden Rules (Quick Review)',
      subtitle: 'Core daily operational discipline',
      badge: 'Principles',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
          {goldenRules.slice(0, 6).map((rule) => (
            <div key={rule.number} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-blue-900 text-white font-mono text-[10px] flex items-center justify-center">
                  {rule.number}
                </span>
                <span>{rule.title}</span>
              </div>
            </div>
          ))}
          <div className="sm:col-span-2 p-2.5 bg-blue-900 text-white rounded-xl text-center text-xs font-bold">
            #10: When in doubt, always reach out to the DPO!
          </div>
        </div>
      ),
    },
    {
      title: 'Passwords & OTPs: Zero Sharing',
      subtitle: 'The number one corporate defense',
      badge: 'Access Security',
      content: (
        <div className="space-y-4 max-w-xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-rose-600 text-white text-center space-y-1">
            <div className="text-xs uppercase font-bold tracking-widest text-rose-200">Zero Tolerance</div>
            <div className="text-lg font-black">NEVER SHARE YOUR OTP WITH ANYONE.</div>
            <p className="text-xs text-rose-100">
              Not with your manager, not with colleagues, and not with anyone claiming to be IT Support.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">MFA is Mandatory</div>
              <div className="text-slate-600">Ensure MFA is enabled across Google, GitHub, and WhatsApp lines.</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">Lock Screen (Win + L)</div>
              <div className="text-slate-600">Lock your device whenever you step away, even for 30 seconds.</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Incident Reporting: Report First',
      subtitle: 'Mistakes happen — swift reporting protects everyone',
      badge: 'Action Protocol',
      content: (
        <div className="space-y-4 max-w-xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-emerald-600 text-white space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-200">Our No-Judge Policy</div>
            <div className="text-base font-black">YOU REPORT. THE ORGANISATION INVESTIGATES.</div>
            <p className="text-xs text-emerald-100">
              Never conceal an accidental link click, lost phone, or autocomplete email error.
              Rapid notification allows IT to lock accounts before damage spreads.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
            <div className="font-bold text-slate-900 mb-1">DPO Emergency Escalation:</div>
            <div className="font-mono text-blue-900 font-semibold">{config.contacts.dpoName} — {config.contacts.dpoPhone}</div>
            <div className="font-mono text-slate-600 text-[11px] mt-0.5">{config.contacts.dpoEmail}</div>
          </div>
        </div>
      ),
    },
  ];

  const current = slides[slideIndex];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 max-w-4xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <DeerLogo
            size={32}
            showText={false}
            monochrome
            accentColor="#60a5fa"
            customLogoUrl={config.customLogoUrl}
          />
          <div>
            <div className="font-bold text-sm text-white tracking-wide uppercase">
              {config.companyName} Security Training
            </div>
            <div className="text-xs text-slate-400">
              Slide {slideIndex + 1} of {slides.length}
            </div>
          </div>
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
        >
          Exit Presentation
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="max-w-3xl w-full mx-auto my-auto bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-200 text-center">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-900 mb-3">
          {current.badge}
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {current.title}
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">{current.subtitle}</p>

        {current.content}
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between max-w-4xl w-full mx-auto border-t border-slate-800 pt-4 text-xs text-slate-400">
        <div>Use arrow buttons or keyboard to navigate</div>

        <div className="flex items-center gap-3">
          <button
            disabled={slideIndex === 0}
            onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-white font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            disabled={slideIndex === slides.length - 1}
            onClick={() => setSlideIndex((i) => Math.min(slides.length - 1, i + 1))}
            className="flex items-center gap-1 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:pointer-events-none text-white font-semibold transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
