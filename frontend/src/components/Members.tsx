import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, MapPin, Phone, Mail, Check, X } from 'lucide-react';

type MemberEntry = {
  Member_ID: number;
  Name: string;
  Address: string;
  Phone: string;
  Email: string;
  Membership_Status: 'Active' | 'Inactive';
};

const Members = () => {
  const [members, setMembers] = useState<MemberEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const dummyMembers: MemberEntry[] = [
    { Member_ID: 1, Name: 'John Doe', Address: '123 Main St', Phone: '123-456-7890', Email: 'john@example.com', Membership_Status: 'Active' },
    { Member_ID: 2, Name: 'Jane Smith', Address: '456 Elm St', Phone: '987-654-3210', Email: 'jane@example.com', Membership_Status: 'Inactive' },
    { Member_ID: 3, Name: 'Alice Johnson', Address: '789 Oak St', Phone: '555-555-5555', Email: 'alice@example.com', Membership_Status: 'Active' },
  ];

  const fetchMembers = async () => {
    try {
      setLoading(true);
      // const response = await axios.get('/api/members');
      setMembers(dummyMembers);
      // setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Users className="h-10 w-10 text-indigo-600" />
            Gym Members
          </h1>
          <p className="mt-2 text-gray-600">Manage and view all gym member information</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : members.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Member</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contact Info</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Address</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {members.map((member) => (
                    <tr key={member.Member_ID} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium">
                              {member.Name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{member.Name}</div>
                            <div className="text-sm text-gray-500">ID: {member.Member_ID}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4 text-gray-400" />
                            {member.Phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4 text-gray-400" />
                            {member.Email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {member.Address}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${member.Membership_Status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'}`}>
                          {member.Membership_Status === 'Active' ? (
                            <Check className="mr-1 h-3 w-3" />
                          ) : (
                            <X className="mr-1 h-3 w-3" />
                          )}
                          {member.Membership_Status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Members Found</h3>
              <p className="text-gray-500">There are no members registered at this time.</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center">
          Total Members: {members.length} • Active: {members.filter(m => m.Membership_Status === 'Active').length} • Inactive: {members.filter(m => m.Membership_Status === 'Inactive').length}
        </div>
      </div>
    </div>
  );
};

export default Members;