"use client";

import { Stats } from "../../types/project";
import { StatsCardItem } from "./StatsCardItem";
import { 
  Archive, 
  RefreshCw, 
  Globe, 
  Smartphone, 
  Database, 
  Star 
} from "lucide-react";

interface StatsCardsProps {
  stats: Stats;
  onRefresh: () => void;
  onNewProject: () => void;
}

export function StatsCards({ stats, onRefresh, onNewProject }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCardItem
        title="Total Projects"
        value={stats.total}
        subValue={`${stats.featured} featured`}
        icon={Archive}
        color="blue"
      />

      <StatsCardItem
        title="By Category"
        items={[
          { label: "Web Apps", value: stats.webApps, icon: Globe },
          { label: "Mobile", value: stats.mobile, icon: Smartphone },
          { label: "APIs", value: stats.api, icon: Database }
        ]}
        color="purple"
      />

      <StatsCardItem
        title="Last Updated"
        value={stats.lastUpdated}
        subValue="Today"
        icon={RefreshCw}
        color="green"
      />

      <StatsCardItem
        title="Quick Actions"
        actions={[
          { 
            label: "New Project", 
            onClick: onNewProject, 
            icon: Star,
            variant: "gradient" as const
          },
          { 
            label: "Refresh", 
            onClick: onRefresh, 
            icon: RefreshCw,
            variant: "outline" as const
          }
        ]}
        color="orange"
      />
    </div>
  );
}