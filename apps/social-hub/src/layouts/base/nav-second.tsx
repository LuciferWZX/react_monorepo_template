import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components";
import { INav } from "@/types";
import { match } from "ts-pattern";

interface NavSecondProps {
  items: INav[];
}
export function NavSecond(props: NavSecondProps) {
  const { items } = props;
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm" tooltip={item.title}>
                <a
                  href={item.url}
                  onClick={(event) => {
                    event.preventDefault();
                    match(item.url)
                      .with("setting", () => {
                        console.log("打开设置");
                      })
                      .otherwise((otherUrl) => {
                        console.log("other:", otherUrl);
                      });
                  }}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
export default NavSecond;
