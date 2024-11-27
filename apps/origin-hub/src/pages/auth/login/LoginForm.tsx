import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components";
import { useRequest } from "ahooks";
import { ServiceManager } from "@/instances/ServiceManager.ts";

const formSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "请输入用户名",
    })
    .trim(),
  password: z.string().min(1, {
    message: "请输入密码",
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { runAsync: login, loading: loginLoading } = useRequest(
    ServiceManager.authService.login,
    { manual: true },
  );
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await login({
      username: values.username,
      password: values.password,
    });
    console.log("response:", response);
  }
  return (
    <Card className="mx-auto max-w-sm min-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">登录</CardTitle>
        <CardDescription>在下方输入您的账户邮箱进行登录</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户名</FormLabel>
                  <FormControl>
                    <Input autoComplete={""} placeholder="用户名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <PasswordInput
                      autoComplete={""}
                      placeholder="用户名"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={"flex flex-col gap-4 mt-2"}>
              <Button loading={loginLoading} type="submit" className="w-full ">
                登录
              </Button>
              <Button variant="outline" className="w-full">
                谷歌登录
              </Button>
            </div>
          </form>
        </Form>
        {/*<div className="grid gap-4">*/}
        {/*  <div className="grid gap-2">*/}
        {/*    <Label htmlFor="email">邮箱</Label>*/}
        {/*    <Input*/}
        {/*      id="email"*/}
        {/*      type="email"*/}
        {/*      placeholder="m@example.com"*/}
        {/*      required*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <div className="grid gap-2">*/}
        {/*    <div className="flex items-center">*/}
        {/*      <Label htmlFor="password">密码</Label>*/}
        {/*      <a href="#" className="ml-auto inline-block text-sm underline">*/}
        {/*        Forgot your password?*/}
        {/*      </a>*/}
        {/*    </div>*/}
        {/*    <Input id="password" type="password" required />*/}
        {/*  </div>*/}
        {/*  <Button type="submit" className="w-full">*/}
        {/*    登录*/}
        {/*  </Button>*/}
        {/*  <Button variant="outline" className="w-full">*/}
        {/*    谷歌登录*/}
        {/*  </Button>*/}
        {/*</div>*/}
        <div className="mt-4 text-center text-sm">
          还没有账号?去{" "}
          <a href="#" className="underline">
            注册
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
