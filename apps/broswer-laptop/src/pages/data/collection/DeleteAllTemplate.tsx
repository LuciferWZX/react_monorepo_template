// Dependencies: pnpm install lucide-react

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CircleAlert } from "lucide-react";
import {
  Fragment,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "@/components/ui/button.tsx";
import { DataFileType } from "@/lib/template.ts";
import { Progress } from "@/components/ui/progress";
import { cn, sleep } from "@/lib/utils.ts";
import Decimal from "decimal.js";
import { FileManager } from "@/instances/FileManager.ts";
import { BaseDirectory } from "@tauri-apps/api/path";
import { AppManager } from "@/instances/AppManager.ts";

interface DeleteAllTemplateProps extends PropsWithChildren {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cacheTemplates: DataFileType[];
  refresh: () => void;
}
export default function DeleteAllTemplate(props: DeleteAllTemplateProps) {
  const { open, children, refresh, cacheTemplates, onOpenChange } = props;
  const [templates, setTemplates] = useState<DataFileType[]>([]);
  const [step, setStep] = useState<0 | 1>(0);
  const [currentCount, setCurrentCount] = useState(0);
  useEffect(() => {
    if (open) {
      setTemplates(cacheTemplates);
    }
  }, [open]);
  const deleteAll = async () => {
    for (let i = 0; i < templates.length; i++) {
      await sleep(1000);
      const template = templates[i];
      await FileManager.shared.removeFile(
        `${AppManager.shared.COLLECTION_PATH}/${template.id}.temp`,
        BaseDirectory.AppData,
      );
      //删除
      setCurrentCount(i + 1);
    }
    refresh();
  };
  const isDeleting = useMemo(() => {
    return step === 1 && currentCount < templates.length;
  }, [step, currentCount]);
  useEffect(() => {
    if (open) {
      setStep(0);
      setCurrentCount(0);
    }
  }, [open]);
  return (
    <AlertDialog
      open={isDeleting ? true : open}
      onOpenChange={isDeleting ? undefined : onOpenChange}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        {step === 0 && (
          <Fragment>
            <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
              <div
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
                aria-hidden="true"
              >
                <CircleAlert
                  className="opacity-80 text-destructive"
                  size={16}
                  strokeWidth={2}
                />
              </div>
              <AlertDialogHeader>
                <AlertDialogTitle>确定要进行删除吗?</AlertDialogTitle>
                <AlertDialogDescription>
                  你确定删除全部的模板吗？
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => onOpenChange(false)}>
                取消
              </AlertDialogCancel>
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => {
                  setStep(1);
                  deleteAll().then();
                }}
              >
                确定
              </Button>
            </AlertDialogFooter>
          </Fragment>
        )}
        {step === 1 && (
          <Fragment>
            <div className={"text-center"}>
              {currentCount !== templates.length ? (
                <Fragment>
                  总共{" "}
                  <span className={"text-primary"}>{templates.length}</span>{" "}
                  个模板,正在删除{" "}
                  <span className={"text-primary"}>
                    {templates?.[currentCount]?.name}
                  </span>
                </Fragment>
              ) : (
                <Fragment>模板已全部删除</Fragment>
              )}
            </div>
            <Progress
              value={
                Number(Decimal.div(currentCount, templates.length).toFixed(2)) *
                100
              }
              classes={{
                indicator: cn({
                  "bg-green-500": currentCount === templates.length,
                }),
              }}
            />
            <div className={"text-center"}>
              <Button
                disabled={currentCount !== templates.length}
                onClick={() => onOpenChange(false)}
                variant={"outline"}
              >
                完成
              </Button>
            </div>
          </Fragment>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
