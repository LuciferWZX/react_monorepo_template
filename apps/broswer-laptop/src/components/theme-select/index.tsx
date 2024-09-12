import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useTheme,
} from "@zhixin/shadcn_lib";
import { MonitorCog, Sun, SunMoon } from "lucide-react";

export const ThemeSelect = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="请选择主题" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            value="system"
            icon={<MonitorCog className={"w-4 h-4"} />}
          >
            跟随系统
          </SelectItem>
          <SelectItem icon={<Sun className={"w-4 h-4"} />} value="light">
            亮色模式
          </SelectItem>
          <SelectItem icon={<SunMoon className={"w-4 h-4"} />} value="dark">
            暗色模式
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
