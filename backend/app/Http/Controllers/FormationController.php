<?php

namespace App\Http\Controllers;

use App\Models\FormationModel;
use Illuminate\Http\Request;

class FormationController extends Controller
{
    // Afficher toutes les formations
    public function index()
    {
        $formations = FormationModel::all();
        return response()->json($formations);
    }

    // Afficher une formation spécifique
    public function show($id)
    {
        $formation = FormationModel::find($id);
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

        $formation = FormationModel::create($request->all());

        return response()->json([
            'message' => 'ajouter avec succes',
            'data' => 200
        ]);
    }

    // Mettre à jour une formation
    public function update(Request $request, $id)
    {
        $formation = FormationModel::find($id);
        $formation->update($request->all());

        return response()->json($formation);
    }

    // Supprimer une formation
    public function destroy($id)
    {
        FormationModel::destroy($id);
        return response()->json(['message' => 'Formation supprimée avec succès']);
    }
}
