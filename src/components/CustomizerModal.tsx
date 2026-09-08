import React, { useState } from 'react';
import {
  X,
  RotateCcw,
  Check,
  Building,
  Mail,
  Phone,
  Shield,
  Palette,
  Type,
  FileCheck,
  Save,
} from 'lucide-react';
import { FontFamily, HandbookConfig, ThemeId } from '../types';
import { initialConfig } from '../data/handbookContent';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: HandbookConfig;
  onSave: (newConfig: HandbookConfig) => void;
  onReset: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<HandbookConfig>(config);
  const [activeTab, setActiveTab] = useState<'contacts' | 'tools' | 'branding'>('contacts');
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleTextChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contacts: {
        ...prev.contacts,
        [field]: value,
      },
    }));
  };

  const handleToolChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      tools: {
        ...prev.tools,
        [field]: value,
      },
    }));
  };

  const handleSaveAndApply = () => {
    onSave(formData);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 400);
  };

  const handleResetToDefaults = () => {
    setFormData(initialConfig);
    onReset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Handbook Customizer & Brand Controls</span>
              {savedToast && (
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" /> Saved
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500">
              Customize company contacts, system tools, typography, and color palette
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selector */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-4">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'contacts'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Escalation Contacts</span>
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`py-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'tools'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Approved Systems & Tools</span>
          </button>
          <button
            onClick={() => setActiveTab('branding')}
            className={`py-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'branding'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Design & Typography</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm flex-1">
          {activeTab === 'contacts' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Data Protection Officer (DPO) Name
                  </label>
                  <input
                    type="text"
                    value={formData.contacts.dpoName}
                    onChange={(e) => handleContactChange('dpoName', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    placeholder="e.g. Hafsah Anibaba"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    DPO Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.contacts.dpoEmail}
                    onChange={(e) => handleContactChange('dpoEmail', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="dpo@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    DPO Emergency Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.contacts.dpoPhone}
                    onChange={(e) => handleContactChange('dpoPhone', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="+234 903 513 1946"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Legal / Compliance Escalation Email
                  </label>
                  <input
                    type="email"
                    value={formData.contacts.legalComplianceEmail}
                    onChange={(e) => handleContactChange('legalComplianceEmail', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="compliance@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  IT / Security Team Contact(s)
                </label>
                <input
                  type="text"
                  value={formData.contacts.itSecurityContacts}
                  onChange={(e) => handleContactChange('itSecurityContacts', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  placeholder="mukhtar@deernigeria.ng, adebayo@deernigeria.ng"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    HR / Management Email
                  </label>
                  <input
                    type="email"
                    value={formData.contacts.hrEmail}
                    onChange={(e) => handleContactChange('hrEmail', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="hr@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Finance Escalation Email
                  </label>
                  <input
                    type="email"
                    value={formData.contacts.financeEmail}
                    onChange={(e) => handleContactChange('financeEmail', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="finance@company.com"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Approved File Sharing Tools (Replaces [INSERT] on Page 10)
                </label>
                <textarea
                  rows={2}
                  value={formData.tools.approvedSharingTools}
                  onChange={(e) => handleToolChange('approvedSharingTools', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. DEER Nigeria Google Workspace, GitHub access-controlled repositories"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Restricted or Prohibited Sharing Tools (Replaces [INSERT] on Page 10)
                </label>
                <textarea
                  rows={2}
                  value={formData.tools.restrictedTools}
                  onChange={(e) => handleToolChange('restrictedTools', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Personal WhatsApp for files, personal Gmail, public WeTransfer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Approved Work Cloud Storage
                </label>
                <input
                  type="text"
                  value={formData.tools.approvedStorage}
                  onChange={(e) => handleToolChange('approvedStorage', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DEER Nigeria Google Workspace"
                />
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="space-y-4">
              {/* Logo Management */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-slate-800">
                      Organization Logo (DEER Nigeria)
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Upload your official logo PNG/SVG (supports drag-and-drop or click to browse)
                    </p>
                  </div>
                  {formData.customLogoUrl && (
                    <button
                      type="button"
                      onClick={() => handleTextChange('customLogoUrl', undefined)}
                      className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 transition-colors"
                    >
                      Reset to Vector Crest
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                  {/* Logo Preview */}
                  <div className="w-24 h-24 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 shadow-2xs">
                    {formData.customLogoUrl ? (
                      <img
                        src={formData.customLogoUrl}
                        alt="Logo preview"
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-center">
                        <span className="text-[10px] text-slate-400 font-medium">Default Crest</span>
                      </div>
                    )}
                  </div>

                  {/* Dropzone & Input */}
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const file = e.dataTransfer.files?.[0];
                      if (file && file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          handleTextChange('customLogoUrl', event.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="flex-1 w-full border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-3 text-center cursor-pointer bg-white transition-colors"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            handleTextChange('customLogoUrl', event.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div className="text-xs font-semibold text-slate-700">
                      Drag & drop your <span className="text-blue-600 font-bold">logo.png</span> here
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      or click to choose image from your computer (PNG, JPG, SVG)
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Document Theme & Color Palette
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'executive-navy', name: 'Executive Navy', color: '#1e3a8a', desc: 'Classic Corporate' },
                    { id: 'cyber-teal', name: 'Cyber Teal', color: '#0d9488', desc: 'Modern Infosec' },
                    { id: 'slate-monolith', name: 'Slate Monolith', color: '#334155', desc: 'Monochrome Swiss' },
                    { id: 'emerald-forest', name: 'Emerald Forest', color: '#047857', desc: 'Authoritative Green' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        handleTextChange('theme', t.id);
                        handleTextChange('accentColor', t.color);
                      }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                        formData.theme === t.id
                          ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: t.color }}
                      />
                      <div>
                        <div className="font-semibold text-xs text-slate-900">{t.name}</div>
                        <div className="text-[10px] text-slate-500">{t.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Typography Pairing
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'modern', name: 'Modern Sans', sample: 'Plus Jakarta Sans', fontClass: 'font-modern' },
                    { id: 'editorial', name: 'Editorial Serif', sample: 'Newsreader Executive', fontClass: 'font-editorial' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleTextChange('fontFamily', f.id as FontFamily)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.fontFamily === f.id
                          ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="font-semibold text-xs text-slate-900">{f.name}</div>
                      <div className={`text-xs text-slate-600 mt-1 ${f.fontClass}`}>{f.sample}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showCover}
                    onChange={(e) => handleTextChange('showCover', e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-xs text-slate-700 font-medium">Include Formal Cover Page in Print & Preview</span>
                </label>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showWatermark}
                      onChange={(e) => handleTextChange('showWatermark', e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-xs text-slate-700 font-medium">
                      Show DEER Crest Watermark on Title Page
                    </span>
                  </label>

                  {formData.showWatermark && (
                    <div className="ml-6 p-2.5 rounded-lg bg-slate-100/70 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-600 font-medium">Watermark Visibility / Opacity:</span>
                        <span className="font-mono font-bold text-slate-800">
                          {formData.watermarkOpacity ?? 7}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="25"
                        step="1"
                        value={formData.watermarkOpacity ?? 7}
                        onChange={(e) =>
                          handleTextChange('watermarkOpacity', parseInt(e.target.value, 10))
                        }
                        className="w-full accent-blue-600 cursor-pointer"
                      />
                      <div className="flex items-center gap-2 pt-1">
                        {[
                          { label: 'Subtle (4%)', val: 4 },
                          { label: 'Standard (7%)', val: 7 },
                          { label: 'Clear (12%)', val: 12 },
                          { label: 'Prominent (18%)', val: 18 },
                        ].map((preset) => (
                          <button
                            key={preset.val}
                            type="button"
                            onClick={() => handleTextChange('watermarkOpacity', preset.val)}
                            className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors ${
                              (formData.watermarkOpacity ?? 7) === preset.val
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handleResetToDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAndApply}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply & Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
