"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatsCardItemProps {
  title: string;
  value?: string | number;
  subValue?: string;
  icon?: LucideIcon;
  items?: Array<{ label: string; value: number; icon: LucideIcon }>;
  actions?: Array<{ 
    label: string; 
    onClick: () => void; 
    icon: LucideIcon;
    variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient';
  }>;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

const colorConfig = {
  blue: {
    bg: "from-white to-blue-50 dark:from-gray-800 dark:to-gray-900",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  purple: {
    bg: "from-white to-purple-50 dark:from-gray-800 dark:to-gray-900",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  green: {
    bg: "from-white to-green-50 dark:from-gray-800 dark:to-gray-900",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
  },
  orange: {
    bg: "from-white to-orange-50 dark:from-gray-800 dark:to-gray-900",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
};

export function StatsCardItem({ 
  title, 
  value, 
  subValue, 
  icon: Icon, 
  items, 
  actions,
  color 
}: StatsCardItemProps) {
  const config = colorConfig[color];

  return (
    <Card className={cn(
      "bg-gradient-to-br border-0 shadow-lg",
      config.bg
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {value !== undefined && (
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {value}
              </div>
              {subValue && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {subValue}
                </p>
              )}
            </div>
            {Icon && (
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                config.iconBg
              )}>
                <Icon className={cn("w-6 h-6", config.iconColor)} />
              </div>
            )}
          </div>
        )}

        {items && (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {actions && (
          <div className="flex items-center space-x-3 mt-4">
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant === 'gradient' ? 'default' : action.variant}
                className={cn(
                  "flex-1",
                  action.variant === 'gradient' && 
                  "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                )}
              >
                {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}