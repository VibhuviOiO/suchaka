import { useState, useEffect } from 'react';

export interface AppConfig {
  navbarTitle: string;
  pageTitle: string;
  pageSubtitle: string;
  logoUrl: string;
  logoDisplayMode: string;
  footerText: string;
  faviconUrl: string;
  metaDescription: string;
  metaKeywords: string;
  metaAuthor: string;
  navbarLinkText: string;
  navbarLinkUrl: string;
  companyName: string;
  companyWebsite: string;
  supportEmail: string;
  supportPhone: string;
  navbarBgColor: string;
  navbarTextColor: string;
  footerBgColor: string;
  footerTextColor: string;
  pageBgColor: string;
  statusDetailLevel: string;
  showLatencyIndicators: boolean;
}

export function useConfig() {
  const [data, setData] = useState<AppConfig>({
    navbarTitle: 'Uptime Status',
    pageTitle: 'Service Status',
    pageSubtitle: 'Real-time monitoring dashboard',
    logoUrl: '',
    logoDisplayMode: 'both',
    footerText: 'Powered by UptimeO',
    faviconUrl: '/favicon.ico',
    metaDescription: 'Real-time service status monitoring',
    metaKeywords: 'uptime, status, monitoring',
    metaAuthor: '',
    navbarLinkText: '',
    navbarLinkUrl: '',
    companyName: '',
    companyWebsite: '',
    supportEmail: '',
    supportPhone: '',
    navbarBgColor: '#ffffff',
    navbarTextColor: '#202124',
    footerBgColor: '#ffffff',
    footerTextColor: '#5f6368',
    pageBgColor: '#f5f5f5',
    statusDetailLevel: 'detailed',
    showLatencyIndicators: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch(`/api/public/branding?t=${Date.now()}`);
        if (response.ok) {
          const configData = await response.json();
          setData(configData);
        }
      } catch (err) {
        console.error('Failed to fetch branding config:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { data, loading, error };
}
