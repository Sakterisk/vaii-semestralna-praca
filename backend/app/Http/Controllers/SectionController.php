<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Section;

class SectionController extends Controller
{
    public function index()
    {
        $sections = Section::all();
        return response()->json($sections);
    }

    public function store(Request $request)
    {
        if (!auth()->user() && !auth()->user()->id === 1) {
            return response()->json('Unauthorized');
        }
        $request->validate([
            'header' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:1024'],
        ]);
        $section = new Section;
        $section->header = $request->header;
        $section->content = $request->content;
        $section->save();
        return response()->json('Section added successfully');
    }

    public function show($id)
    {
        if (!auth()->user() && !auth()->user()->id === 1) {
            return response()->json('Unauthorized');
        }
        $section = Section::find($id);
        if (!$section) {
            return response()->json('Section not found');
        }
        return response()->json($section);
    }

    public function update(Request $request, $id)
    {
        if (!auth()->user() && !auth()->user()->id === 1) {
            return response()->json('Unauthorized');
        }
        $section = Section::find($id);
        if (!$section) {
            return response()->json('Section not found');
        }
        $request->validate([
            'header' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:1024'],
        ]);
        $section->header = $request->header;
        $section->content = $request->content;
        $section->save();
        return response()->json('Section updated successfully');
    }

    public function destroy($id)
    {
        if (!auth()->user() && !auth()->user()->id === 1) {
            return response()->json('Unauthorized');
        }
        $section = Section::find($id);
        if (!$section) {
            return response()->json('Section not found');
        }
        $section->delete();
        return response()->json('Section deleted successfully');
    }
}
