import {
  SlateRichEditor,
  MentionSelectItemType,
  SlateRichEditorRef,
  EditorManager,
} from "./core";
import { useRef, useState } from "react";

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useRef<SlateRichEditorRef>(null);
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
      <div
        ref={ref.current?.setReference}
        className={
          "focus-within:outline focus-within:outline-primary  flex-shrink-0 flex p-2"
        }
        {...ref.current?.getReferenceProps()}
      >
        <SlateRichEditor
          ref={ref}
          className={"outline-none flex-1"}
          value={[
            {
              type: "paragraph",
              children: [
                {
                  text: "1234",
                },
                {
                  type: "mention",
                  label: "关键词3",
                  trigger: "@",
                  value: "00000000003",
                  children: [
                    {
                      text: "关键词3",
                    },
                  ],
                },
                {
                  text: "3456",
                },
                {
                  type: "mention",
                  label: "文档13",
                  trigger: "@",
                  value: "awdsadewafe",
                  children: [
                    {
                      text: "文档13",
                    },
                  ],
                },
                {
                  text: "",
                },
              ],
            },
          ]}
          hotKey={{
            switchLine: "mod+Enter",
          }}
          onValueChange={(value) => {
            // const str = EditorManager.serialize(value, "html");
            // const dv = EditorManager.deserialize(str);
          }}
          mention={{
            enable: true,
            loading: loading,
            // check: {
            //   enable: enable,
            //   fetch: async (id: string) => {
            //     console.log("id", id);
            //     return new Promise((resolve) => {
            //       setTimeout(() => {
            //         if (id === "00000000003") {
            //           resolve(undefined);
            //         }
            //         resolve(id + "001");
            //       }, 1000);
            //     });
            //   },
            // },
            // loadingNode: <div>xx</div>,
            data: [
              {
                trigger: "@",
                allowSearchAll: true,
                mentions: (searchText) => {
                  console.log(11111, searchText);
                  setLoading(true);
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(mentions);
                      setLoading(false);
                    }, 1000);
                  });
                },
              },
              { trigger: "#", mentions: mentions2 },
            ],
          }}
          placeholder={"请输入"}
        />
        <button
          onClick={() => {
            // setEnable(!enable)
            console.log(ref.current?.editorValue);
          }}
        >
          发送
        </button>
      </div>
    </div>
  );
};
export default App;
