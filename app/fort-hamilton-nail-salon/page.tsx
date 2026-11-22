import HyperlocalLandingPage from "@/app/components/HyperlocalLandingPage";
import { hyperlocalMetadata } from "@/app/data/hyperlocalMetadata";

export const metadata = hyperlocalMetadata("fort-hamilton-nail-salon", "en");

export default function FortHamiltonPage() {
  return <HyperlocalLandingPage slug="fort-hamilton-nail-salon" lang="en" />;
}
