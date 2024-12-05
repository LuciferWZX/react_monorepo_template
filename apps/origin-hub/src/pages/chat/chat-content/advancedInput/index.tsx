import {
  Descendant,
  EditorManager,
  SlateRichEditor,
  SlateRichEditorRef,
} from "@zhixin/slate_rich_editor";
import { BaseUser } from "@/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { cn } from "@/lib/utils.ts";
import { useMemo, useRef, useState } from "react";
import WKSDK, { Conversation, MessageText } from "wukongimjssdk";
interface AdvancedInputProps {
  placeholder?: string;
  users: BaseUser[];
  disabled?: boolean;
  conversation: Conversation;
}
const AdvancedInput = (props: AdvancedInputProps) => {
  const { placeholder, disabled, users, conversation } = props;
  const [value, setValue] = useState<Descendant[]>([]);
  const editorRef = useRef<SlateRichEditorRef>(null);
  const mergedDisabled = useMemo(() => {
    return disabled;
  }, [disabled]);
  const mergedButtonDisabled = useMemo(() => {
    if (mergedDisabled) {
      return true;
    }
    const text = EditorManager.getText(value, true);
    return !text.trim();
  }, [mergedDisabled, value]);
  const sendTextMessage = (_value: Descendant[]) => {
    if (!editorRef.current) {
      throw new Error("editor 不存在");
    }
    /**
     * 获取html字符串
     */
    const html = EditorManager.getHtml(_value);
    /**
     * 获取提及的人
     */
    const mentions = EditorManager.getNodesByType(
      editorRef.current.editor,
      "mention",
    );
    const messageText = new MessageText();
    messageText.text = html;
    if (mentions.length > 0) {
      const allMentionElement = mentions.find(
        (mention) => mention.value === "all",
      );
      messageText.mention = {
        all: !!allMentionElement,
        uids: mentions.map((mention) => mention.value),
      };
    }
    WKSDK.shared().chatManager.send(messageText, conversation.channel).then();
    EditorManager.clear(editorRef.current.editor);
    console.log("[发送的message]:", messageText);
    setValue([]);
  };
  return (
    <SlateRichEditor
      ref={editorRef}
      disabled={mergedDisabled}
      mention={{
        enable: true,
        data: [
          {
            trigger: "@",
            allowSearchAll: true,
            mentions: [
              {
                label: "会话内成员",
                value: "member",
                key: "member",
                labelClassName: "text-xs text-muted-foreground",
                children: users.map((user) => {
                  return {
                    label: user.username,
                    value: user.id,
                    key: user.id,
                    activeClassName: "bg-primary/20",
                    render: (
                      <div
                        className={
                          "w-full px-2 py-1 flex  text-sm items-center gap-2"
                        }
                      >
                        <Avatar className="h-6 w-6 rounded-full">
                          <AvatarImage
                            src={user.avatar ?? undefined}
                            alt={user.username}
                          />
                          <AvatarFallback className="rounded-lg">
                            CN
                          </AvatarFallback>
                        </Avatar>
                        {user.nickname}
                        <Separator
                          className={"h-3 w-[1px] bg-muted-foreground"}
                          orientation={"vertical"}
                        />
                        <span className={"text-muted-foreground text-xs"}>
                          {user.username}
                        </span>
                      </div>
                    ),
                  };
                }),
              },
            ],
          },
        ],
        classes: {
          menu: "border-birder z-50 overflow-hidden rounded-lg border bg-popover p-2 text-popover-foreground shadow-lg shadow-black/5 ",
        },
      }}
      hotKey={{
        switchLine: "mod+Enter",
        onConfirm: (_value) => {
          if (!mergedButtonDisabled) {
            sendTextMessage(_value);
          }
        },
      }}
      className={"outline-none break-all"}
      onValueChange={(value) => {
        setValue(value);
      }}
      placeholder={placeholder}
      uiRender={(core) => {
        return (
          <div
            className={cn(
              "flex items-center outline-primary rounded-lg has-[:focus]:outline border p-2 pl-3 ",
              {
                "cursor-not-allowed bg-muted": mergedDisabled,
              },
            )}
          >
            <div className={"flex-1 pr-1"}>
              <ScrollArea
                type={"always"}
                className={"pr-1"}
                classes={{ viewport: "max-h-40" }}
              >
                {core}
              </ScrollArea>
            </div>
            <div className={"self-end"}>
              <Button
                variant="default"
                size="icon"
                className={"h-8 w-8"}
                aria-label="Send message"
                disabled={mergedButtonDisabled}
                onClick={() => sendTextMessage(value)}
              >
                <Send size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>
          </div>
        );
      }}
    />
  );
};
export default AdvancedInput;
