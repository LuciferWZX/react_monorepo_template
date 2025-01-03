// Dependencies: pnpm install lucide-react

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataFileType, DataTableFileType } from "@/lib/template.ts";
import { Input, Message } from "@/components";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.tsx";
import { FileManager } from "@/instances/FileManager.ts";
import { AppManager } from "@/instances/AppManager.ts";
import { BaseDirectory } from "@tauri-apps/api/path";
import { nanoid } from "nanoid";
import { toast } from "sonner";

interface AddTableDialogProps {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  template: DataFileType | null;
  record: DataTableFileType | null;
  refresh: () => void;
}
const AddTableDialog = (props: AddTableDialogProps) => {
  const { open, onOpenChange, record, refresh, template } = props;
  const formSchema = z.object({
    name: z
      .string()
      .min(1, "表格名称不能为空")
      .max(50, "表格名称最多50个字符")
      .regex(/^\S*$/, "不能包含空格"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values:", values);
    if (!template) {
      throw Error("该模板不存在");
    }
    const id = nanoid(10);
    const data: DataTableFileType = {
      id: id,
      name: values.name,
      createTime: new Date(),
      data: [],
      updateTime: null,
      creatorId: "system",
    };
    try {
      const exist = await FileManager.shared.exist(
        `${AppManager.shared.TABLE_PATH}/${template.id}`,
        BaseDirectory.AppData,
      );
      console.log("存在:", exist);
      if (!exist) {
        await FileManager.shared.createDir(
          `${AppManager.shared.TABLE_PATH}/${template.id}`,
          BaseDirectory.AppData,
        );
        console.log("新建文件目录");
      }
      await FileManager.shared.writeBinaryFile(
        `${AppManager.shared.TABLE_PATH}/${template.id}/${id}.tab`,
        data,
        BaseDirectory.AppData,
      );
      onOpenChange(false);
      toast.custom((t) => (
        <Message type={"success"} handleClose={() => toast.dismiss(t)}>
          {record ? "修改成功" : "新建成功"}
        </Message>
      ));
      refresh();
    } catch (e) {
      console.log("出错：", e);
      toast.custom((t) => (
        <Message type={"error"} handleClose={() => toast.dismiss(t)}>
          {record ? "修改失败" : "新建失败"}
        </Message>
      ));
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-start text-sm">新建表格</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <div className="peer flex-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          label={"表格名称"}
                          overlapping={true}
                          placeholder="名称"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">新建</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AddTableDialog;
