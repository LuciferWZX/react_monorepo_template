import { BaseEditor, MentionItemType } from "./core";

const App = () => {
  const mentions: MentionItemType[] = [
    { value: "00000000001", label: "关键词1" },
    { value: "00000000002", label: "关键词2" },
    { value: "00000000003", label: "关键词3" },
  ];
  return (
    <div>
      <BaseEditor
        // onChange={(value) => {
        //   console.log("onChange:", value);
        // }}
        // onValueChange={(value) => {
        //   console.log("onValueChange:", value);
        // }}
        // onSelectionChange={(selection) => {
        //   console.log("onSelectionChange:", selection);
        // }}
        mention={{
          enable: true,
          data: [{ trigger: "@", mentions: mentions }],
        }}
        placeholder={"请输入"}
      />
    </div>
  );
};
export default App;
