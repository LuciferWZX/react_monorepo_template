import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ComponentPropsWithoutRef, Fragment } from "react";
import { NavItem } from "@/layouts/base/base-side/index.tsx";
interface NavSecondaryProps
  extends ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: NavItem[];
}
export function NavSecondary(props: NavSecondaryProps) {
  const { items, ...restProps } = props;
  return (
    <SidebarGroup {...restProps}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const itemNode = (
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={item.onClick}
                  tooltip={item.label}
                  isActive={item.isActive}
                  size={"sm"}
                >
                  {item.icon && <item.icon />}
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
            return (
              <Fragment key={item.key}>
                {item.render ? item.render(itemNode) : itemNode}
              </Fragment>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
