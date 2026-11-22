import HyperlocalLandingPage from "@/app/components/HyperlocalLandingPage";
import { hyperlocalMetadata } from "@/app/data/hyperlocalMetadata";

export const metadata = hyperlocalMetadata("sunset-park-nail-salon", "en");

export default function SunsetParkPage() {
  return <HyperlocalLandingPage slug="sunset-park-nail-salon" lang="en" />;
}
