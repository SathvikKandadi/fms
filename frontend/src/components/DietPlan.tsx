import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarDays, User, UserCircle, ClipboardList } from 'lucide-react';

interface DietPlan {
  planId: number;
  memberId: number;
  trainerId: number;
  planDetails: string;
}

const DietPlan = () => {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        const response = await axios.get('/api/diet-plan');
        setDietPlan(response.data);
      } catch (error) {
        console.error('Error fetching diet plan:', error);
        setDietPlan({
          planId: 1,
          memberId: 1,
          trainerId: 1,
          planDetails: 'Sample diet plan details go here.',
        });
      }
    };
    fetchDietPlan();
  }, []);

  if (!dietPlan) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-32 bg-blue-200 rounded"></div>
          <div className="h-64 w-full max-w-2xl bg-blue-100 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-900 mb-8 flex items-center gap-3">
          <ClipboardList className="h-8 w-8 text-indigo-600" />
          Your Personalized Diet Plan
        </h1>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Stats */}
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600">
              <div className="flex items-center gap-3 text-white">
                <CalendarDays className="h-6 w-6" />
                <p className="text-lg font-medium">Plan #{dietPlan.planId}</p>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-indigo-600 to-blue-600">
              <div className="flex items-center gap-3 text-white">
                <User className="h-6 w-6" />
                <p className="text-lg font-medium">Member #{dietPlan.memberId}</p>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700">
              <div className="flex items-center gap-3 text-white">
                <UserCircle className="h-6 w-6" />
                <p className="text-lg font-medium">Trainer #{dietPlan.trainerId}</p>
              </div>
            </div>
          </div>

          {/* Plan Details */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Plan Details</h2>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {dietPlan.planDetails}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 border-t border-gray-100 p-6">
            <div className="flex gap-4 justify-end">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                Download PDF
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Share Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlan;