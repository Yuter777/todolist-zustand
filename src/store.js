import create from "zustand";
import axios from "axios";

const useTodoStore = create((set) => ({
  todos: [],
  fetchTodos: async () => {
    const response = await axios.get("http://localhost:3000/todos");
    set({ todos: response.data });
  },
  addTodo: async (todo) => {
    const response = await axios.post("http://localhost:3000/todos", todo);
    set((state) => ({ todos: [...state.todos, response.data] }));
  },
  updateTodo: async (id, updatedTodo) => {
    await axios.put(`http://localhost:3000/todos/${id}`, updatedTodo);
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
    }));
  },
  deleteTodo: async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
}));

export default useTodoStore;
