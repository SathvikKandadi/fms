import React, { useState } from 'react';
import axios from 'axios';
import { CreditCard, DollarSign, Calendar, User, CheckCircle, XCircle } from 'lucide-react';

export default function MemberPayments() {
  const [memberId, setMemberId] = useState(1);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async (paymentType: string) => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('/api/payments', {
        Member_ID: memberId,
        Amount: parseFloat(amount),
        Payment_Type: paymentType,
        Payment_Date: new Date().toISOString().split('T')[0],
      });
      setSuccess(true);
      setAmount('');
      console.log('Payment successful:', response.data);
    } catch (error) {
      setError('Payment failed. Please try again.');
      console.error('Error making payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center gap-3">
          <CreditCard className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Member Payments</h1>
        </div>

        {/* Member Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-700">Member Information</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Member ID
              </label>
              <input
                type="number"
                value={memberId}
                onChange={(e) => setMemberId(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Payment Date
              </label>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
                <Calendar className="h-4 w-4" />
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Membership Fee Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
              <h2 className="text-xl font-semibold text-white mb-2">Membership Fee</h2>
              <p className="text-blue-100">Regular gym membership payment</p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <button
                onClick={() => handlePayment('Membership Fee')}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  'Pay Membership Fee'
                )}
              </button>
            </div>
          </div>

          {/* Session Booking Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6">
              <h2 className="text-xl font-semibold text-white mb-2">Session Booking</h2>
              <p className="text-emerald-100">Book personal training sessions</p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <button
                onClick={() => handlePayment('Session Booking')}
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  'Pay Session Booking Fee'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mt-6 px-4 py-3 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 text-red-800">
              <XCircle className="h-5 w-5" />
              {error}
            </div>
          </div>
        )}
        {success && (
          <div className="mt-6 px-4 py-3 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              Payment processed successfully!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}