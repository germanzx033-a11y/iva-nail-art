import ServiceLandingPage from "@/app/components/ServiceLandingPage";
import { serviceLandingMetadata } from "@/app/data/serviceLandingMetadata";

export const metadata = serviceLandingMetadata("nail-art-bay-ridge", "es");

export default function Page() {
  return <ServiceLandingPage slug="nail-art-bay-ridge" lang="es" />;
}
