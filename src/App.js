import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_TODO_API_BASE_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueDate_, setDueDate_] = useState("");

  const retrieveTasks = async () => {
    try {
      const { data } = await axios.post(`${apiBaseUrl}/tasks`, { userId: 3 });
      setTasks(data);
    } catch (error) {
      console.log("🚀 ~ file: App.js:15 ~ retrieveTasks ~ error:", error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post(`${apiBaseUrl}/task`, {
        name,
        description,
        dueDate,
        status: "NOT_COMPLETED",
        userId: 3,
      });
      retrieveTasks();
    } catch (error) {
      console.log("🚀 ~ file: App.js:33 ~ addTask ~ error:", error);
    }
  };

  useEffect(() => {
    retrieveTasks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h3>Todo List</h3>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter a new task"
            id="new-task"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={dueDate_}
            onChange={(e) => {
              setDueDate(e.target.valueAsDate);
              setDueDate_(e.target.value);
            }}
          />
          <button onClick={() => addTask()}>Add Task</button>
        </div>
        <div>
          <h5>Tasks</h5>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.status.replace("_", " ").toLowerCase()}</td>
                  <td>{task.dueDate}</td>
                  <td>
                    {task.status === "NOT_COMPLETED" && (
                      <button>Mark as completed</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
