import { useEffect, useState } from "react";

async function fetchTasksData(userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  const data = await response.json()
  return data
}

export default function App() {
  const [userId, setUserId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchTasksData(userId)
        .then((data) => setTasks(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    }
  }, [userId]);

  return (
    <div>
      <h1>Posts by User</h1>
      <input
        type="number"
        value={userId}
        placeholder="User ID"
        onChange={(e) => setUserId(e.target.value)}
      />

      {loading && <p>Loading...</p>}
                    
      {tasks &&  (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
            </li>
          ))}
        </ul>)}
    </div>
  )
}

//  {tasks && tasks.length > 0 &&  ( 