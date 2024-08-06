import { useEffect, useState } from "react";
import {
  List,
  Button,
  Typography,
  Input,
  Pagination,
  Select,
  Modal,
  Form,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  UndoOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import useTodoStore from "../store";

const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

function Todos() {
  const { todos, fetchTodos, deleteTodo, updateTodo } = useTodoStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingTodo, setEditingTodo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsModalVisible(true);
    form.setFieldsValue(todo);
  };

  const handleUpdate = (values) => {
    updateTodo(editingTodo.id, { ...editingTodo, ...values });
    setIsModalVisible(false);
  };

  const showDeleteConfirm = (todoId) => {
    confirm({
      title: "Are you sure you want to delete this todo?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      onOk() {
        deleteTodo(todoId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const filteredTodos = todos
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((todo) =>
      filterStatus === "all"
        ? true
        : todo.completed === (filterStatus === "completed")
    );

  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <h1
        style={{ fontSize: "34px", marginBottom: "16px", textAlign: "center" }}
      >
        Todo List
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Search
          placeholder="Search todos"
          onSearch={(value) => setSearchTerm(value)}
          style={{ width: 200 }}
        />
        <Select
          defaultValue="all"
          onChange={(value) => setFilterStatus(value)}
          style={{ width: 200 }}
        >
          <Option value="all">All</Option>
          <Option value="completed">Completed</Option>
          <Option value="incomplete">Incomplete</Option>
        </Select>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={paginatedTodos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handleEdit(todo)}
              />,
              <Button
                type="link"
                icon={
                  todo.completed ? <CheckCircleOutlined /> : <UndoOutlined />
                }
                onClick={() =>
                  updateTodo(todo.id, { ...todo, completed: !todo.completed })
                }
              />,
              <Button
                type="link"
                icon={<DeleteOutlined />}
                danger
                onClick={() => showDeleteConfirm(todo.id)}
              />,
            ]}
          >
            <List.Item.Meta
              title={
                <Text
                  style={{
                    fontSize: "18px",
                    color: todo.completed ? "gray" : "black",
                  }}
                >
                  {todo.text}
                </Text>
              }
            />
          </List.Item>
        )}
      />
      <Pagination
        align="center"
        current={currentPage}
        pageSize={pageSize}
        total={filteredTodos.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: "16px", textAlign: "center" }}
        defaultPageSize={8}
      />
      <Modal
        title="Edit Todo"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item
            name="text"
            rules={[{ required: true, message: "Please enter todo text" }]}
          >
            <Input placeholder="Enter todo text" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Todo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Todos;
