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
        $section = new Section([
            'header' => $request->get('header'),
            'content' => $request->get('content')
        ]);
        $section->save();
        return response()->json('Section added successfully');
    }

    public function show($id)
    {
        $section = Section::find($id);
        if (!$section) {
            return response()->json('Section not found');
        }
        return response()->json($section);
    }

    public function update(Request $request, $id)
    {
        $section = Section::find($id);
        if (!$section) {
            return response()->json('Section not found');
        }
        $section->header = is_null($request->get('header')) ? $section->header : $request->get('header');
        $section->content = is_null($request->get('content')) ? $section->content : $request->get('content');
        $section->save();
        return response()->json('Section updated successfully');
    }

    public function destroy($id)
    {
        $section = Section::find($id);
        if (!$section) {
            return response()->json('Section not found');
        }
        $section->delete();
        return response()->json('Section deleted successfully');
    }
}
