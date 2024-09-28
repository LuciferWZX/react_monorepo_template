import { Button, Space } from "antd";
import { Panel } from "@xyflow/react";
import { FlowManager } from "@/managers";

const Test = () => {
  return (
    <Panel>
      <Space>
        <Button
          onClick={async () => {
            const forms = Array.from(FlowManager.shared.forms);
            console.log(111, forms);
            for (let i = 0; i < forms.length; i++) {
              const form = forms[i][1];
              form.validateFields();
            }
          }}
        >
          校验
        </Button>
      </Space>
    </Panel>
  );
};
export default Test;
