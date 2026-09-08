export type ThemeId = 'executive-navy' | 'cyber-teal' | 'slate-monolith' | 'emerald-forest';

export type FontFamily = 'modern' | 'editorial' | 'code';

export type ViewMode = 'pages' | 'continuous' | 'presentation';

export interface KeyContacts {
  dpoName: string;
  dpoEmail: string;
  dpoPhone: string;
  itSecurityContacts: string;
  legalComplianceEmail: string;
  hrEmail: string;
  financeEmail: string;
}

export interface SystemTools {
  approvedSharingTools: string;
  restrictedTools: string;
  approvedStorage: string;
  collaborationTools: string;
}

export interface HandbookConfig {
  companyName: string;
  country: string;
  documentTitle: string;
  subtitle: string;
  targetAudience: string;
  governingLaw: string;
  year: string;
  version: string;
  contacts: KeyContacts;
  tools: SystemTools;
  accentColor: string;
  fontFamily: FontFamily;
  theme: ThemeId;
  showCover: boolean;
  showToc: boolean;
  showWatermark: boolean;
  watermarkOpacity?: number; // 0 to 100 percentage
  twoColumnLayout: boolean;
  zoomLevel: number;
  customLogoUrl?: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  pageNumber: number;
  category?: string;
  iconName?: string;
}

export interface GoldenRule {
  number: number;
  title: string;
  description: string;
}
