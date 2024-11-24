import React, { useState } from 'react';

// Define a type for the workout data
type Workout = {
  id: number; // Assuming there's an ID returned from the API
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  date: string;
};

export default function WorkoutLog() {
  const [workouts, setWorkouts] = useState<Workout[]>([]); // Specify the type for workouts
  const [formData, setFormData] = useState({
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(''); // Specify the type for error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Specify the event type
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          member_id: 1, // You would typically get this from user context/auth
          date: formData.date,
          exercise: formData.exercise,
          sets: parseInt(formData.sets),
          reps: parseInt(formData.reps),
          weight: parseFloat(formData.weight)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save workout');
      }

      const savedWorkout: Workout = await response.json(); // Specify the type for savedWorkout
      setWorkouts([...workouts, savedWorkout]);
      setFormData({
        exercise: '',
        sets: '',
        reps: '',
        weight: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e : any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Main Form Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Workout Log</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exercise Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exercise Name
              </label>
              <input
                type="text"
                name="exercise"
                value={formData.exercise}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>

            {/* Sets */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sets
              </label>
              <input
                type="number"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>

            {/* Reps */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reps
              </label>
              <input
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>

            {/* Weight */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (lbs)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-medium transition duration-200 
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {loading ? 'Saving...' : 'Log Workout'}
          </button>
        </form>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-1">
              <h3 className="text-green-800 font-medium">Success!</h3>
              <p className="text-green-700 text-sm">
                Workout has been logged successfully.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Workouts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Workouts</h2>
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-gray-50 rounded-lg shadow p-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Exercise</p>
                  <p className="font-medium text-gray-900">{workout.exercise}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">{workout.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sets</p>
                  <p className="font-medium text-gray-900">{workout.sets}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reps</p>
                  <p className="font-medium text-gray-900">{workout.reps}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-medium text-gray-900">{workout.weight} lbs</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}