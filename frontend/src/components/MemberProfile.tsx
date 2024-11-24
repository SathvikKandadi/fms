interface Member {
    memberId: number;
    name: string;
    address?: string;
    phone?: string;
    email: string;
    membershipStatus: 'Active' | 'Inactive';
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
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Member Profile</h1>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="space-y-4">
                        <p className="text-lg font-semibold">
                            <span className="font-medium">ID:</span> {member.memberId}
                        </p>
                        <p className="text-lg font-semibold">
                            <span className="font-medium">Name:</span> {member.name}
                        </p>
                        <p className="text-lg font-semibold">
                            <span className="font-medium">Address:</span> {member.address || 'N/A'}
                        </p>
                        <p className="text-lg font-semibold">
                            <span className="font-medium">Phone:</span> {member.phone || 'N/A'}
                        </p>
                        <p className="text-lg font-semibold">
                            <span className="font-medium">Email:</span> {member.email}
                        </p>
                        <p className="text-lg font-semibold">
                            <span className="font-medium">Membership Status:</span> {member.membershipStatus}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberProfile;
