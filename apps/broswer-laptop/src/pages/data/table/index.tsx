import TableSidebar from "@/pages/data/table/side-bar.tsx";
import TableContent from "@/pages/data/table/content.tsx";

const DataTablePage = () => {
  return (
    <div className={"h-full overflow-auto relative flex"}>
      <div className={"flex-shrink w-64"}>
        <TableSidebar />
      </div>
      <div className={"flex-1 overflow-auto"}>
        <TableContent />
      </div>
    </div>
  );
};
export default DataTablePage;
