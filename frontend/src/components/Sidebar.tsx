import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <h2 className="text-lg font-bold p-4">Fitness Management System</h2>
      <ul>
        <li><Link to="/member/dashboard">Dashboard</Link></li>
        <li><Link to="/member/profile">Profile</Link></li>
        <li><Link to="/member/book-session">Book Session</Link></li>
        <li><Link to="/member/workout-logs">Workout Logs</Link></li>
        <li><Link to="/member/diet-plan">Diet Plan</Link></li>
        <li><Link to="/member/payments">Payments</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar; 