import React, { useState } from 'react';
import { Calendar, Clock, User, CreditCard } from 'lucide-react';
import axios from 'axios';

const BookSession = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);

  // This would come from your API/database
  const trainers = [
    { id: 1, name: "Sarah Smith", specialization: "Weight Training", rating: 4.8 },
    { id: 2, name: "Mike Johnson", specialization: "Cardio", rating: 4.9 },
    { id: 3, name: "Emma Davis", specialization: "Yoga", rating: 4.7 },
  ];

  // Available time slots - would be dynamic based on trainer and date selection
  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle booking submission to your backend
    try {
      const memberId = 1; // Replace with actual member ID from your context or state
      const sessionId = 1; // Replace with actual session ID based on your logic

      const response = await axios.post(`/members/${memberId}/sessions`, {
        sessionId: sessionId,
      });

      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error("Error booking session:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book a Training Session</h1>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleBooking} className="space-y-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <div className="flex items-center">
                <Calendar className="text-gray-400 mr-2" size={20} />
                <input
                  type="date"
                  className="form-input rounded-md border-gray-300 w-full"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            {/* Trainer Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Trainer
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trainers.map((trainer) => (
                  <div
                    key={trainer.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedTrainer === trainer.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-500'
                    }`}
                    onClick={() => setSelectedTrainer(trainer.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <User className="text-gray-400" size={24} />
                      <div>
                        <p className="font-medium text-gray-900">{trainer.name}</p>
                        <p className="text-sm text-gray-500">{trainer.specialization}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-yellow-500">★</span>
                          <span className="text-sm text-gray-600 ml-1">{trainer.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time Slot
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className={`flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer ${
                      selectedTime === time
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-500'
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {time}
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Summary */}
            {selectedDate && selectedTrainer && selectedTime && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Booking Summary</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Date: {new Date(selectedDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Time: {selectedTime}
                  </p>
                  <p className="text-sm text-gray-600">
                    Trainer: {trainers.find(t => t.id === selectedTrainer)?.name}
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-4">
                    Session Fee: $50.00
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <CreditCard className="mr-2" size={20} />
              Book and Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookSession;