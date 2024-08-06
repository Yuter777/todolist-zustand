import { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import useTodoStore from "../store";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function AddTodo() {
  const [form] = Form.useForm();
  const addTodo = useTodoStore((state) => state.addTodo);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    addTodo({
      text: values.text,
      completed: false,
    });
    form.resetFields();
    navigate("/todos");
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Add Todo
      </Title>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="text"
          rules={[{ required: true, message: "Please enter todo text" }]}
        >
          <Input placeholder="Enter todo text" style={{ fontSize: "18px" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ fontSize: "18px" }}>
            Add Todo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddTodo;
