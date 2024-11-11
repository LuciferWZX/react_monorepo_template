import { SlateRichEditor, MentionItemType } from "./core";

const App = () => {
  const mentions: MentionItemType[] = [
    { value: "00000000001", label: "关键词1" },
    { value: "00000000002", label: "关键词2" },
    { value: "00000000003", label: "关键词3" },
    { value: "00000000004", label: "关键词4关键词4关键词4" },
    {
      value: "00000000005",
      label:
        "关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5",
    },
  ];
  const mentions2: MentionItemType[] = [
    { value: "00000000001", label: "关键词11" },
    { value: "00000000002", label: "关键词22" },
    { value: "00000000003", label: "关键词33" },
    { value: "00000000004", label: "关键词4关键词4关键词43" },
    {
      value: "00000000005",
      label:
        "关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词55",
    },
  ];
  return (
    <div className={"h-screen flex flex-col p-10"}>
      <div className={"flex-1"}></div>
      <div className={"flex-shrink-0"}>
        <SlateRichEditor
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
            data: [
              { trigger: "@", allowSearchAll: true, mentions: mentions },
              { trigger: "#", mentions: mentions2 },
            ],
          }}
          placeholder={"请输入"}
        />
      </div>
    </div>
  );
};
export default App;
