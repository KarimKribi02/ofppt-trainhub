<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;

class FormationController extends Controller
{
    // Afficher toutes les formations
    public function index()
    {
        $formations = Formation::all();
        return response()->json($formation);
    }

    // Afficher une formation spécifique
    public function show($id)
    {
        $formation = Formation::find($id);
        return response()->json($formation);
    }

    // Créer une nouvelle formation
    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
            'dateDebut' => 'required|date',
            'dateFin' => 'required|date',
            'formateur_animateur_id' => 'required|exists:formateur_animateurs,id',
            'lieux' => 'required|string',
            'document' => 'nullable|string',
            'statut' => 'nullable|string',
            'mode' => 'required|string',
        ]);

        $formation = Formation::create($request->all());

        return response()->json([
            'message' => 'ajouter avec succes',
            'data' => 200
        ]);
    }

    // Mettre à jour une formation
    public function update(Request $request, $id)
    {
        $formation = Formation::find($id);
        $formation->update($request->all());

        return response()->json($formation);
    }

    // Supprimer une formation
    public function destroy($id)
    {
        Formation::destroy($id);
        return response()->json(['message' => 'Formation supprimée avec succès']);
    }
}
