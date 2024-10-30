"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  CountBadge,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components";
import { INav } from "@/types";
import { match, P } from "ts-pattern";
import { useLocation, useNavigate } from "react-router-dom";

export function NavMain({ items }: { items: INav[] }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>功能</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          return match(item)
            .with({ items: P.not(undefined) }, (_item) => {
              return (
                <Collapsible
                  key={_item.url}
                  asChild
                  defaultOpen={_item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <CountBadge count={_item.count}>
                        <SidebarMenuButton tooltip={_item.title}>
                          {_item.icon && <_item.icon />}
                          <span>{_item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CountBadge>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {_item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })
            .otherwise((_item) => {
              return (
                <SidebarMenuItem key={_item.url}>
                  <CountBadge count={_item.count}>
                    <SidebarMenuButton
                      tooltip={_item.title}
                      isActive={location.pathname.startsWith(_item.url)}
                      onClick={() => {
                        navigate(_item.url);
                      }}
                    >
                      {_item.icon && <_item.icon />}
                      <span>{_item.title}</span>
                    </SidebarMenuButton>
                  </CountBadge>
                </SidebarMenuItem>
              );
            });
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
