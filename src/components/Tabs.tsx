import { FunctionalComponent } from 'preact'

interface Tab {
  label: string
  key: string
}

interface TabsProps {
  tabs: Tab[]
  selectedTab: string
  onSelectedTab: (key: string) => void
}

export const Tabs: FunctionalComponent<TabsProps> = ({
  tabs,
  selectedTab,
  onSelectedTab,
}) => {
  return (
    <div class="my-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onSelectedTab(tab.key)}
          className={`px-4 py-2 text-2xl ${
            selectedTab === tab.key
              ? 'bg-primary text-black cursor-crosshair'
              : 'bg-border text-white opacity-50 hover:opacity-100 cursor-pointer'
          } `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
