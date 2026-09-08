import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { HandbookConfig } from '../types';

export interface PdfProgressCallback {
  (current: number, total: number, message: string): void;
}

export interface GeneratedPdfResult {
  blob: Blob;
  blobUrl: string;
  dataUri: string;
  fileName: string;
  download: () => void;
  pageCount: number;
}

// Ordered list of all 15 canonical handbook section IDs in HandbookPages
export const HANDBOOK_SECTION_IDS = [
  'sec-cover',
  'sec-toc',
  'sec-contacts',
  'sec-golden-rules',
  'sec-why-matters',
  'sec-what-protect',
  'sec-stop-share',
  'sec-work-confidentiality',
  'sec-passwords-access',
  'sec-phishing',
  'sec-payment-scams',
  'sec-remote-work',
  'sec-clicked-incident',
  'sec-data-requests',
  'sec-responsibilities',
];

const SECTION_FRIENDLY_NAMES: Record<string, string> = {
  'sec-cover': 'Cover Page (Official Heraldic Crest & Metadata)',
  'sec-toc': 'Table of Contents & Quick Reference',
  'sec-contacts': 'Key Contacts & Escalation Directory',
  'sec-golden-rules': 'The 10 Golden Rules of Security',
  'sec-why-matters': 'Why This Matters & NDPA Foundation',
  'sec-what-protect': 'What Information Must I Protect (DO & DONT)',
  'sec-stop-share': 'Stop Before You Share (S-T-O-P Framework)',
  'sec-work-confidentiality': 'Confidentiality at Work & Paper Records',
  'sec-passwords-access': 'Passwords, MFA, Devices & Screen Locks',
  'sec-phishing': 'Phishing, Social Engineering & Fraud',
  'sec-payment-scams': 'Payment & Vendor Scams (BEC Verification)',
  'sec-remote-work': 'Remote Work, Wi-Fi & Official Systems',
  'sec-clicked-incident': 'What to Do if You Clicked (Incident Response)',
  'sec-data-requests': 'Requests About Personal Information & Legal Authorities',
  'sec-responsibilities': 'Staff Responsibilities & Compliance Undertaking',
};

/**
 * Robust DOM-to-Canvas renderer using html-to-image.
 * Natively supports modern CSS functions like oklch(), inline SVGs,
 * heraldic crest logos, custom uploaded logos, and watermark overlays.
 */
export async function captureElementToCanvas(
  el: HTMLElement,
  options?: { pixelRatio?: number; quality?: number }
): Promise<HTMLCanvasElement> {
  const pixelRatio = options?.pixelRatio ?? 1.6;

  return await toCanvas(el, {
    pixelRatio,
    backgroundColor: '#ffffff',
    skipFonts: true, // Prevents CORS errors on external web fonts; browser renders loaded fonts natively
    style: {
      boxShadow: 'none',
      borderRadius: '0',
      margin: '0',
      transform: 'none',
    },
    filter: (domNode: HTMLElement) => {
      if (domNode?.classList) {
        if (domNode.classList.contains('no-print')) return false;
        if (domNode.classList.contains('group-hover:opacity-100')) return false;
      }
      return true;
    },
  });
}

/**
 * Renders the FULL 16-page handbook directly from the DOM,
 * capturing the exact visual design, official DEER logo, watermark, badges, colors, and layout.
 */
