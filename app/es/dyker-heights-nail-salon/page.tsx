import HyperlocalLandingPage from "@/app/components/HyperlocalLandingPage";
import { hyperlocalMetadata } from "@/app/data/hyperlocalMetadata";

export const metadata = hyperlocalMetadata("dyker-heights-nail-salon", "es");

export default function DykerHeightsEsPage() {
  return <HyperlocalLandingPage slug="dyker-heights-nail-salon" lang="es" />;
}
