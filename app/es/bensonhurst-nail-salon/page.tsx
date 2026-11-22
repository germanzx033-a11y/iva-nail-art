import HyperlocalLandingPage from "@/app/components/HyperlocalLandingPage";
import { hyperlocalMetadata } from "@/app/data/hyperlocalMetadata";

export const metadata = hyperlocalMetadata("bensonhurst-nail-salon", "es");

export default function BensonhurstEsPage() {
  return <HyperlocalLandingPage slug="bensonhurst-nail-salon" lang="es" />;
}
