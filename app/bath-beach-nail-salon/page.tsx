import HyperlocalLandingPage from "@/app/components/HyperlocalLandingPage";
import { hyperlocalMetadata } from "@/app/data/hyperlocalMetadata";

export const metadata = hyperlocalMetadata("bath-beach-nail-salon", "en");

export default function BathBeachPage() {
  return <HyperlocalLandingPage slug="bath-beach-nail-salon" lang="en" />;
}
