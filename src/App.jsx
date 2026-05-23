import { useEffect, useState } from "react";
import CollaborateBar from "./components/Layout/CollaborateBar";
import Header from "./components/Layout/Header";
import TabNav from "./components/Layout/TabNav";
import FinanceTab from "./components/Finance/FinanceTab";
import ItineraryTab from "./components/Itinerary/ItineraryTab";
import ScrapbookTab from "./components/Scrapbook/ScrapbookTab";
import { loadShareFromUrl } from "./utils/tripStorage";

export default function App() {
  const [activeTab, setActiveTab] = useState("itinerary");
  const [sharedNotice, setSharedNotice] = useState(false);

  useEffect(() => {
    if (loadShareFromUrl()) setSharedNotice(true);
  }, []);

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      {sharedNotice && (
        <p className="text-center text-xs font-medium text-matcha bg-matcha-soft/80 py-2 px-4">
          Shared trip loaded — budget & scrapbook are synced from your friend&apos;s link.
        </p>
      )}
      <CollaborateBar />
      <TabNav active={activeTab} onChange={setActiveTab} />
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === "itinerary" && <ItineraryTab />}
        {activeTab === "finance" && <FinanceTab />}
        {activeTab === "scrapbook" && <ScrapbookTab />}
      </main>
      <footer className="border-t border-border py-6 text-center text-xs text-ink-muted space-y-1">
        <p>Fukuoka travel guide · Plan together with share link or export file</p>
        <p>
          Code on{" "}
          <a
            href="https://github.com/janice-lee-cloud/trip"
            className="text-rose underline underline-offset-2 hover:text-ink"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          {" · "}
          Live site{" "}
          <a
            href="https://janice-lee-cloud.github.io/trip/"
            className="text-rose underline underline-offset-2 hover:text-ink"
            target="_blank"
            rel="noreferrer"
          >
            janice-lee-cloud.github.io/trip
          </a>
        </p>
      </footer>
    </div>
  );
}
