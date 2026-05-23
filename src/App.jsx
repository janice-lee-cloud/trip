import { useState } from "react";
import Header from "./components/Layout/Header";
import TabNav from "./components/Layout/TabNav";
import FinanceTab from "./components/Finance/FinanceTab";
import ItineraryTab from "./components/Itinerary/ItineraryTab";
import ScrapbookTab from "./components/Scrapbook/ScrapbookTab";

export default function App() {
  const [activeTab, setActiveTab] = useState("itinerary");

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <TabNav active={activeTab} onChange={setActiveTab} />
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === "itinerary" && <ItineraryTab />}
        {activeTab === "finance" && <FinanceTab />}
        {activeTab === "scrapbook" && <ScrapbookTab />}
      </main>
      <footer className="border-t border-border py-6 text-center text-xs text-ink-muted">
        <p>
          Japan 2026 · Made with care for two travelers · Data saved on this device
        </p>
      </footer>
    </div>
  );
}
