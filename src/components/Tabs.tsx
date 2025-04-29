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
    <div>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onSelectedTab(tab.key)}
          class={`text-2xl w-36 h-12  ${
            selectedTab === tab.key
              ? 'bg-primary text-black'
              : 'bg-border text-white opacity-50 hover:opacity-100 cursor-crosshair'
          } `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
