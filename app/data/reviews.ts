// Real client reviews only. Add one object per review the client has agreed to share.
// Leave the list empty rather than inventing reviews: fake reviews are illegal in the US (FTC rule, 2024).
export interface Review {
  text: string;
  textEs?: string;
  author: string; // name or initial, as the client agreed
  date: string; // e.g. "2026-11"
  source: "Google" | "Instagram" | "Message";
}

export const REVIEWS: Review[] = [];

// Google Business "write a review" link. Empty until the profile exists.
export const GOOGLE_REVIEW_URL = "";
