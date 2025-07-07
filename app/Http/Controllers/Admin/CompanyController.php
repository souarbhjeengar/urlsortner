<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function __construct()
    {
        // $this->middleware('permission:manage_companies');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Company::withCount(['users']);

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        $companies = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/Companies/Index', [
            'companies' => $companies,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Companies/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:companies,name',
            'description' => 'nullable|string|max:1000',
        ]);

        Company::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('admin.companies.index')
            ->with('success', 'Company created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        $company->load(['users']);

        return Inertia::render('Admin/Companies/Show', [
            'company' => $company,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        return Inertia::render('Admin/Companies/Edit', [
            'company' => $company,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:companies,name,' . $company->id,
            'description' => 'nullable|string|max:1000',
        ]);

        $company->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('admin.companies.index')
            ->with('success', 'Company updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        // Check if company has users
        if ($company->users()->count() > 0) {
            return redirect()->route('admin.companies.index')
                ->with('error', 'Cannot delete company with existing users.');
        }

        $company->delete();

        return redirect()->route('admin.companies.index')
            ->with('success', 'Company deleted successfully.');
    }
}
