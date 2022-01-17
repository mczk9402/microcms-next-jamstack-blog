import Script from 'next/script';

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

export const existsGaId = GA_ID !== '';

export const pageview = (path) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  });
};

export const event = ({ action, category, label, value = '' }) => {
  if (!existsGaId) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};

export const GoogleAnalytics = () => (
  <>
    {existsGaId && (
      <>
        <Script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga" defer strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
        `}
        </Script>
      </>
    )}
  </>
);
