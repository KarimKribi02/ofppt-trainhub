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
        'document' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        'statut' => 'required|string',
        'mode' => 'required|string'
    ]);

    // Si un fichier est uploadé, stockez-le et récupérez son chemin
    $documentPath = null;
    if ($request->hasFile('document')) {
        $documentPath = $request->file('document')->store('formations', 'public');
    }

    // Créez la formation avec les données validées
    $formation = FormationModel::create([
        'titre' => $request->titre,
        'description' => $request->description,
        'dateDebut' => $request->dateDebut,
        'dateFin' => $request->dateFin,
        'filières' => $request->filières,
        'formateurs_animateurs' => $request->formateurs_animateurs,
        'lieux' => $request->lieux,
        'document' => $documentPath, // Stocke le chemin du fichier
        'statut' => $request->statut,
        'mode' => $request->mode,
    ]);

    return response()->json([
        'status' => 200,
        'message' => 'Formation ajoutée avec succès',
        'data' => $formation
    ], 201);
}

    /**
     * Afficher une formation spécifique.
     */
    public function show($id)
    {
        $formation = FormationModel::find($id);
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

        $formation = FormationModel::find($id);
        $formation->update($request->all());

        return response()->json($formation);
    }

    /**
     * Supprimer une formation.
     */
    public function destroy($id)
    {
        $formation = FormationModel::find($id);
        $formation->delete();

        return response()->json(['message' => 'Formation supprimée avec succès']);
    }
}
