import { useEffect, useState } from "react";
import { ErrorSchema, SchemaValidators } from "@zhixin/json_schema";
import { match, P } from "ts-pattern";

interface ValidateSchemaContentProps {
  content: Record<string, any>;
}
const ValidateSchemaContent = (props: ValidateSchemaContentProps) => {
  const { content } = props;
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [error, setError] = useState<string | ErrorSchema | undefined>(
    undefined,
  );

  useEffect(() => {
    setIsValidating(true);
    setError(undefined);
    SchemaValidators.asyncValidate(content)
      .then((result) => {
        setError(result as ErrorSchema);
      })
      .catch((reason: string) => {
        setError(reason);
      })
      .finally(() => {
        setIsValidating(false);
      });
  }, [content]);
  if (isValidating) {
    return (
      <div className={"h-20 flex items-center justify-center"}>验证中...</div>
    );
  }

  return (
    <div>
      {match(error)
        .with(P.string, (reason) => reason)
        .with(undefined, () => "ok")
        .otherwise((_error) => {
          return (
            <div className={"flex p-2"}>
              <div className={"w-[200px] font-bold text-blue-600"}>
                <div>id:</div>
                <div>property:</div>
                <div>reason:</div>
              </div>
              <div className={"flex-1"}>
                <div>{_error.id}</div>
                <div>{_error.property}</div>
                <div>{_error.reason}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default ValidateSchemaContent;
