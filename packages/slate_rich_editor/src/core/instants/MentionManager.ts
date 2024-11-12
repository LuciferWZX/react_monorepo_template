import { MentionItemType, MentionSelectItemType } from "../editor";
import { match, P } from "ts-pattern";
import { flatMap } from "es-toolkit";

export class MentionManager {
  private static mentions: MentionSelectItemType[] = [];
  public static shared = new MentionManager();
  public static setMentions(newMentions: MentionSelectItemType[]) {
    this.mentions = newMentions;
  }
  public static getFirstMention() {
    const flatArray = (
      flatMap(
        this.mentions.filter((item) => !item.disabled),
        (mention) =>
          match(mention)
            .with({ children: P.not(undefined) }, (mention) => [
              ...mention.children,
            ])
            .otherwise((mention) => mention),
      ) as MentionItemType[]
    ).filter((item) => !item.disabled);
    const len = flatArray.length;
    return len === 0 ? undefined : flatArray[0];
  }
  public static arrow(mode: "down" | "up", currentValue: string) {
    const flatArray = (
      flatMap(
        this.mentions.filter((item) => !item.disabled),
        (mention) =>
          match(mention)
            .with({ children: P.not(undefined) }, (mention) => [
              ...mention.children,
            ])
            .otherwise((mention) => mention),
      ) as MentionItemType[]
    ).filter((item) => !item.disabled);

    const targetIndex = flatArray.findIndex(
      (item) => item.value === currentValue,
    );
    const len = flatArray.length;
    let nextIndex: number = 0;
    match(mode)
      .with("down", () => {
        if (targetIndex < len - 1) {
          nextIndex = targetIndex + 1;
        } else {
          nextIndex = 0;
        }
      })
      .otherwise(() => {
        if (targetIndex > 0) {
          nextIndex = targetIndex - 1;
        } else {
          nextIndex = len - 1;
        }
      });
    return flatArray[nextIndex];
  }
  public static getMentionItem(value: string) {
    const flatArray = flatMap(
      this.mentions.filter((item) => !item.disabled),
      (mention) =>
        match(mention)
          .with({ children: P.not(undefined) }, (mention) => [
            ...mention.children,
          ])
          .otherwise((mention) => mention),
    ) as MentionItemType[];
    return flatArray.find((item) => item.value === value);
  }
}
