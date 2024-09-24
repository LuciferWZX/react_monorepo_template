import {
  Button,
  Input,
  Form,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  FormControl,
} from "@zhixin/shadcn_lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import useLogin from "@/pages/auth/login/useLogin.ts";
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "用户名至少2个字符",
  }),
  password: z.string().min(1, {
    message: "密码必填",
  }),
});
const LoginPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { login } = useLogin();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const response = await login({
      username: data.username,
      password: data.password,
    });
  }

  return (
    <div className="w-full h-full lg:grid lg:grid-cols-2 ">
      <div className="flex h-full items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">登录</h1>
            <p className="text-balance text-muted-foreground">
              在下方输入您的用户名来登录您的账号
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              // className="space-y-8"
            >
              <FormField
                name={"username"}
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>用户名</FormLabel>
                      <FormControl>
                        <Input placeholder="用户名" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name={"password"}
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>密码</FormLabel>
                        <a className="ml-auto inline-block text-sm underline cursor-pointer hover:text-primary">
                          忘记密码？
                        </a>
                      </div>
                      <FormControl>
                        <Input
                          type={"password"}
                          placeholder="密码"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </form>
          </Form>
          <div className="grid gap-4">
            <Button
              onClick={() => form.handleSubmit(onSubmit)()}
              className="w-full"
            >
              登录
            </Button>
            <Button variant="outline" className="w-full">
              使用谷歌登录
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            还没有账号?{" "}
            <a className="underline cursor-pointer  hover:text-primary">注册</a>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block overflow-hidden">
        <img
          src="/images/river.jpg"
          alt="Image"
          className="pointer-events-none select-none h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
export default LoginPage;
