import { Button } from "@/components/ui/button.tsx";
import { Ellipsis, Plus, Search } from "lucide-react";
import { Input, Message } from "@/components";
import { useState } from "react";
import CollectionTemplateDialog from "@/pages/data/collection/CollectionTemplateDialog.tsx";
import { useCollections } from "@/pages/data/collection/useCollections.ts";
import TemplateCard from "@/pages/data/collection/TemplateCard.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import DeleteTemplate from "@/pages/data/collection/DeleteTemplate.tsx";
import { DataFileType } from "@/lib/template.ts";
import { FileManager } from "@/instances/FileManager.ts";
import { AppManager } from "@/instances/AppManager.ts";
import { BaseDirectory } from "@tauri-apps/api/path";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import DeleteAllTemplate from "@/pages/data/collection/DeleteAllTemplate.tsx";

const CollectionPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isBatch, setIsBatch] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteAllOpen, setDeleteAllOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const { templates, refreshCollections } = useCollections();
  const [record, setRecord] = useState<DataFileType | null>(null);
  return (
    <div className={"h-full overflow-auto flex flex-col"}>
      <DeleteAllTemplate
        refresh={refreshCollections}
        cacheTemplates={templates}
        open={deleteAllOpen}
        onOpenChange={setDeleteAllOpen}
      />
      <CollectionTemplateDialog
        record={record}
        templates={templates}
        refresh={refreshCollections}
        onOpenChange={(_open) => {
          setOpen(_open);
        }}
        open={open}
      />
      <DeleteTemplate
        templateName={record?.name ?? ""}
        onConfirm={async () => {
          if (!record) {
            return;
          }
          try {
            await FileManager.shared.removeFile(
              `${AppManager.shared.COLLECTION_PATH}/${record.id}.temp`,
              BaseDirectory.AppData,
            );
            refreshCollections();
            setDeleteOpen(false);
            toast.custom((t) => (
              <Message type={"success"} handleClose={() => toast.dismiss(t)}>
                删除成功
              </Message>
            ));
          } catch (e) {
            toast.custom((t) => (
              <Message type={"error"} handleClose={() => toast.dismiss(t)}>
                {e as string}
              </Message>
            ));
          }
        }}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
      <div className={"p-2 pb-0 flex flex-shrink items-center justify-between"}>
        <Input
          prefixIcon={Search}
          classes={{ input: "min-w-80" }}
          placeholder={"搜索内容"}
          allowClear={true}
        />
        {isBatch ? (
          <div className={"flex gap-2"}>
            <Button
              onClick={() => {
                setIsBatch(false);
                setSelectedIds([]);
              }}
            >
              取消批量操作
            </Button>
            <Button variant={"ghost"} disabled={selectedIds.length === 0}>
              删除 {selectedIds.length > 0 && `（${selectedIds.length}）项`}
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => {
                if (selectedIds.length < templates.length) {
                  setSelectedIds(templates.map((template) => template.id));
                } else {
                  setSelectedIds([]);
                }
              }}
            >
              {selectedIds.length < templates.length ? "全选" : "取消全选"}
            </Button>
          </div>
        ) : (
          <div className={"flex gap-2"}>
            <Button
              className="bg-primary text-white after:flex-1 hover:bg-primary/90 aspect-square max-sm:p-0"
              onClick={() => {
                setRecord(null);
                setOpen(true);
              }}
            >
              <Plus
                className="opacity-60 sm:-ms-1 sm:me-2"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="max-sm:sr-only">新增</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="shadow-none aspect-square"
                  aria-label="Open edit menu"
                >
                  <Ellipsis size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>模式</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setIsBatch(true)}>
                    批量操作
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>快速操作</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    disabled={templates.length === 0}
                    onClick={() => setDeleteAllOpen(true)}
                  >
                    全部删除
                  </DropdownMenuItem>
                  <DropdownMenuItem>全部导出</DropdownMenuItem>
                  <DropdownMenuItem>导入文件</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className={"flex-1 p-2 overflow-auto"}>
        {templates.length === 0 && (
          <div
            className={
              "h-full w-full flex justify-center items-center text-muted-foreground"
            }
          >
            - 暂无数据 -
          </div>
        )}
        <ScrollArea type={"always"}>
          <div className={"grid grid-cols-3 gap-2"}>
            {templates.map((template) => {
              return (
                <div className={"inline-block "} key={template.id ?? "d"}>
                  <TemplateCard
                    checkMode={isBatch}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedIds((orgIds) => orgIds.concat(template.id));
                      } else {
                        setSelectedIds((orgIds) =>
                          orgIds.filter((id) => id !== template.id),
                        );
                      }
                    }}
                    checked={!!selectedIds.find((id) => id === template.id)}
                    onEdit={() => {
                      setRecord(template);
                      setOpen(true);
                    }}
                    onDelete={() => {
                      setRecord(template);
                      setDeleteOpen(true);
                    }}
                    template={template}
                  />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default CollectionPage;
