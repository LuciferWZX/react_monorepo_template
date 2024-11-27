import { Separator } from "@/components/ui/separator.tsx";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import ThemeRadioGroup from "@/components/setting-dialog/ThemeRadioGroup.tsx";
import { BaseSettingProps, Theme, useTheme } from "@/components";
import ColorRadioGroup from "@/components/setting-dialog/ColorRadioGroup.tsx";
import store from "storejs";
import { ConstantManager } from "@/instances/ConstantManager.ts";
import events from "@/hooks/event_bus/events.ts";

const AppearanceSettings = (props: BaseSettingProps) => {
  const { form } = props;
  const { setTheme } = useTheme();
  return (
    <div className={"flex flex-col gap-4"}>
      <div>
        <h3 className="text-lg font-medium">界面</h3>
        <p className="text-sm text-muted-foreground">
          自定义应用的外观,自动切换白天和夜晚的主题。
        </p>
      </div>
      <Separator />
      <FormField
        control={form.control}
        name="theme"
        render={({ field }) => (
          <FormItem>
            <FormLabel>主题</FormLabel>
            <FormDescription>为您的网站设置主题</FormDescription>
            <ThemeRadioGroup
              {...field}
              onChange={(_theme) => {
                setTheme(_theme as Theme);
                field.onChange(_theme);
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>颜色</FormLabel>
            <FormDescription>为您的网站设置主题色</FormDescription>
            <ColorRadioGroup
              {...field}
              onChange={(color) => {
                store.set(ConstantManager.APP_COLOR, color);
                events.emit(ConstantManager.SWITCH_APP_COLOR, color);
                field.onChange(color);
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
export default AppearanceSettings;
