import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@zhixin/shadcn_lib";
import { APPManager } from "@/managers";
interface LogoutDialogProps {
  open?: boolean;
  onOpenChange?: (_open: boolean) => void;
}
const LogoutDialog = (props: LogoutDialogProps) => {
  const { open, onOpenChange } = props;
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>你确定要退出登录吗?</AlertDialogTitle>
          <AlertDialogDescription>
            退出登录将确保您的账户安全，并且您的个人信息将不再被访问。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={() => {
              APPManager.shared.shutdown();
            }}
          >
            确定
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default LogoutDialog;
