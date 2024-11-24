import React, { useState } from 'react';
import axios from 'axios';

export default function DietPlanForm() {
  const [plans, setPlans] = useState<{ id: number; member_id: number; trainer_id: number; plan_details: string }[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    member_id: '',
    trainer_id: '',
    plan_details: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/diet-plans', {
        member_id: parseInt(formData.member_id),
        trainer_id: parseInt(formData.trainer_id),
        plan_details: formData.plan_details
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const newPlan = response.data;
      setPlans((prevPlans) => [...prevPlans, newPlan]);
      
      // Reset form
      setFormData({
        member_id: '',
        trainer_id: '',
        plan_details: ''
      });
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (err) {
      setError('Failed to create diet plan');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
          <h1 className="text-2xl font-bold text-gray-900">Create Diet Plan</h1>
          <p className="text-gray-600 mt-2">Create a personalized diet plan for members</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Member ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member ID
              </label>
              <input
                type="number"
                name="member_id"
                value={formData.member_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>

            {/* Trainer ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trainer ID
              </label>
              <input
                type="number"
                name="trainer_id"
                value={formData.trainer_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>

            {/* Plan Details */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plan Details
              </label>
              <textarea
                name="plan_details"
                value={formData.plan_details}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                required
                disabled={loading}
                placeholder="Enter detailed diet plan including meals, portions, timing, and any specific instructions..."
              />
            </div>
          </div>

          {/* Error Message */}
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
            {loading ? 'Creating Plan...' : 'Create Diet Plan'}
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
                Diet plan has been created successfully.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Plans */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Diet Plans</h2>
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-gray-50 rounded-lg shadow p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Member ID</p>
                  <p className="font-medium text-gray-900">{plan.member_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trainer ID</p>
                  <p className="font-medium text-gray-900">{plan.trainer_id}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Plan Details</p>
                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{plan.plan_details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}