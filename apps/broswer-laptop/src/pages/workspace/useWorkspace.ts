import { useRequest } from "ahooks";
import { APIManager } from "@/managers";
import { ResponseCode } from "@/types";
import { useWorkspaceStore } from "@/stores";

const useWorkspace = () => {
  const { runAsync: getWorkspaces, loading: getWorkspacesLoading } = useRequest(
    APIManager.workspaceService.workspaces,
    {
      manual: true,
    },
  );
  const initial = async () => {
    const response = await getWorkspaces();
    if (response.code === ResponseCode.success) {
      useWorkspaceStore.setState({ workspaces: response.data });
    }
  };
  return {
    initial,
    getWorkspaces,
    getWorkspacesLoading,
  };
};
export default useWorkspace;
