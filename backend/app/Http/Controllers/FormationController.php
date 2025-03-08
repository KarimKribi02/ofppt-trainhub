<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormationModel;

class FormationController extends Controller
{
    /**
     * Afficher la liste des formations.
     */
    public function index()
    {
        $formations = FormationModel::all();
        return response()->json($formations);
    }

    /**
     * Enregistrer une nouvelle formation.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'dateDebut' => 'required|date',
            'dateFin' => 'required|date|after_or_equal:dateDebut',
            'filières' => 'required|string',
            'formateurs_animateurs' => 'required|string',
            'lieux' => 'required|string',
            'document' => 'nullable|string',
            'statut' => 'required|string',
            'mode' => 'required|string'
        ]);

        $formation = FormationModel::create($request->all());

        return response()->json($formation, 201);
    }

    /**
     * Afficher une formation spécifique.
     */
    public function show($id)
    {
        $formation = FormationModel::findOrFail($id);
        return response()->json($formation);
    }

    /**
     * Mettre à jour une formation.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'dateDebut' => 'sometimes|date',
            'dateFin' => 'sometimes|date|after_or_equal:dateDebut',
            'filières' => 'sometimes|string',
            'formateurs_animateurs' => 'sometimes|string',
            'lieux' => 'sometimes|string',
            'document' => 'nullable|string',
            'statut' => 'sometimes|string',
            'mode' => 'sometimes|string'
        ]);

        $formation = FormationModel::findOrFail($id);
        $formation->update($request->all());

        return response()->json($formation);
    }

    /**
     * Supprimer une formation.
     */
    public function destroy($id)
    {
        $formation = FormationModel::findOrFail($id);
        $formation->delete();

        return response()->json(['message' => 'Formation supprimée avec succès']);
    }
}
