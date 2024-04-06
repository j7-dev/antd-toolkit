import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
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
					<Form.Item name="skills" label="skills" initialValue={['javascript', 'php', 'react']}>
					<Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      options={[
				{ label: 'JavaScript', value: 'javascript' },
				{ label: 'PHP', value: 'php' },
				{ label: 'React', value: 'react' },
				{ label: 'Vue', value: 'vue'},
				{ label: 'Angular', value: 'angular'},
				{ label: 'NodeJS', value: 'nodejs'},
				{ label: 'Python', value: 'python'},
				{ label: 'Rust', value: 'rust'},
				{ label: 'Go', value: 'go'},
				{ label: 'C', value: 'c'},
				{ label: 'C++', value: 'c++'},
				{ label: 'C#', value: 'c#'},
				{ label: 'Java', value: 'java'},
				{ label: 'CSS', value: 'css'},
				{ label: 'HTML', value: 'html'},
				{ label: 'SQL', value: 'sql'},
				{ label: 'MongoDB', value: 'mongodb'},
				{ label: 'SCSS', value: 'scss'},
				{ label: 'Jest', value: 'jest'},
			]}
    />
          </Form.Item>

          <Button htmlType="submit" type="primary">
            篩選
          </Button>
        </Form>
      </div>

      <FilterTags form={form} key={key} booleanKeys={['isActive']} />
    </>
  );
};

export default StoryForm;
