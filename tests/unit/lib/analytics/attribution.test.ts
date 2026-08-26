import { beforeEach, describe, expect, it } from "vitest";
import {
  ATTRIBUTION_COOKIE_NAME,
  ATTRIBUTION_STORAGE_KEY,
  buildFormAttribution,
  captureAttributionFromUrl,
  getStoredAttribution,
} from "@/lib/analytics/attribution";

describe("attribution", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.cookie = `${ATTRIBUTION_COOKIE_NAME}=; Max-Age=0; Path=/`;
  });

  it("captures supported URL params with landing page metadata", () => {
    const attribution = captureAttributionFromUrl(
      new URL(
        "https://example.com/hallo-yodoyabashi?utm_source=flyer&utm_medium=qr&utm_campaign=2026_summer_trial&utm_content=school_gate&gclid=test-gclid",
      ),
    );

    expect(attribution).toMatchObject({
      utm_source: "flyer",
      utm_medium: "qr",
      utm_campaign: "2026_summer_trial",
      utm_content: "school_gate",
      gclid: "test-gclid",
      landingPage:
        "https://example.com/hallo-yodoyabashi?utm_source=flyer&utm_medium=qr&utm_campaign=2026_summer_trial&utm_content=school_gate&gclid=test-gclid",
    });
    expect(attribution.firstSeenAt).toEqual(expect.any(String));
    expect(window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)).toContain(
      "2026_summer_trial",
    );
  });

  it("returns stored attribution when URL has no campaign params", () => {
    captureAttributionFromUrl(
      new URL("https://example.com/?utm_source=instagram&utm_campaign=story"),
    );

    const attribution = captureAttributionFromUrl(new URL("https://example.com/"));

    expect(attribution).toMatchObject({
      utm_source: "instagram",
      utm_campaign: "story",
    });
  });

  it("builds form attribution from storage", () => {
    captureAttributionFromUrl(
      new URL("https://example.com/?utm_source=meta&utm_medium=paid_social"),
    );

    expect(buildFormAttribution()).toMatchObject({
      utm_source: "meta",
      utm_medium: "paid_social",
    });
    expect(getStoredAttribution()).toMatchObject({
      utm_source: "meta",
      utm_medium: "paid_social",
    });
  });
});
