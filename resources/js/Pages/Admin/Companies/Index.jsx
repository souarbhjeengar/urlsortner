import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function CompaniesIndex({ companies, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.companies.index'), {
            search,
        });
    };

    const clearFilters = () => {
        setSearch('');
        router.get(route('admin.companies.index'));
    };

    const deleteCompany = (company) => {
        if (confirm(`Are you sure you want to delete ${company.name}?`)) {
            router.delete(route('admin.companies.destroy', company.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Company Management
                    </h2>
                    <Link
                        href={route('admin.companies.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create Company
                    </Link>
                </div>
            }
        >
            <Head title="Companies" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Filters */}
                            <form onSubmit={handleSearch} className="mb-6 bg-gray-50 p-4 rounded-lg">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Search companies..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                        />
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
                            </form>

                            {/* Companies Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Company
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Users Count
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Created
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {companies.data.map((company) => (
                                            <tr key={company.id}>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {company.name}
                                                        </div>
                                                        {company.description && (
                                                            <div className="text-sm text-gray-500">
                                                                {company.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {company.users_count} users
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(company.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            href={route('admin.companies.show', company.id)}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={route('admin.companies.edit', company.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteCompany(company)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {companies.links && (
                                <div className="mt-6">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-700">
                                            Showing {companies.from} to {companies.to} of {companies.total} results
                                        </div>
                                        <div className="flex space-x-1">
                                            {companies.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-2 text-sm ${
                                                        link.active
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                                    } border border-gray-300 rounded-md`}
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
