// Dependencies: pnpm install lucide-react

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlert } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface DeleteTemplateProps {
  children?: ReactNode;
  templateName: string;
  onConfirm: () => void;
  open: boolean;
  onClose: () => void;
}
export default function DeleteTemplate(props: DeleteTemplateProps) {
  const [inputValue, setInputValue] = useState("");
  const { children, onClose, open, onConfirm, templateName } = props;
  useEffect(() => {
    if (open) {
      setInputValue("");
    }
  }, [open]);
  return (
    <Dialog
      open={open}
      onOpenChange={(_open) => {
        if (!_open) {
          onClose();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">最终确认</DialogTitle>
            <DialogDescription className="sm:text-center">
              这个操作无法被撤销，如果需要删除，请输入名称
              <span className="text-foreground">{templateName}</span>。
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="project-name">模板名称</Label>
            <Input
              id="project-name"
              type="text"
              placeholder={`输入 ${templateName} 确认删除`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={onClose}
                type="button"
                variant="outline"
                className="flex-1"
              >
                取消
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="flex-1"
              disabled={inputValue !== templateName}
              onClick={() => {
                onConfirm();
              }}
            >
              删除
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
