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
    <div class="flex w-full justify-center items-center max-w-108 2xl:max-w-160">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onSelectedTab(tab.key)}
          class={`text-3xl w-1/2 h-12 2xl:h-18 2xl:text-5xl ${
            selectedTab === tab.key
              ? 'bg-primary text-terminal'
              : 'bg-terminal text-primary opacity-50 hover:opacity-100 cursor-crosshair'
          } `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
