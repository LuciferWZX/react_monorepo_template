import {
  Button,
  Input,
  Form,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  FormControl,
  SToast,
} from "@zhixin/shadcn_lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import useLogin from "@/pages/auth/login/useLogin.ts";
import { APP_STORAGE_KEY, ResponseCode } from "@/types";
import { LoaderCircle } from "lucide-react";
import { useAppStore } from "@/stores";
import { useNavigate } from "react-router-dom";
import { StorageManager } from "@/managers";
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
  const { login, loginLoading } = useLogin();
  const navigate = useNavigate();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await login({
      username: data.username,
      password: data.password,
    });
    if (response.code === ResponseCode.success) {
      StorageManager.shared.set(
        APP_STORAGE_KEY.token,
        response.data.access_token,
      );
      useAppStore.setState({ user: response.data });
      navigate("/", { replace: true });
      SToast.success(`欢迎 ${response.data.username} 登录`, {
        position: "top-center",
        id: "login",
      });
      return;
    }
    SToast.error(response.message, {
      position: "top-center",
      id: "login",
      duration: 1000,
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
              disabled={loginLoading}
              onClick={() => form.handleSubmit(onSubmit)()}
              className="w-full"
            >
              {loginLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
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
