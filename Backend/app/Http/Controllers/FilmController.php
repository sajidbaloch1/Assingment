<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input('page');
        $limit = $request->input('limit');
        $films = Film::orderBy('id','asc')->paginate($limit);
        $total_count = $films->total();
        $response = [
            'data' => $films->items(),
            'total_count' => $total_count,
            'limit' => $limit,
            'length' => $page
        ];

        return response()->json($response);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $film = new Film();
        $film->name = $request->input('name');
        $film->description = $request->input('description');
        $film->photo = $request->input('photo');
        $film->genre = $request->input('genre');
        $film->release_date = $request->input('release_date');
        $film->country = $request->input('country');
        $film->ticket_price = $request->input('ticket_price');
        $film->save();

        return response()->json($film, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $film = Film::findOrFail($id);
        // Update fields
        $film->name = $request->input('name');
        $film->description = $request->input('description');
        $film->photo = $request->input('photo');
        $film->genre = $request->input('genre');
        $film->release_date = $request->input('release_date');
        $film->country = $request->input('country');
        $film->ticket_price = $request->input('ticket_price');
        // Update other fields as needed
        $film->save();

        return response()->json($film);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $film = Film::findOrFail($id);
        $film->delete();

        return response()->json(['message' => 'Film deleted']);
    }
}
