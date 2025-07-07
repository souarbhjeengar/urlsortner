import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function UsersIndex({ users, filters, roles, companies }) {
    console.log(users);

    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');
    const [companyId, setCompanyId] = useState(filters.company_id || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), {
            search,
            role,
            company_id: companyId,
            status,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setRole('');
        setCompanyId('');
        setStatus('');
        router.get(route('admin.users.index'));
    };

    const deleteUser = (user) => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        User Management
                    </h2>
                    <Link
                        href={route('admin.users.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create User
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Filters */}
                            {/* <form onSubmit={handleSearch} className="mb-6 bg-gray-50 p-4 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Search users..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="">All Roles</option>
                                            {roles.map((r) => (
                                                <option key={r.id} value={r.name}>
                                                    {r.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            value={companyId}
                                            onChange={(e) => setCompanyId(e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="">All Companies</option>
                                            {companies.map((company) => (
                                                <option key={company.id} value={company.id}>
                                                    {company.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="">All Status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        >
                                            Search
                                        </button>
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </form> */}

                            {/* Users Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                User
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Role
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Company
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.data.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {user.roles[0]?.name || 'No Role'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {user.company?.name || 'No Company'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {user.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            href={route('admin.users.show', user.id)}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={route('admin.users.edit', user.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        {!user.roles.some(role => role.name === 'superAdmin') && (
                                                            <button
                                                                onClick={() => deleteUser(user)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {users.links && (
                                <div className="mt-6">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-700">
                                            Showing {users.from} to {users.to} of {users.total} results
                                        </div>
                                        <div className="flex space-x-1">
                                            {users.links.map((link, index) => (
                                                // <>
                                                //     {link.url}
                                                // </>
                                                <a
                                                    key={index}
                                                    href={link.url}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
