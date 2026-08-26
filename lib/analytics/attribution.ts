export const ATTRIBUTION_STORAGE_KEY = "acoustic_obog_attribution";
export const ATTRIBUTION_COOKIE_NAME = "ao_attribution";
export const ATTRIBUTION_MAX_AGE_DAYS = 30;

export const attributionParamKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

export type AttributionParamKey = (typeof attributionParamKeys)[number];

export type AttributionData = Partial<Record<AttributionParamKey, string>> & {
  landingPage?: string;
  firstSeenAt?: string;
};

const maxAgeSeconds = ATTRIBUTION_MAX_AGE_DAYS * 24 * 60 * 60;

const isBrowser = () => typeof window !== "undefined";

const safeParseAttribution = (value: string | null): AttributionData | null => {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as AttributionData;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
};

const readCookie = (name: string) => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : null;
};

export const getStoredAttribution = (): AttributionData => {
  if (!isBrowser()) {
    return {};
  }

  const localValue = safeParseAttribution(
    window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY),
  );

  if (localValue) {
    return localValue;
  }

  return safeParseAttribution(readCookie(ATTRIBUTION_COOKIE_NAME)) ?? {};
};

export const storeAttribution = (attribution: AttributionData) => {
  if (!isBrowser()) {
    return;
  }

  const serialized = JSON.stringify(attribution);
  window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, serialized);
  document.cookie = `${ATTRIBUTION_COOKIE_NAME}=${encodeURIComponent(
    serialized,
  )}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
};

export const captureAttributionFromUrl = (url: URL = new URL(window.location.href)) => {
  const foundParams = attributionParamKeys.reduce<AttributionData>((params, key) => {
    const value = url.searchParams.get(key);
    if (value) {
      params[key] = value;
    }
    return params;
  }, {});

  if (Object.keys(foundParams).length === 0) {
    return getStoredAttribution();
  }

  const existing = getStoredAttribution();
  const attribution: AttributionData = {
    ...existing,
    ...foundParams,
    landingPage: existing.landingPage ?? url.href,
    firstSeenAt: existing.firstSeenAt ?? new Date().toISOString(),
  };

  storeAttribution(attribution);
  return attribution;
};

export const buildFormAttribution = () => getStoredAttribution();
