import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { serviceLandingMetadata } from "@/app/data/serviceLandingMetadata";

export const metadata = serviceLandingMetadata("builder-gel-bay-ridge", "es");

export default function Page() {
  return <ServiceLandingPage slug="builder-gel-bay-ridge" lang="es" />;
}
