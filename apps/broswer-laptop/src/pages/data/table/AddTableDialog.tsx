// Dependencies: pnpm install lucide-react

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataFileType } from "@/lib/template.ts";
import { Input } from "@/components";
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

interface AddTableDialogProps {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  template: DataFileType | null;
}
const AddTableDialog = (props: AddTableDialogProps) => {
  const { open, onOpenChange, template } = props;
  const formSchema = z.object({
    name: z
      .string()
      .min(2, "表格名称不能为空")
      .max(50, "表格名称最多50个字符")
      .regex(/^\S*$/, "不能包含空格"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("values:", values);
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
