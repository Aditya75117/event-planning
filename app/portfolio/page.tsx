import PortfolioGallery from "@/components/PortfolioGallery";

export const metadata = {
  title: "Lumière | Portfolio Gallery",
  description: "Visual archive of captured elegance—weddings, corporate galas, and private celebrations.",
};

export default function PortfolioPage() {
  return (
    <main className="lumiere-container">
      <PortfolioGallery />
    </main>
  );
}
