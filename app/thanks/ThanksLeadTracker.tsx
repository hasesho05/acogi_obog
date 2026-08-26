"use client";

import { useEffect } from "react";
import { trackLead } from "@/lib/analytics/events";

const LEAD_TRACKED_KEY = "lead_tracked";

const ThanksLeadTracker = () => {
  useEffect(() => {
    if (window.sessionStorage.getItem(LEAD_TRACKED_KEY) === "true") {
      return;
    }

    trackLead({ location: "thanks" });
    window.sessionStorage.setItem(LEAD_TRACKED_KEY, "true");
  }, []);

  return null;
};

export default ThanksLeadTracker;
