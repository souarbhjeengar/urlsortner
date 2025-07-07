import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CreateShortUrl() {
    const { data, setData, post, processing, errors } = useForm({
        original_url: '',
        title: '',
        description: '',
        user_id: '',
        short_code: '',
        is_active: true,
        expires_at: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.short-urls.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Create Short URL
                    </h2>
                    <Link
                        href={route('admin.short-urls.index')}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Back to Short URLs
                    </Link>
                </div>
            }
        >
            <Head title="Create Short URL" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label htmlFor="original_url" className="block text-sm font-medium text-gray-700">
                                        Original URL *
                                    </label>
                                    <input
                                        id="original_url"
                                        type="url"
                                        value={data.original_url}
                                        onChange={(e) => setData('original_url', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="https://example.com"
                                        required
                                    />
                                    {errors.original_url && (
                                        <p className="mt-1 text-sm text-red-600">{errors.original_url}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title (Optional)
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Enter a title for this URL"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description (Optional)
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={3}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Enter a description for this URL"
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* <div>
                                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                                        User *
                                    </label>
                                    <select
                                        id="user_id"
                                        value={data.user_id}
                                        onChange={(e) => setData('user_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="">Select a user</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name} ({user.email})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_id && (
                                        <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>
                                    )}
                                </div> */}

                                <div>
                                    <label htmlFor="short_code" className="block text-sm font-medium text-gray-700">
                                        Custom Short Code (Optional)
                                    </label>
                                    <input
                                        id="short_code"
                                        type="text"
                                        value={data.short_code}
                                        onChange={(e) => setData('short_code', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Leave blank for auto-generated code"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        If left blank, a random code will be generated
                                    </p>
                                    {errors.short_code && (
                                        <p className="mt-1 text-sm text-red-600">{errors.short_code}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="expires_at" className="block text-sm font-medium text-gray-700">
                                        Expiration Date (Optional)
                                    </label>
                                    <input
                                        id="expires_at"
                                        type="datetime-local"
                                        value={data.expires_at}
                                        onChange={(e) => setData('expires_at', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.expires_at && (
                                        <p className="mt-1 text-sm text-red-600">{errors.expires_at}</p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                        Active URL
                                    </label>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <Link
                                        href={route('admin.short-urls.index')}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create Short URL'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
