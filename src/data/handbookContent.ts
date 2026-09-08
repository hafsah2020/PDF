import { GoldenRule, TableOfContentsItem } from '../types';

export const initialConfig = {
  companyName: 'DEER NIGERIA',
  country: 'Nigeria',
  documentTitle: 'DATA PRIVACY & PROTECTION HANDBOOK',
  subtitle: 'Staff Data Protection & Confidentiality Handbook',
  targetAudience: 'For all employees, contractors and temporary staff',
  governingLaw: 'Nigeria Data Protection Act 2023 (NDPA)',
  year: '2026',
  version: 'Edition 2.4 — Updated',
  contacts: {
    dpoName: 'Hafsah Anibaba',
    dpoEmail: 'hafsah@deernigeria.ng',
    dpoPhone: '+234 903 513 1946',
    itSecurityContacts: 'mukhtar@deernigeria.ng, adebayo@deernigeria.ng',
    legalComplianceEmail: '',
    hrEmail: 'lanre@deernigeria.com',
    financeEmail: 'finance@deernigeria.com',
  },
  tools: {
    approvedSharingTools: 'DEER Nigeria Google Workspace (Drive), GitHub (access-controlled repos), Official Corporate Email',
    restrictedTools: 'Personal Gmail/Yahoo, Public WeTransfer, Unapproved USB Drives, Personal Dropbox',
    approvedStorage: 'DEER Nigeria’s Google Workspace with Proper Access Control',
    collaborationTools: 'GitHub, WhatsApp (links to GitHub issues only), and Official Email',
  },
  accentColor: '#1e3a8a',
  fontFamily: 'modern' as const,
  theme: 'executive-navy' as const,
  showCover: true,
  showToc: true,
  showWatermark: true,
  watermarkOpacity: 7,
  twoColumnLayout: false,
  zoomLevel: 100,
};

export const tableOfContents: TableOfContentsItem[] = [
  { id: 'sec-contacts', title: 'Key Contacts & Escalations', pageNumber: 3, category: 'Governance' },
  { id: 'sec-golden-rules', title: 'Your 10 Golden Rules', pageNumber: 4, category: 'Core Principles' },
  { id: 'sec-why-matters', title: 'Why This Matters & What We Protect', pageNumber: 5, category: 'Fundamentals' },
  { id: 'sec-what-protect', title: 'What Information Must I Protect? (DO & DON\'T)', pageNumber: 6, category: 'Data Classification' },
  { id: 'sec-stop-share', title: 'Stop Before You Share (S-T-O-P Framework)', pageNumber: 7, category: 'Communications' },
  { id: 'sec-work-confidentiality', title: 'Confidentiality at Work & Physical Paper', pageNumber: 8, category: 'Workplace Security' },
  { id: 'sec-passwords-access', title: 'Passwords, OTPs, Devices & Access', pageNumber: 9, category: 'Identity & Access' },
  { id: 'sec-phishing', title: 'Phishing, Social Engineering & Impersonation', pageNumber: 10, category: 'Threat Awareness' },
  { id: 'sec-payment-scams', title: 'Payment & Vendor Scams (BEC Risks)', pageNumber: 11, category: 'Financial Protection' },
  { id: 'sec-remote-work', title: 'Personal Email, WhatsApp & Remote Work', pageNumber: 12, category: 'Remote & BYOD' },
  { id: 'sec-clicked-incident', title: 'What to Do if You Clicked (Incident Response)', pageNumber: 13, category: 'Incident Handling' },
  { id: 'sec-data-requests', title: 'Requests About Personal Information & Authorities', pageNumber: 14, category: 'Legal Escalations' },
  { id: 'sec-responsibilities', title: 'Roles & Responsibilities Across the Organisation', pageNumber: 15, category: 'Accountability' },
];

export const goldenRules: GoldenRule[] = [
  {
    number: 1,
    title: 'Only access information you need for your job.',
    description: 'Being able to open a file or system does not mean you should. Principle of least privilege applies to all staff at all times.',
  },
  {
    number: 2,
    title: 'Only collect information you actually need.',
    description: 'Do not collect extra information "just in case." Strict data minimisation protects both the user and DEER Nigeria.',
  },
  {
    number: 3,
    title: 'Use information only for an approved work purpose.',
    description: 'Do not use customer, employee, or company information for personal reasons, private research, or side ventures.',
  },
  {
    number: 4,
    title: 'STOP BEFORE YOU SHARE.',
    description: 'Check what you are sharing, why you are sharing it, and who will receive it. Verify recipient email addresses carefully.',
  },
  {
    number: 5,
    title: 'Keep passwords and security codes private.',
    description: 'Never share your password or One-Time Password (OTP) with anyone — including internal staff, line managers, or IT support.',
  },
  {
    number: 6,
    title: 'Lock your screen when you leave your device.',
    description: 'Even if you are only stepping away briefly for water, coffee, or a restroom break: Win + L or Cmd + Ctrl + Q.',
  },
  {
    number: 7,
    title: 'Be suspicious of unusual requests.',
    description: 'Urgency, secrecy, and unexpected requests for money, gift cards, passwords, or data are universal red flag warning signs.',
  },
  {
    number: 8,
    title: 'Keep work information inside approved work systems.',
    description: 'Do not move company information to personal email, personal cloud storage (Drive/iCloud), or unsecured chat apps.',
  },
  {
    number: 9,
    title: 'Report mistakes and suspicious activity immediately.',
    description: 'Do not try to decide whether something is "serious enough." Prompt notification enables rapid containment.',
  },
  {
    number: 10,
    title: 'When you are unsure, ASK the DPO.',
    description: 'Reach out to the Data Protection Officer or IT Security team. Asking early prevents costly security or regulatory incidents.',
  },
];

export const incidentChecklistItems = [
  { id: 'inc-1', label: 'You clicked a suspicious link.' },
  { id: 'inc-2', label: 'You entered your password on a suspicious website.' },
  { id: 'inc-3', label: 'You opened a suspicious attachment.' },
  { id: 'inc-4', label: 'You shared an OTP with someone.' },
  { id: 'inc-5', label: 'You approved a login notification on your phone you did not initiate.' },
  { id: 'inc-6', label: 'You sent personal or confidential information to the wrong person.' },
  { id: 'inc-7', label: 'You lost a work laptop, phone, USB, or storage device.' },
  { id: 'inc-8', label: 'You suspect somebody has accessed your account or credentials.' },
  { id: 'inc-9', label: 'You received a suspicious out-of-band request from a senior manager.' },
  { id: 'inc-10', label: 'Someone asked you to bypass normal verification or approval processes.' },
  { id: 'inc-11', label: 'A supplier unexpectedly requested a change of their banking details.' },
  { id: 'inc-12', label: 'You received an unusual or urgent payment request.' },
  { id: 'inc-13', label: 'You accidentally posted confidential files or photos online.' },
  { id: 'inc-14', label: 'You think sensitive company or customer data may have been lost, stolen, or exposed.' },
];
