import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function AdminDashboard() {
    const { auth } = usePage().props;
    const user = auth.user;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium mb-4">Welcome to Admin Panel</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h4 className="text-lg font-semibold text-blue-800">User Management</h4>
                                    <p className="text-blue-600 mt-2">Manage users, roles, and permissions</p>
                                    <a 
                                        href={route('admin.users.index')} 
                                        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Manage Users
                                    </a>
                                </div>
                                
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h4 className="text-lg font-semibold text-green-800">Companies</h4>
                                    <p className="text-green-600 mt-2">Manage company accounts</p>
                                    <a
                                        href={route('admin.companies.index')}
                                        className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    >
                                        Manage Companies
                                    </a>
                                </div>

                                {/* Only show Short URLs for admin and user roles, not superAdmin */}
                                {user.roles && !user.roles.some(role => role.name === 'superAdmin') && (
                                    <div className="bg-purple-50 p-6 rounded-lg">
                                        <h4 className="text-lg font-semibold text-purple-800">Short URLs</h4>
                                        <p className="text-purple-600 mt-2">Manage URL shortening service</p>
                                        <a
                                            href={route('admin.short-urls.index')}
                                            className="inline-block mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                                        >
                                            Manage URLs
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
