import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavGroupItem } from "@/layouts/base/base-side/index.tsx";
import { Fragment } from "react";

interface NavMainProps {
  items: NavGroupItem[];
}
export function NavMain(props: NavMainProps) {
  const { items } = props;
  return (
    <SidebarGroup>
      {items.map((group) => {
        return (
          <Fragment key={group.key ?? group.value}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.children.map((item) => (
                <Collapsible
                  key={item.key ?? item.value}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={item.onClick}
                      tooltip={item.label}
                      isActive={item.isActive}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </Fragment>
        );
      })}
      {/*<SidebarGroupLabel>Platform</SidebarGroupLabel>*/}
      {/*<SidebarMenu>*/}
      {/*  {items.map((item) => (*/}
      {/*      <Collapsible*/}
      {/*          key={item.title}*/}
      {/*          asChild*/}
      {/*          defaultOpen={item.isActive}*/}
      {/*          className="group/collapsible"*/}
      {/*      >*/}
      {/*        <SidebarMenuItem>*/}
      {/*          <CollapsibleTrigger asChild>*/}
      {/*            <SidebarMenuButton tooltip={item.title}>*/}
      {/*              {item.icon && <item.icon />}*/}
      {/*              <span>{item.title}</span>*/}
      {/*              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />*/}
      {/*            </SidebarMenuButton>*/}
      {/*          </CollapsibleTrigger>*/}
      {/*          <CollapsibleContent>*/}
      {/*            <SidebarMenuSub>*/}
      {/*              {item.items?.map((subItem) => (*/}
      {/*                  <SidebarMenuSubItem key={subItem.title}>*/}
      {/*                    <SidebarMenuSubButton asChild>*/}
      {/*                      <a href={subItem.url}>*/}
      {/*                        <span>{subItem.title}</span>*/}
      {/*                      </a>*/}
      {/*                    </SidebarMenuSubButton>*/}
      {/*                  </SidebarMenuSubItem>*/}
      {/*              ))}*/}
      {/*            </SidebarMenuSub>*/}
      {/*          </CollapsibleContent>*/}
      {/*        </SidebarMenuItem>*/}
      {/*      </Collapsible>*/}
      {/*  ))}*/}
      {/*</SidebarMenu>*/}
    </SidebarGroup>
  );
}
