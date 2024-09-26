// import { useWorkspaceStore } from "@/stores";
// import { useShallow } from "zustand/react/shallow";
// import { useEffect } from "react";
//
// const useBuilderId = () => {
//   const [buildId,workIds] = useWorkspaceStore(
//     useShallow((state) => {
//         const ids = Array.from(state.worksMap.keys());
//       return [state.builderId,ids];
//     }),
//   );
//   useEffect(() => {
//     console.log(123, buildId);
//     if (workIds.includes(buildId)) {
//       const ids = Array.from(useWorkspaceStore.getState().worksMap.keys());
//       console.log(123333, ids);
//       if (ids.length > 0) {
//         useWorkspaceStore.setState({
//           builderId: ids[0],
//         });
//       }
//     }
//   }, [workIds]);
// };
// export default useBuilderId;