export async function generateOriginalDesignHandbookPdf(
  config: HandbookConfig,
  onProgress?: PdfProgressCallback
): Promise<GeneratedPdfResult> {
  // Collect all existing section elements
  const elements: { id: string; el: HTMLElement; title: string }[] = [];
  for (const id of HANDBOOK_SECTION_IDS) {
    const el = document.getElementById(id);
    if (el) {
      elements.push({
        id,
        el,
        title: SECTION_FRIENDLY_NAMES[id] || el.querySelector('h1, h2')?.textContent || id,
      });
    }
  }

  if (elements.length === 0) {
    throw new Error('No handbook sections found in document. Please make sure the handbook view is loaded.');
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const a4WidthMm = 210;
  const a4HeightMm = 297;
  const total = elements.length;

  for (let i = 0; i < total; i++) {
    const { el, title } = elements[i];
    const pageNum = i + 1;

    if (onProgress) {
      onProgress(pageNum, total, `Rendering Page ${pageNum} of ${total}: ${title}`);
    }

    // Allow UI to tick so progress bar animates smoothly
    await new Promise((resolve) => setTimeout(resolve, 35));

    // Capture using html-to-image (safe with oklch, svg, logos, and watermarks)
    const canvas = await captureElementToCanvas(el, { pixelRatio: 1.5, quality: 0.94 });

    const imgData = canvas.toDataURL('image/jpeg', 0.94);
    const imgHeightMm = (canvas.height * a4WidthMm) / canvas.width;

    if (i > 0) {
      doc.addPage();
    }

    if (imgHeightMm <= a4HeightMm) {
      const yOffset = Math.max(0, (a4HeightMm - imgHeightMm) / 2);
      doc.addImage(imgData, 'JPEG', 0, yOffset, a4WidthMm, imgHeightMm, undefined, 'FAST');
    } else {
      const scale = a4HeightMm / imgHeightMm;
      const fittedWidthMm = a4WidthMm * scale;
      const xOffset = Math.max(0, (a4WidthMm - fittedWidthMm) / 2);
      doc.addImage(imgData, 'JPEG', xOffset, 0, fittedWidthMm, a4HeightMm, undefined, 'FAST');
    }
  }

  if (onProgress) {
    onProgress(total, total, 'Compiling and packaging original design PDF...');
  }

  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);
  const dataUri = doc.output('datauristring');
  const fileName = `${config.companyName.replace(/\s+/g, '_')}_Staff_Handbook_${config.year}.pdf`;

  const download = () => {
    try {
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
      }, 500);
    } catch {
      doc.save(fileName);
    }
  };

  return {
    blob,
    blobUrl,
    dataUri,
    fileName,
    download,
    pageCount: total,
  };
}

/**
 * Fast generation of Cover Page & Executive Summary (Pages 1-4: Cover, Table of Contents, Key Contacts, Golden Rules).
 */
export async function generateOriginalExecutiveSummaryPdf(
  config: HandbookConfig,
  onProgress?: PdfProgressCallback
): Promise<GeneratedPdfResult> {
  const summaryIds = ['sec-cover', 'sec-toc', 'sec-contacts', 'sec-golden-rules'];
  const elements: { id: string; el: HTMLElement; title: string }[] = [];

  for (const id of summaryIds) {
    const el = document.getElementById(id);
    if (el) {
      elements.push({
        id,
        el,
        title: SECTION_FRIENDLY_NAMES[id] || id,
      });
    }
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const a4WidthMm = 210;
  const a4HeightMm = 297;
  const total = elements.length;

  for (let i = 0; i < total; i++) {
    const { el, title } = elements[i];
    const pageNum = i + 1;

    if (onProgress) {
      onProgress(pageNum, total, `Rendering ${title}...`);
    }

    await new Promise((resolve) => setTimeout(resolve, 30));

    const canvas = await captureElementToCanvas(el, { pixelRatio: 1.5, quality: 0.94 });

    const imgData = canvas.toDataURL('image/jpeg', 0.94);
    const imgHeightMm = (canvas.height * a4WidthMm) / canvas.width;

    if (i > 0) {
      doc.addPage();
    }

    if (imgHeightMm <= a4HeightMm) {
      const yOffset = Math.max(0, (a4HeightMm - imgHeightMm) / 2);
      doc.addImage(imgData, 'JPEG', 0, yOffset, a4WidthMm, imgHeightMm, undefined, 'FAST');
    } else {
      const scale = a4HeightMm / imgHeightMm;
      const fittedWidthMm = a4WidthMm * scale;
      const xOffset = Math.max(0, (a4WidthMm - fittedWidthMm) / 2);
      doc.addImage(imgData, 'JPEG', xOffset, 0, fittedWidthMm, a4HeightMm, undefined, 'FAST');
    }
  }

  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);
  const dataUri = doc.output('datauristring');
  const fileName = `${config.companyName.replace(/\s+/g, '_')}_Executive_Summary_${config.year}.pdf`;

  const download = () => {
    try {
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
      }, 500);
    } catch {
      doc.save(fileName);
    }
  };

  return {
    blob,
    blobUrl,
    dataUri,
    fileName,
    download,
    pageCount: total,
  };
}

/**
 * Exports a section directly as a high-resolution PNG image with the logo, watermark, and styling intact.
 */
export async function exportSectionAsImage(
  sectionId: string,
  fileName: string
): Promise<void> {
  const el = document.getElementById(sectionId);
  if (!el) {
    throw new Error(`Section ${sectionId} not found.`);
  }

  const canvas = await captureElementToCanvas(el, { pixelRatio: 2.0 });
  const dataUrl = canvas.toDataURL('image/png');

  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (document.body.contains(a)) {
      document.body.removeChild(a);
    }
  }, 500);
}
