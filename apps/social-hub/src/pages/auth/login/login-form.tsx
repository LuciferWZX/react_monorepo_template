import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Button,
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRequest } from "ahooks";
import { APIManager } from "@/instances";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ResponseCode, StorageKey } from "@/types";
import { useAppStore } from "@/stores";
import { useNavigate } from "react-router-dom";
import store from "storejs";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "用户名至少 2 个字符",
  }),
  password: z.string().min(1, {
    message: "请输入您的密码",
  }),
});
export function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { runAsync: login, loading: loginLoading } = useRequest(
    APIManager.authService.login,
    { manual: true },
  );
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await login({
      username: values.username,
      password: values.password,
    });
    if (response.code === ResponseCode.success) {
      store.set(StorageKey.token, response.data.access_token);
      useAppStore.setState({ user: response.data });
      navigate("/chat", { replace: true });
      toast.success(`欢迎 ${response.data.username} 回来`, {
        position: "top-center",
        id: "login",
        richColors: true,
      });
      return;
    }
    toast.error(response.message, {
      position: "top-center",
      id: "login",
      richColors: true,
    });
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">登录</CardTitle>
        <CardDescription>在下方输入您的用户名来登录您的账户</CardDescription>
      </CardHeader>
      <CardContent className={"min-w-96"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户名</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入用户名" {...field} />
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
                    <Input
                      type={"password"}
                      placeholder="请输入密码"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              // variant={"secondary"}
              disabled={loginLoading}
              className={"mt-2 w-full"}
              type="submit"
            >
              {loginLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              登录
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
