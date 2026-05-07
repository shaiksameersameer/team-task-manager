import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">
              Total Tasks
            </h2>

            <p className="text-3xl mt-4">
              {stats.totalTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">
              Completed
            </h2>

            <p className="text-3xl mt-4">
              {stats.completedTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">
              Pending
            </h2>

            <p className="text-3xl mt-4">
              {stats.pendingTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">
              Overdue
            </h2>

            <p className="text-3xl mt-4">
              {stats.overdueTasks}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;