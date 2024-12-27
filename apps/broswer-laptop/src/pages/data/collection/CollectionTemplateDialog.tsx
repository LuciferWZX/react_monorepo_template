import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PropsWithChildren } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components";
import TableHeaderFormItem from "@/pages/data/collection/TableHeaderFormItem.tsx";
import { nanoid } from "nanoid";

interface CollectionTemplateDialogProps extends PropsWithChildren {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(2, "模板名称至少2个字符")
    .max(50, "模板名称最多50个字符")
    .regex(/^\S*$/, "不能包含空格"),
  headers: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1, "名称不能为空"),
    }),
  ),
});
const CollectionTemplateDialog = (props: CollectionTemplateDialogProps) => {
  const { children, open, onOpenChange } = props;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      headers: [
        { id: "001", title: "www" },
        { id: "002", title: "www2" },
      ],
    },
  });
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "headers",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values:", values);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5 ">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            添加模板
          </DialogTitle>
          <div className={"overflow-auto"}>
            <DialogDescription asChild>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="px-6 py-4">
                    <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                      <div className="space-y-4">
                        <div className="space-y-0">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>名称</FormLabel>
                                <FormControl>
                                  <Input
                                    allowClear={true}
                                    placeholder="模板名称"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  模板呈现的名称,字符数2 - 50个字符。
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-0">
                          <p className={"text-sm mb-2"}>
                            <strong>表头</strong>
                          </p>
                          <div className={"mb-4"}>
                            {fields.map((field, index) => {
                              return (
                                <TableHeaderFormItem
                                  className={"mb-2"}
                                  key={field.id}
                                  onlyOne={fields.length === 1}
                                  control={form.control}
                                  index={index}
                                  value={field}
                                  update={update}
                                  remove={remove}
                                />
                              );
                            })}
                          </div>
                          <Button
                            type={"button"}
                            className={"w-full"}
                            variant={"secondary"}
                            onClick={() => {
                              append({ id: nanoid(10), title: "" });
                            }}
                          >
                            新增
                          </Button>
                          {/*<FormField*/}
                          {/*  control={form.control}*/}
                          {/*  name="headers"*/}
                          {/*  render={({ field }) => (*/}
                          {/*    <FormItem>*/}
                          {/*      <FormLabel>表头</FormLabel>*/}
                          {/*      <FormControl>*/}
                          {/*        <TableHeaderFormItem*/}
                          {/*          onChange={(event) => {*/}
                          {/*            console.log(22222, event);*/}
                          {/*          }}*/}
                          {/*          {...field}*/}
                          {/*        />*/}
                          {/*      </FormControl>*/}
                          {/*      <FormDescription>*/}
                          {/*        模板呈现的表头*/}
                          {/*      </FormDescription>*/}
                          {/*      <FormMessage />*/}
                          {/*    </FormItem>*/}
                          {/*  )}*/}
                          {/*/>*/}
                        </div>

                        {/*<div className="space-y-1">*/}
                        {/*  <p>*/}
                        {/*    <strong>排序</strong>*/}
                        {/*  </p>*/}
                        {/*  <p>*/}
                        {/*    Users are responsible for maintaining the*/}
                        {/*    confidentiality of their account credentials. Any*/}
                        {/*    activities occurring under a user&lsquo;s account*/}
                        {/*    are the sole responsibility of the account holder.*/}
                        {/*    Users must notify the website administrators*/}
                        {/*    immediately of any unauthorized account access.*/}
                        {/*  </p>*/}
                        {/*</div>*/}
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="border-t border-border px-6 py-4 sm:items-center">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              取消
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={form.handleSubmit(onSubmit)}>
              保存
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CollectionTemplateDialog;
