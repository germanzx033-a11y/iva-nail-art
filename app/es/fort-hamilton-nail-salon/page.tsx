import HyperlocalLandingPage from "@/app/components/HyperlocalLandingPage";
import { hyperlocalMetadata } from "@/app/data/hyperlocalMetadata";

export const metadata = hyperlocalMetadata("fort-hamilton-nail-salon", "es");

export default function FortHamiltonEsPage() {
  return <HyperlocalLandingPage slug="fort-hamilton-nail-salon" lang="es" />;
}
