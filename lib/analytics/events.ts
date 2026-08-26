import { getStoredAttribution, type AttributionData } from "./attribution";

type AnalyticsParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const googleAdsConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

const hasWindow = () => typeof window !== "undefined";

const getConversionSendTo = () => {
  if (!googleAdsId || !googleAdsConversionLabel) {
    return null;
  }

  return `${googleAdsId}/${googleAdsConversionLabel}`;
};

export const trackEvent = (name: string, params: AnalyticsParams = {}) => {
  if (!hasWindow()) {
    return;
  }

  window.gtag?.("event", name, params);
};

export const trackGoogleAdsConversion = (params: AnalyticsParams = {}) => {
  if (!hasWindow()) {
    return;
  }

  const sendTo = getConversionSendTo();
  if (!sendTo) {
    return;
  }

  window.gtag?.("event", "conversion", {
    send_to: sendTo,
    ...params,
  });
};

export const trackTrialCtaClick = (params: AnalyticsParams = {}) => {
  const attribution = getStoredAttribution();

  trackEvent("trial_cta_click", {
    source: attribution.utm_source,
    campaign: attribution.utm_campaign,
    ...params,
  });

  if (hasWindow()) {
    window.fbq?.("trackCustom", "TrialCtaClick", {
      source: attribution.utm_source,
      campaign: attribution.utm_campaign,
      ...params,
    });
  }
};

export const trackLead = (params: AnalyticsParams = {}) => {
  const attribution = getStoredAttribution();
  const eventParams = {
    source: attribution.utm_source,
    campaign: attribution.utm_campaign,
    ...params,
  };

  trackEvent("generate_lead", eventParams);
  trackGoogleAdsConversion(eventParams);

  if (hasWindow()) {
    window.fbq?.("track", "Lead", eventParams);
  }
};

export const trackFormSubmit = (
  params: AnalyticsParams & { attribution?: AttributionData } = {},
) => {
  const attribution = params.attribution ?? getStoredAttribution();

  trackEvent("complete_registration", {
    ...params,
    attribution,
    source: attribution.utm_source,
    campaign: attribution.utm_campaign,
  });
};
