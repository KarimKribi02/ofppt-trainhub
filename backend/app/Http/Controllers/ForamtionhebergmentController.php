<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Foramtionhebergment;
use App\Models\FormationModel;
use App\Models\Hebergement;

class ForamtionhebergmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foramtionhebergments = Foramtionhebergment::with(['formation', 'hebergement'])->get();
        return response()->json($foramtionhebergments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'hebergement_id' => 'required|exists:hebergements,id',
        ]);

        $foramtionhebergment = Foramtionhebergment::create($validated);
        $foramtionhebergment->load(['formation', 'hebergement']);
        
        return response()->json($foramtionhebergment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Foramtionhebergment $foramtionhebergment)
    {
        $foramtionhebergment->load(['formation', 'hebergement']);
        return response()->json($foramtionhebergment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Foramtionhebergment $foramtionhebergment)
    {
        $validated = $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'hebergement_id' => 'required|exists:hebergements,id',
        ]);

        $foramtionhebergment->update($validated);
        $foramtionhebergment->load(['formation', 'hebergement']);
        
        return response()->json($foramtionhebergment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Foramtionhebergment $foramtionhebergment)
    {
        $foramtionhebergment->delete();
        return response()->json(null, 204);
    }

    /**
     * Get options for select inputs
     */
    public function options()
    {
        $formations = FormationModel::select('id', 'name')->get(); // Adjust 'name' to your actual column
        $hebergements = Hebergement::select('id', 'name')->get(); // Adjust 'name' to your actual column
        
        return response()->json([
            'formations' => $formations,
            'hebergements' => $hebergements,
        ]);
    }
}