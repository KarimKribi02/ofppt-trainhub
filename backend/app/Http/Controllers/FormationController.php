<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormationModel;

class FormationController extends Controller
{
    public function index()
    {
        return response()->json(FormationModel::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required',
            'dateDebut' => 'required|date',
            'dateFin' => 'required|date|after_or_equal:dateDebut',
            'filières' => 'required|string',
            'formateurs_animateurs' => 'required|string',
            'lieux' => 'required|string',
            'statut' => 'required|string',
            'mode' => 'required|string',
            'lien_teams' => 'nullable|url',
        ]);

        $formation = FormationModel::create($request->all());
        return response()->json($formation, 201);
    }

    public function show($id)
    {
        $formation = FormationModel::find($id);
        return $formation ? response()->json($formation) : response()->json(['message' => 'Formation non trouvée'], 404);
    }

    public function update(Request $request, $id)
    {
        $formation = FormationModel::find($id);
        $formation->update($request->all());
        return response()->json([
            'message'=>'formation modifier avec succes'
        ]);
    }

    public function destroy($id)
    {
        $formation = FormationModel::find($id);
        $formation->delete();
        return response()->json(['message' => 'Formation supprimée'], 200);
    }
}
