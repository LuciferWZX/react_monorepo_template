import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu.tsx";
import { Fragment, MouseEventHandler, ReactNode } from "react";
import { match, P } from "ts-pattern";
import { cn } from "@/lib/utils.ts";
import { LucideIcon } from "lucide-react";
interface ContextMenuDropdownProps {
  children?: ReactNode;
  items: ContextMenuItemType[];
  contentClassName?: string;
  contentClassName;
}
interface ContextMenuGroupItem extends Omit<ContextMenuItem, "shortcut"> {
  contentClassName?: string;
  children: ContextMenuItemType[];
}
interface ContextMenuItem {
  key: string;
  label: string;
  value: string;
  inset?: boolean;
  disabled?: boolean;
  shortcut?: string;
  className?: string;
  icon?: LucideIcon;
  render?: () => ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
interface SeparatorItem {
  key: string;
  type: "separator";
}
interface CheckBoxItem extends Omit<ContextMenuItem, "inset"> {
  checked?: boolean;
  type: "checkbox";
}
interface RadioGroupItem extends Omit<ContextMenuItem, "value"> {
  checked?: boolean;
  value?: string;
  type: "radio";
  children: Array<Omit<ContextMenuItem, "inset" | "shortcut"> | SeparatorItem>;
}
type ContextMenuItemType =
  | ContextMenuGroupItem
  | ContextMenuItem
  | SeparatorItem
  | CheckBoxItem
  | RadioGroupItem;
const ContextMenuDropdown = (props: ContextMenuDropdownProps) => {
  const { children, contentClassName, items } = props;

  const renderItems = (item: ContextMenuItemType) => {
    return match(item)
      .with({ type: "separator" }, (_item) => {
        return renderSeparator();
      })
      .with({ type: "radio" }, (_group) => {
        return renderRadioGroup(_group);
      })
      .with({ children: P.not(undefined) }, (_group) => {
        return renderContextGroup(_group);
      })
      .with({ type: "checkbox" }, (checkboxItem) => {
        return renderCheckBox(checkboxItem);
      })
      .otherwise((_item) => {
        return renderContextItem(_item);
      });
  };
  const renderContextGroup = (group: ContextMenuGroupItem) => {
    return (
      <ContextMenuSub>
        <ContextMenuSubTrigger
          inset={group.inset}
          disabled={group.disabled}
          className={group.className}
        >
          {group.render ? group.render() : group.label}
        </ContextMenuSubTrigger>
        <ContextMenuSubContent className={cn("w-48", group.contentClassName)}>
          {group.children.map((_item) => {
            return <Fragment key={_item.key}>{renderItems(_item)}</Fragment>;
          })}
        </ContextMenuSubContent>
      </ContextMenuSub>
    );
  };
  const renderContextItem = (item: ContextMenuItem) => {
    return (
      <ContextMenuItem
        inset={item.inset}
        disabled={item.disabled}
        className={item.className}
        onClick={item.onClick}
      >
        {item.render ? (
          item.render()
        ) : (
          <>
            {item.icon && <item.icon className={"w-4 h-4 mr-2"} />}
            {item.label}
          </>
        )}
        {item.shortcut && (
          <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
        )}
      </ContextMenuItem>
    );
  };
  const renderSeparator = () => {
    return <ContextMenuSeparator />;
  };
  const renderCheckBox = (item: CheckBoxItem) => {
    return (
      <ContextMenuCheckboxItem
        checked={item.checked}
        disabled={item.disabled}
        className={item.className}
      >
        {item.render ? item.render() : item.label}
        {item.shortcut && (
          <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
        )}
      </ContextMenuCheckboxItem>
    );
  };
  const renderRadioGroup = (group: RadioGroupItem) => {
    return (
      <ContextMenuRadioGroup value={group.value} className={group.className}>
        <ContextMenuLabel inset={group.inset}>
          {group.render ? group.render() : group.label}
        </ContextMenuLabel>
        {group.children.map((item) => {
          return match(item)
            .with({ type: "separator" }, () => renderSeparator())
            .otherwise((_item) => {
              return (
                <ContextMenuRadioItem
                  className={_item.className}
                  disabled={_item.disabled}
                  value={_item.value}
                >
                  {_item.render ? _item.render() : _item.label}
                </ContextMenuRadioItem>
              );
            });
        })}
      </ContextMenuRadioGroup>
    );
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild={true}>{children}</ContextMenuTrigger>
      <ContextMenuContent className={cn("w-64", contentClassName)}>
        {items.map((item) => {
          return <Fragment key={item.key}>{renderItems(item)}</Fragment>;
        })}
      </ContextMenuContent>
    </ContextMenu>
  );
};
export default ContextMenuDropdown;
