import HyperlocalLandingPage from "@/app/components/HyperlocalLandingPage";
import { hyperlocalMetadata } from "@/app/data/hyperlocalMetadata";

export const metadata = hyperlocalMetadata("dyker-heights-nail-salon", "en");

export default function DykerHeightsPage() {
  return <HyperlocalLandingPage slug="dyker-heights-nail-salon" lang="en" />;
}
