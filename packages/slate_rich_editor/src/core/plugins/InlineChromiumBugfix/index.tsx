export const InlineChromiumBugfix = () => (
  <span contentEditable={false} className={"text-0"}>
    {String.fromCodePoint(160) /* Non-breaking space */}
  </span>
);
