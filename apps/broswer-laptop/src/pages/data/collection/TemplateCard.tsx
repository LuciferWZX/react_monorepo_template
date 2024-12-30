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

interface TemplateCardProps {
  template: DataFileType;
  onDelete: () => void;
  onEdit: () => void;
}
const TemplateCard = (props: TemplateCardProps) => {
  const { template, onEdit, onDelete } = props;
  return (
    <div
      className={"rounded-xl border bg-card text-card-foreground shadow p-2"}
    >
      <div className={"flex  gap-2"}>
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage
            src={template.creator.avatar}
            alt={template.creator.username}
          />
          <AvatarFallback className="rounded-lg">
            {template.creator.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className={"flex-1 overflow-auto"}>
          <div className={"flex"}>
            <h2 className={"flex-1 truncate"}>{template.name}</h2>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full shadow-none"
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
