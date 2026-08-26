"use client";

import { useEffect } from "react";
import { captureAttributionFromUrl } from "@/lib/analytics/attribution";

const UtmAttributionTracker = () => {
  useEffect(() => {
    captureAttributionFromUrl();
  }, []);

  return null;
};

export default UtmAttributionTracker;
