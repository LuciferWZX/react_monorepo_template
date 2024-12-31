import { DataFileType } from "@/lib/template.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Ellipsis, Files, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { cn } from "@/lib/utils.ts";

interface TemplateCardProps {
  template: DataFileType;
  onDelete: () => void;
  onEdit: () => void;
  checked?: boolean;
  checkMode?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
const TemplateCard = (props: TemplateCardProps) => {
  const { template, checked, onCheckedChange, checkMode, onEdit, onDelete } =
    props;
  return (
    <div
      className={
        "group relative rounded-xl border bg-card text-card-foreground shadow p-2 has-[[data-state=checked]]:border-ring  has-[[data-state=checked]]:bg-primary/20 "
      }
    >
      <div className={"flex gap-2"}>
        <div className={"flex-shrink-1 flex flex-col items-center gap-1"}>
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={template.creator.avatar}
              alt={template.creator.username}
            />
            <AvatarFallback className="rounded-lg">
              {template.creator.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {checkMode && (
            <Checkbox
              id={template.id}
              value={template.id}
              className={cn(
                "order-1 after:absolute after:inset-0 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500",
              )}
              onCheckedChange={onCheckedChange}
              checked={checked}
            />
          )}
        </div>
        <div className={"flex-1 overflow-auto"}>
          <div className={"flex"}>
            <h3 className={"flex-1 truncate min-h-10"}>{template.name}</h3>
            <div className={"p-1"}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={cn("w-6 h-6 rounded-full shadow-none", {
                      hidden: checkMode,
                    })}
                    aria-label="Open edit menu"
                  >
                    <Ellipsis size={16} strokeWidth={2} aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Files
                      size={16}
                      strokeWidth={2}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    克隆
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit
                      size={16}
                      strokeWidth={2}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    修改
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onDelete}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash size={16} strokeWidth={2} aria-hidden="true" />
                    删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className={"flex flex-col gap-1"}>
            <span className={"text-xs text-muted-foreground"}>
              创建人: {template.creator.nickname}
            </span>
            <span className={"text-xs text-muted-foreground"}>
              创建时间:{" "}
              {dayjs(template.createTime).format("YYYY/MM/DD HH:mm:ss")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TemplateCard;
