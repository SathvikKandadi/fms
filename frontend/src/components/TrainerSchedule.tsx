import { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, UserCircle, ArrowLeft, ArrowRight } from 'lucide-react';

type SessionEntry = {
  Session_ID: number;
  Date: string;
  Time: string;
  Trainer_ID: number | null;
};

const Sessions = () => {
  const [sessions, setSessions] = useState<SessionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const dummySessions = [
    { Session_ID: 1, Date: '2023-10-01', Time: '10:00:00', Trainer_ID: 1 },
    { Session_ID: 2, Date: '2023-10-02', Time: '11:00:00', Trainer_ID: 2 },
    { Session_ID: 3, Date: '2023-10-03', Time: '12:00:00', Trainer_ID: null },
  ];

  const fetchSessions = async () => {
    try {
      setLoading(true);
      // const response = await axios.get('/api/sessions');
      setSessions(dummySessions);
      // setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Calendar className="h-8 w-8 text-indigo-600" />
            Training Sessions
          </h1>
          <p className="mt-2 text-center text-gray-600">View and manage your upcoming training sessions</p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Previous Week
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            Next Week
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Sessions Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : sessions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Trainer</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sessions.map((session) => (
                    <tr 
                      key={session.Session_ID}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-50">
                            <Calendar className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {formatDate(session.Date)}
                            </p>
                            <p className="text-xs text-gray-500">Session #{session.Session_ID}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{formatTime(session.Time)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <UserCircle className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {session.Trainer_ID ? `Trainer ${session.Trainer_ID}` : 'Unassigned'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Sessions Found</h3>
              <p className="text-gray-500">There are no scheduled sessions at this time.</p>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Sessions</h3>
            <p className="text-2xl font-semibold text-gray-900">{sessions.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Assigned Sessions</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {sessions.filter(s => s.Trainer_ID !== null).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Unassigned Sessions</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {sessions.filter(s => s.Trainer_ID === null).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sessions;