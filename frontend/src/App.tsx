import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemberDashboard from './components/MemberDashboard';
import TrainerDashboard from './components/TrainerDashboard';
import AdminDashboard from './components/AdminDashboard';
import MemberLogin from './components/MemberLogin';
import TrainerLogin from './components/TrainerLogin';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import HomePage from './components/HomePage';
import BookSession from './components/BookSession';
import MemberProfile from './components/MemberProfile';
import WorkoutLogs from './components/WorkoutLogs';
import DietPlan from './components/DietPlan';
import MemberPayments from './components/MemberPayments';
import TrainerSchedule from './components/TrainerSchedule';
import Members from './components/Members';
import WorkoutLog from './components/WorkoutLog';
import DietPlanForm from './components/CreatePlan';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path="login/member" element={<MemberLogin />} />
          <Route path="login/trainer" element={<TrainerLogin />} />
          <Route path="login/admin" element={<AdminLogin />} />
          <Route path="register" element={<Register />} />
        <Route path="/member/dashboard" element={<MemberDashboard />} />
        <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/member/book-session" element={<BookSession/>} />
        <Route path="/member/profile" element={<MemberProfile/>} />
        <Route path="/member/workout-logs" element={<WorkoutLogs/>}/>
        <Route path="/member/diet-plan" element={<DietPlan/>}/>
        <Route path="/member/payments" element={<MemberPayments/>} />
        <Route path="/trainer/schedule" element={<TrainerSchedule />} />
        <Route path="/trainer/members" element={<Members/>}/>
        <Route path="/trainer/workout-logs" element={<WorkoutLog/>}/>
        <Route path="/trainer/diet-plans" element={<DietPlanForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
