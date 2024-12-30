import { Button } from "@/components/ui/button.tsx";
import { Plus, Search } from "lucide-react";
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

const CollectionPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const { templates, refreshCollections } = useCollections();
  const [record, setRecord] = useState<DataFileType | null>(null);
  return (
    <div className={"h-full overflow-auto flex flex-col"}>
      <CollectionTemplateDialog
        record={record}
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
          await FileManager.shared.removeFile(
            `${AppManager.shared.COLLECTION_PATH}/${record.name}.tb`,
            BaseDirectory.AppData,
          );
          refreshCollections();
          setDeleteOpen(false);
          toast.custom((t) => (
            <Message type={"success"} handleClose={() => toast.dismiss(t)}>
              删除成功
            </Message>
          ));
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
        <Button
          variant="outline"
          className="aspect-square max-sm:p-0"
          onClick={() => setOpen(true)}
        >
          <Plus
            className="opacity-60 sm:-ms-1 sm:me-2"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="max-sm:sr-only">新增</span>
        </Button>
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
