import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { serviceLandingMetadata } from "@/app/data/serviceLandingMetadata";

export const metadata = serviceLandingMetadata("acrylic-nails-bay-ridge", "en");

export default function Page() {
  return <ServiceLandingPage slug="acrylic-nails-bay-ridge" lang="en" />;
}
