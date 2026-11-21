import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { serviceLandingMetadata } from "@/app/data/serviceLandingMetadata";

export const metadata = serviceLandingMetadata("pedicure-bay-ridge", "en");

export default function Page() {
  return <ServiceLandingPage slug="pedicure-bay-ridge" lang="en" />;
}
