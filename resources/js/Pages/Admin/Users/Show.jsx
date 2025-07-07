import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ShowUser({ user }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        User Details: {user.name}
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route('admin.users.edit', user.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Edit User
                        </Link>
                        <Link
                            href={route('admin.users.index')}
                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Back to Users
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`User: ${user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                                    <dl className="space-y-3">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                                            <dd className="text-sm text-gray-900">{user.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                                            <dd className="text-sm text-gray-900">{user.email}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd>
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    user.is_active 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {user.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Email Verified</dt>
                                            <dd>
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    user.email_verified_at 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {user.email_verified_at ? 'Verified' : 'Not Verified'}
                                                </span>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Created At</dt>
                                            <dd className="text-sm text-gray-900">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                {/* Role & Company Information */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Role & Company</h3>
                                    <dl className="space-y-3">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Role</dt>
                                            <dd>
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {user.roles[0]?.name || 'No Role'}
                                                </span>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Company</dt>
                                            <dd className="text-sm text-gray-900">
                                                {user.company?.name || 'No Company'}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* Permissions */}
                            {user.permissions && user.permissions.length > 0 && (
                                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Direct Permissions</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {user.permissions.map((permission) => (
                                            <span
                                                key={permission.id}
                                                className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800"
                                            >
                                                {permission.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Role Permissions */}
                            {user.roles && user.roles.length > 0 && (
                                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Role Permissions</h3>
                                    {user.roles.map((role) => (
                                        <div key={role.id} className="mb-4">
                                            <h4 className="text-md font-medium text-gray-800 mb-2">
                                                {role.name} Role Permissions:
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {role.permissions?.map((permission) => (
                                                    <span
                                                        key={permission.id}
                                                        className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800"
                                                    >
                                                        {permission.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
