import HyperlocalLandingPage from "@/app/components/HyperlocalLandingPage";
import { hyperlocalMetadata } from "@/app/data/hyperlocalMetadata";

export const metadata = hyperlocalMetadata("sunset-park-nail-salon", "es");

export default function SunsetParkEsPage() {
  return <HyperlocalLandingPage slug="sunset-park-nail-salon" lang="es" />;
}
