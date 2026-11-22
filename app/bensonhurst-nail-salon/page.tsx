import HyperlocalLandingPage from "@/app/components/HyperlocalLandingPage";
import { hyperlocalMetadata } from "@/app/data/hyperlocalMetadata";

export const metadata = hyperlocalMetadata("bensonhurst-nail-salon", "en");

export default function BensonhurstPage() {
  return <HyperlocalLandingPage slug="bensonhurst-nail-salon" lang="en" />;
}
