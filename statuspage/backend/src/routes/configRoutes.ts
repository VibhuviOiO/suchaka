import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const showLatencyIndicators = process.env.SHOW_LATENCY_INDICATORS === 'true';
  const statusDetailLevel = process.env.STATUS_DETAIL_LEVEL || 'detailed';
  const elevatedThreshold = parseInt(process.env.ELEVATED_LATENCY_THRESHOLD || '500');
  const highThreshold = parseInt(process.env.HIGH_LATENCY_THRESHOLD || '1000');

  res.json({
    navbarTitle: process.env.NAVBAR_TITLE || 'Health Status',
    statusPageTitle: process.env.STATUS_PAGE_TITLE || 'Health Status',
    statusPageSubtitle: process.env.STATUS_PAGE_SUBTITLE || 'Real-time monitoring dashboard',
    pageTitle: process.env.STATUS_PAGE_TITLE || 'Health Status',
    pageSubtitle: process.env.STATUS_PAGE_SUBTITLE || 'Real-time monitoring dashboard',
    showLatencyIndicators,
    statusDetailLevel,
    elevatedLatencyThreshold: elevatedThreshold,
    highLatencyThreshold: highThreshold,
    logoUrl: process.env.LOGO_URL,
    logoDisplayMode: process.env.LOGO_DISPLAY_MODE || 'both',
    faviconUrl: process.env.FAVICON_URL,
    footerText: process.env.FOOTER_TEXT || 'Powered by Suchaka',
    navbarBgColor: process.env.NAVBAR_BG_COLOR || '#ffffff',
    navbarTextColor: process.env.NAVBAR_TEXT_COLOR || '#202124',
    footerBgColor: process.env.FOOTER_BG_COLOR || '#ffffff',
    footerTextColor: process.env.FOOTER_TEXT_COLOR || '#5f6368',
    pageBgColor: process.env.PAGE_BG_COLOR || '#f5f5f5',
    metaDescription: process.env.META_DESCRIPTION || 'Real-time service status monitoring',
    metaKeywords: process.env.META_KEYWORDS || 'uptime,status,monitoring',
    metaAuthor: process.env.META_AUTHOR,
    navbarLinkText: process.env.NAVBAR_LINK_TEXT,
    navbarLinkUrl: process.env.NAVBAR_LINK_URL,
    companyName: process.env.COMPANY_NAME || 'Our Company',
    companyWebsite: process.env.COMPANY_WEBSITE || 'https://example.com',
    supportEmail: process.env.SUPPORT_EMAIL || 'support@example.com',
  });
});

export default router;
