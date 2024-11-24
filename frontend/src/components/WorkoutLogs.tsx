import { useEffect, useState } from 'react';
import axios from 'axios';

// Define a type for the log entries
type LogEntry = {
  Member_Id: number;
  Date: string;
  Exercise: string;
  Sets: number;
  Reps: number;
  Weight: number;
};

const WorkoutLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const dummyLogs = [
    { Member_Id: 1, Date: '2023-10-01', Exercise: 'Bench Press', Sets: 3, Reps: 10, Weight: 150 },
    { Member_Id: 2, Date: '2023-10-02', Exercise: 'Squats', Sets: 4, Reps: 8, Weight: 200 },
    { Member_Id: 3, Date: '2023-10-03', Exercise: 'Deadlift', Sets: 3, Reps: 5, Weight: 250 },
  ];

  // Fetch workout logs from the backend API
  const fetchWorkoutLogs = async () => {
    try {
    //   const response = await axios.get('/api/workout-logs'); // Adjust the endpoint as necessary
        setLogs(dummyLogs);
    //   setLogs(response.data);
    } catch (error) {
      console.error("Error fetching workout logs:", error);
    }
  };

  useEffect(() => {
    fetchWorkoutLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Workout Logs</h1>
      <div className="overflow-x-auto max-w-7xl mx-auto px-4 py-6 bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-3 px-6 text-sm font-semibold uppercase">Date</th>
              <th className="py-3 px-6 text-sm font-semibold uppercase">Exercise</th>
              <th className="py-3 px-6 text-sm font-semibold uppercase">Sets</th>
              <th className="py-3 px-6 text-sm font-semibold uppercase">Reps</th>
              <th className="py-3 px-6 text-sm font-semibold uppercase">Weight (lbs)</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log: LogEntry, index) => (
                <tr key={log.Member_Id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                  <td className="py-4 px-6 text-sm text-gray-700">{log.Date}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{log.Exercise}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{log.Sets}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{log.Reps}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{log.Weight}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 px-6 text-center text-sm text-gray-500">No workout logs available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutLogs;
