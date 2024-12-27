import { Button } from "@/components/ui/button.tsx";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components";
import { useState } from "react";
import CollectionTemplateDialog from "@/pages/data/collection/CollectionTemplateDialog.tsx";

const CollectionPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={"h-full overflow-auto"}>
      <CollectionTemplateDialog onOpenChange={setOpen} open={open} />
      <div className={"p-2 flex items-center justify-between"}>
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
    </div>
  );
};
export default CollectionPage;
