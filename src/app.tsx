import { useState, useEffect } from "preact/hooks";
import {
  getLeaderboard,
  getMarket,
  LeaderboardResponse,
  MarketResponse,
} from "./api";

import { Leaderboard } from "./components/Leaderboard";
import { Market } from "./components/Market";

import { Tabs } from "./components/Tabs";

export function App() {
  const tabs = [
    { label: "Leaderboard", key: "leaderboard" },
    { label: "Market", key: "market" },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0].key);

  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardResponse | null>(null);

  const [marketData, setMarketData] = useState<MarketResponse | null>(null);

  const fetchLeaderboardData = async () => {
    const { error, data } = await getLeaderboard();
    if (error) {
      console.error("Error fetching leaderboard data:", error);
    } else {
      setLeaderboardData(data);
      console.log("Leaderboard data:", data);
    }
  };

  const fetchMarketData = async () => {
    const { error, data } = await getMarket();
    if (error) {
      console.error("Error fetching market data:", error);
    } else {
      setMarketData(data);
      console.log("Market data:", data);
    }
  };

  // fetch leaderboard data when the component mounts
  useEffect(() => {
    fetchLeaderboardData();
    fetchMarketData();
  }, []);

  useEffect(() => {
    console.log("App mounted");
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("beforeinstallprompt fired", e);
    });
  }, []);

  return (
    <>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectedTab={setSelectedTab}
      />
      <div>
        <p>Selected Tab: {selectedTab}</p>
        <div>
          {selectedTab === "leaderboard" && (
            <Leaderboard players={leaderboardData?.players || []} />
          )}
          {selectedTab === "market" && marketData && (
            <Market items={marketData.items} />
          )}
        </div>
      </div>
    </>
  );
}
