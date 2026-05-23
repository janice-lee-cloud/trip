import { useState } from "react";
import Header from "./components/Layout/Header";
import HeroIntro from "./components/Layout/HeroIntro";
import TabNav from "./components/Layout/TabNav";
import FinanceTab from "./components/Finance/FinanceTab";
import ItineraryTab from "./components/Itinerary/ItineraryTab";
import ScrapbookTab from "./components/Scrapbook/ScrapbookTab";

export default function App() {
  const [activeTab, setActiveTab] = useState("itinerary");

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <HeroIntro />
      <TabNav active={activeTab} onChange={setActiveTab} />
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
        {activeTab === "itinerary" && <ItineraryTab />}
        {activeTab === "finance" && <FinanceTab />}
        {activeTab === "scrapbook" && <ScrapbookTab />}
      </main>
      <footer className="border-t border-border bg-surface/50 py-8 text-center text-xs text-ink-muted space-y-2">
        <p className="font-medium text-ink">
          Kyushu Trip Planner — portfolio demonstration
        </p>
        <p>
          Built with React, Vite, and Tailwind CSS · Data stored locally in your
          browser
        </p>
        <p>
          <a
            href="https://github.com/janice-lee-cloud/trip"
            className="text-accent-muted underline underline-offset-2 hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            target="_blank"
            rel="noreferrer"
          >
            View source on GitHub
          </a>
          {" · "}
          <a
            href="https://janice-lee-cloud.github.io/trip/"
            className="text-accent-muted underline underline-offset-2 hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            target="_blank"
            rel="noreferrer"
          >
            Live demo
          </a>
        </p>
      </footer>
    </div>
  );
}
