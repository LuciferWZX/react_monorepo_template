import { SlateRichEditor, MentionSelectItemType } from "./core";

const App = () => {
  const mentions: MentionSelectItemType[] = [
    {
      key: "@",
      label: "@文档",
      children: [
        { value: "00000000001", label: "关键词1", disabled: true },
        { value: "00000000002", label: "关键词2" },
        { value: "00000000003", label: "关键词3" },
        { value: "00000000004", label: "关键词4关键词4关键词4" },
        {
          value: "00000000005",
          label:
            "关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5词5关键词4关键词4关键词4关键词5关键词4关键词4关键词4关键词5",
        },
      ],
    },
    {
      key: "dd",
      label: "无敌",
      disabled: false,
      children: [
        { value: "sdwadwadwf", label: "文档1", disabled: true },
        { value: "frgvrgrege", label: "文档12", icon: <span>A</span> },
        { value: "awdsadewafe", label: "文档13" },
        { value: "wadwadwadwad", label: "文档14" },
        { value: "wadwadwadwad1", label: "文档14" },
        { value: "wadwadwadwad2", label: "文档14" },
        { value: "wadwadwadwad4", label: "文档14" },
        { value: "wadwadwadwad3", label: "文档14" },
        { value: "wadwadwadwad5", label: "文档14" },
        { value: "wadwadwadwad6", label: "文档14" },
        { value: "wadwadwadwad7", label: "文档14" },
        { value: "wadwadwadwad8", label: "文档14" },
        { value: "wadwadwadwad9", label: "文档14" },
      ],
    },
  ];
  const mentions2: MentionSelectItemType[] = [
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
