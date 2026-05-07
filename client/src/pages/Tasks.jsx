import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task created successfully");

      fetchTasks();

      setFormData({
        title: "",
        description: "",
        status: "Pending",
        dueDate: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8">
          Tasks
        </h1>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <form
            onSubmit={handleSubmit}
            className="grid gap-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              className="border p-3 rounded"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              className="border p-3 rounded"
              value={formData.description}
              onChange={handleChange}
            />

            <select
              name="status"
              className="border p-3 rounded"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <input
              type="date"
              name="dueDate"
              className="border p-3 rounded"
              value={formData.dueDate}
              onChange={handleChange}
            />

            <button className="bg-blue-600 text-white p-3 rounded">
              Create Task
            </button>
          </form>
        </div>

        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-5 rounded-lg shadow"
            >
              <h2 className="text-xl font-bold">
                {task.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {task.description}
              </p>

              <div className="flex gap-4 mt-4">
                <span className="bg-gray-200 px-3 py-1 rounded">
                  {task.status}
                </span>

                <span className="bg-red-100 px-3 py-1 rounded">
                  {task.dueDate?.slice(0, 10)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tasks;