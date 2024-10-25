import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LifeBuoy,
  Map,
  MessageCircleMore,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import {
  ScrollArea,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components";
import { TeamSwitcher } from "@/layouts/base/team-switcher.tsx";
import { NavMain } from "@/layouts/base/nav-main.tsx";
import { NavProjects } from "@/layouts/base/nav-projects.tsx";
import { NavUser } from "@/layouts/base/nav-user.tsx";
import { ComponentProps, useState } from "react";
import { INav } from "@/types";
import NavSecond from "@/layouts/base/nav-second.tsx";
import { useAppStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar:
      "https://img1.baidu.com/it/u=1708553777,3285910570&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1729875600&t=cab79f703cf61a3978c9a600a5b351b8",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const user = useAppStore(useShallow((state) => state.user))!;
  const [navs] = useState<INav[]>([
    {
      title: "会话",
      icon: MessageCircleMore,
      url: "/chat",
    },
  ]);
  const [bottomNavs] = useState<INav[]>([
    {
      title: "设置",
      icon: Settings,
      url: "setting",
    },
    {
      title: "支持",
      icon: LifeBuoy,
      url: "support",
    },
  ]);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea hideX={true}>
          <NavMain items={navs} />
          <NavProjects projects={data.projects} />
        </ScrollArea>
        <NavSecond items={bottomNavs} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
