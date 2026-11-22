import HyperlocalLandingPage from "@/app/components/HyperlocalLandingPage";
import { hyperlocalMetadata } from "@/app/data/hyperlocalMetadata";

export const metadata = hyperlocalMetadata("bath-beach-nail-salon", "es");

export default function BathBeachEsPage() {
  return <HyperlocalLandingPage slug="bath-beach-nail-salon" lang="es" />;
}
