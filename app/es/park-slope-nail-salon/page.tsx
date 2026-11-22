import HyperlocalLandingPage from "@/app/components/HyperlocalLandingPage";
import { hyperlocalMetadata } from "@/app/data/hyperlocalMetadata";

export const metadata = hyperlocalMetadata("park-slope-nail-salon", "es");

export default function ParkSlopeEsPage() {
  return <HyperlocalLandingPage slug="park-slope-nail-salon" lang="es" />;
}
