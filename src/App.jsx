import { Layout, Menu } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import Todos from "./pages/Todos";
import AddTodo from "./pages/AddTodo";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/todos">Todos</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/add-todo">Add Todo</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
          <Routes>
            <Route path="/todos" element={<Todos />} />
            <Route path="/add-todo" element={<AddTodo />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
