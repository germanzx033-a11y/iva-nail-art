import HyperlocalLandingPage from "@/app/components/HyperlocalLandingPage";
import { hyperlocalMetadata } from "@/app/data/hyperlocalMetadata";

export const metadata = hyperlocalMetadata("park-slope-nail-salon", "en");

export default function ParkSlopePage() {
  return <HyperlocalLandingPage slug="park-slope-nail-salon" lang="en" />;
}
