import { useEffect, useState } from "react";
import { ErrorSchema, isArray, SchemaValidators } from "@zhixin/json_schema";
import { match, P } from "ts-pattern";

interface ValidateSchemaContentProps {
  content: Array<Record<string, any>> | Record<string, any>;
}
const ValidateSchemaContent = (props: ValidateSchemaContentProps) => {
  const { content } = props;
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [errors, setErrors] = useState<Array<string | ErrorSchema>>([]);

  useEffect(() => {
    setIsValidating(true);
    setErrors([]);
    SchemaValidators.asyncGetAllErrors(
      isArray(content) ? content : [content],
    ).then((result) => {
      console.log("ERROR:", result);
    });
    SchemaValidators.asyncValidateAll(isArray(content) ? content : [content])
      .then((result) => {
        setErrors(result);
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
    <div className={"flex p-2 flex-col gap-2"}>
      {errors.map((err, index) => {
        return (
          <div key={index}>
            {match(err)
              .with(P.string, (reason) => (
                <div className={"p-2 border"}>{reason}</div>
              ))
              .otherwise((_error) => {
                return (
                  <div className={"flex p-2 border"}>
                    <div className={"w-[200px] font-bold text-blue-600"}>
                      <div>id:</div>
                      <div>property:</div>
                      <div>reason:</div>
                    </div>
                    <div className={"flex-1"}>
                      <div>{_error.id}</div>
                      <div>{_error.property}</div>
                      <div>{_error.reason}</div>
                      {_error.objectErrors && (
                        <div className={"p-2 border border-primary"}>
                          {JSON.stringify(_error.objectErrors)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};
export default ValidateSchemaContent;
