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
import { DataFileType } from "@/lib/template.ts";

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
      <AddTableDialog template={template} open={open} onOpenChange={setOpen} />
      <ScrollArea className={"h-full px-2.5"} type={"always"}>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {templates.map((template) => (
            <AccordionItem
              value={template.id}
              key={template.id}
              className="py-0"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center py-2 text-left text-sm font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
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
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground">
                xxx
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </aside>
  );
};
export default TableSidebar;
