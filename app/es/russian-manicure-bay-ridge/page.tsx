import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { serviceLandingMetadata } from "@/app/data/serviceLandingMetadata";

export const metadata = serviceLandingMetadata("russian-manicure-bay-ridge", "es");

export default function Page() {
  return <ServiceLandingPage slug="russian-manicure-bay-ridge" lang="es" />;
}
