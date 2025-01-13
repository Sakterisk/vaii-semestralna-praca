<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        if (!auth()->user() && !auth()->user()->id === 1) {
            return response()->json('Unauthorized');
        }
        $request->validate([
            'header' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:1024'],
            'link' => ['required', 'string', 'max:255'],
        ]);
        $project = new Project;
        $project->header = $request->header;
        $project->content = $request->content;
        $project->link = $request->link;
        $project->save();
        return response()->json('Project added successfully');
    }

    public function show($id)
    {
        if (!auth()->user() && !auth()->user()->id === 1) {
            return response()->json('Unauthorized');
        }
        $project = Project::find($id);
        if (!$project) {
            return response()->json('Project not found');
        }
        return response()->json($project);
    }

    public function update(Request $request, $id)
    {
        if (!auth()->user() && !auth()->user()->id === 1) {
            return response()->json('Unauthorized');
        }
        $project = Project::find($id);
        if (!$project) {
            return response()->json('Project not found');
        }
        $request->validate([
            'header' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:1024'],
            'link' => ['required', 'string', 'max:255'],
        ]);
        $project->header = $request->header;
        $project->content = $request->content;
        $project->link = $request->link;
        $project->save();
        return response()->json('Project updated successfully');
    }

    public function destroy($id)
    {
        if (!auth()->user() && !auth()->user()->id === 1) {
            return response()->json('Unauthorized');
        }
        $project = Project::find($id);
        if (!$project) {
            return response()->json('Project not found');
        }
        $project->delete();
        return response()->json('Project deleted successfully');
    }
}
