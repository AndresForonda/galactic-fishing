import { FunctionalComponent } from "preact";

interface Tab {
  label: string;
  key: string;
}

interface TabsProps {
  tabs: Tab[];
  selectedTab: string;
  onSelectedTab: (key: string) => void;
}

export const Tabs: FunctionalComponent<TabsProps> = ({
  tabs,
  selectedTab,
  onSelectedTab,
}) => {
  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onSelectedTab(tab.key)}
          className={`px-4 py-2 ${
            selectedTab === tab.key
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          } rounded`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
