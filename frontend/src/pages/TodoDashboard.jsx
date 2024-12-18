import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoDashboard() {
  const [todoList, setTodoList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const token = localStorage.getItem("authToken");

  // Fetch todos from backend

  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      const { message, type } = location.state;
      if (type === "success") {
        toast.success(message); // Show success message
      } else {
        toast.error(message); // Handle other types if needed
      }
    }
  }, [location.state]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/todos", {
          headers: {
            Authorization: token,
          },
        });
        console.log(response);
        setTodoList(response.data); // Assuming 'todos' is an array in the response
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    };

    fetchTodos();
  }, [token]);

  // Add a new todo to backend
  const handleAddTodo = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in both title and description");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/todos",
        {
          ...formData,
          isCompleted: false, // Default value for a new todo
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTodoList((prev) => [...prev, response.data]); // Assuming the response contains the added todo
      setFormData({ title: "", description: "" }); // Clear the form
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Todo List</h1>
      {/* Add Todo Form */}
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Todo
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          rows="4"
        />
        <button
          onClick={handleAddTodo}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <div className="w-full max-w-md">
        {todoList?.length > 0 ? (
          todoList.map((todo, index) => (
            <Todo
              key={todo._id || index}
              todo={todo}
              setTodoList={setTodoList}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No todos available.</p>
        )}
      </div>
    </div>
  );
}
// eslint-disable-next-line react/prop-types
const Todo = ({ todo, setTodoList }) => {
  const handleDelete = async (id) => {
    try {
      console.log("Deleting todo with ID:", id);
      const response = await axios.delete(
        `http://localhost:3000/api/todos/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`, // Include token if required
          },
        }
      );
      console.log(response.data.message);

      // Update the UI by removing the deleted todo from the list
      setTodoList((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
      alert("Failed to delete the todo. Please try again.");
    }
  };
  const onToggleDone = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };
  return (
    <div
      className={`flex justify-between  px-4 py-4 mb-4 border rounded-md ${
        todo.isCompleted ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex flex-col w-3/4 ">
        <h3
          className={`text-lg font-semibold ${
            todo.isCompleted ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {todo.title}
        </h3>
        <p
          className={`text-gray-700 ${
            todo.isCompleted ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.description}
        </p>
      </div>
      <div className="flex space-x-2 mt-4 w-1/4">
        <button
          className={`px-2 h-12 py-1 text-sm rounded-md focus:outline-none ${
            todo.isCompleted
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
          onClick={() => onToggleDone(todo._id)}
        >
          {todo.isCompleted ? "Undo" : "Mark Done"}
        </button>
        <button
          onClick={() => handleDelete(todo._id)}
          className="px-2 py-1 h-12 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoDashboard;
