import { useCollections } from "@/pages/data/collection/useCollections.ts";
import {
  Accordion,
  AccordionItem,
  AccordionPrimitive,
} from "@/components/ui/accordion.tsx";
import { Ellipsis, Plus } from "lucide-react";
import { AccordionContent } from "@radix-ui/react-accordion";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import AddTableDialog from "@/pages/data/table/AddTableDialog.tsx";
import { useState } from "react";
import { DataFileType, DataTableFileType } from "@/lib/template.ts";
import { FileManager } from "@/instances/FileManager.ts";
import { BaseDirectory } from "@tauri-apps/api/path";
import { AppManager } from "@/instances/AppManager.ts";
import { useRequest } from "ahooks";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";

const TableSidebar = () => {
  const { templates } = useCollections();
  const [template, setTemplate] = useState<DataFileType | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <aside
      className={
        "bg-sidebar/40 h-full overflow-auto border-r border-r-sidebar-border"
      }
    >
      <AddTableDialog
        refresh={() => {
          console.log("刷新");
        }}
        record={null}
        template={template}
        open={open}
        onOpenChange={setOpen}
      />
      <ScrollArea className={"h-full px-2.5"} type={"always"}>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          <RadioGroup
            // defaultValue="r2"
            onValueChange={(value) => {
              console.log("value:", value);
            }}
          >
            {templates.map((template) => (
              <AccordionItem
                value={template.id}
                key={template.id}
                className="py-0"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    asChild={true}
                    className="flex flex-1 items-center py-2 text-left text-sm font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180"
                  >
                    <div className={"cursor-pointer"}>
                      <div className={"flex-1"}>{template.name}</div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full shadow-none h-6 w-6"
                            aria-label="Open edit menu"
                          >
                            <Ellipsis
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={"min-w-fit"}>
                          <DropdownMenuItem
                            onClick={() => {
                              setTemplate(template);
                              setOpen(true);
                            }}
                          >
                            新建表格
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Plus
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 opacity-60 transition-transform duration-200"
                        aria-hidden="true"
                      />
                    </div>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="pb-2 text-muted-foreground">
                  <FileTableList template={template} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </RadioGroup>
        </Accordion>
      </ScrollArea>
    </aside>
  );
};
interface FileTableListProps {
  template: DataFileType;
}
const FileTableList = (props: FileTableListProps) => {
  const { template } = props;
  const [tables, setTables] = useState<DataTableFileType[]>([]);
  const getList = async () => {
    const templates: DataTableFileType[] = [];
    const entries = await FileManager.shared.readDir(
      `${AppManager.shared.TABLE_PATH}/${template.id}`,
      BaseDirectory.AppData,
    );
    if (!entries) {
      return templates;
    }

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const contents = await FileManager.shared.readBinaryFile(
        `${AppManager.shared.TABLE_PATH}/${template.id}/${entry.name}`,
        BaseDirectory.AppData,
      );
      if (contents) {
        templates.push(JSON.parse(contents));
      }
    }
    return templates;
  };
  useRequest(getList, {
    onSuccess: (data) => {
      setTables(data);
    },
    onError: (e) => {
      console.error("error:", e);
      setTables([]);
    },
  });
  if (tables.length === 0) {
    return (
      <div
        className={
          "flex text-muted-foreground text-sm h-10 items-center justify-center"
        }
      >
        暂无数据
      </div>
    );
  }
  return (
    <div>
      {tables.map((table) => {
        return (
          <Label
            key={table.id}
            htmlFor={table.id}
            className="relative flex flex-col gap-4 border border-input p-2 has-[[data-state=checked]]:z-10 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2  flex-1">
                <div className=" cursor-pointer  inline-flex items-start text-xs flex-1 text-foreground/60 has-[[data-state=checked]]:text-foreground">
                  <RadioGroupItem
                    id={table.id}
                    value={table.id}
                    className="sr-only after:absolute after:inset-0"
                    aria-describedby={`${table.id}-price`}
                  />
                  {table.name}
                </div>
              </div>
            </div>
          </Label>
        );
      })}
    </div>
  );
};
export default TableSidebar;
