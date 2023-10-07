import { useState } from "react";
import { Button, Form, Input } from "antd";
import { FilterTags } from "./index";
import { BooleanRadioButton } from "@/components/BooleanRadioButton";

const StoryForm = () => {
  const [form] = Form.useForm();
  const [key, setKey] = useState(0);

  const handleFinish = () => {
    setKey(key + 1);
  };

  return (
    <>
      <div className="rounded-xl bg-gray-100 p-8 w-[720px] mb-8">
        <p>StoryBook 用 Filter</p>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="username" label="username" initialValue="example">
            <Input />
          </Form.Item>
          <BooleanRadioButton
            formItemProps={{
              name: "isActive",
              label: "Active",
            }}
          />
          <Button htmlType="submit" type="primary">
            篩選
          </Button>
        </Form>
      </div>

      <FilterTags form={form} key={key} />
    </>
  );
};

export default StoryForm;
