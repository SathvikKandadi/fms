import axios from "axios";
import { useEffect, useState } from "react";

interface Member {
    address?: string;
    email: string;
    member_id: number;
    membership_status: 'Active' | 'Inactive';
    name: string;
    phone?: string;
   
    
}

const member : Member  = JSON.parse(localStorage.getItem('member') || "{}") || {
    memberId: 0,
    name: 'John Doe',
    address: '123 Main St',
    phone: '555-555-5555',
    email: 'john.doe@example.com',
    membershipStatus: 'Inactive',
};




const MemberProfile = () => {

    const [user , setUser] = useState<Member>();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3000/api/v1");
            console.log(response.data);
            setUser(response.data[0]);
        }
        fetchData();
    },[])

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Member Profile</h1>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="space-y-4">
                        <p className="text-lg font-semibold">
                            <span className="font-medium">ID:</span> {user?.member_id || "1"}
                        </p>
                        <p className="text-lg font-semibold">
                            <span className="font-medium">Name:</span> {user?.name || "John Doe"}
                        </p>
                        <p className="text-lg font-semibold">
                            <span className="font-medium">Address:</span> {user?.address || '123 Maple St'}
                        </p>
                        <p className="text-lg font-semibold">
                            <span className="font-medium">Phone:</span> {user?.phone || '9876543210'}
                        </p>
                        <p className="text-lg font-semibold">
                            <span className="font-medium">Email:</span> {user?.email || 'john@example.com'}
                        </p>
                        <p className="text-lg font-semibold">
                            <span className="font-medium">Membership Status:</span> {user?.membership_status || 'Active'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberProfile;
