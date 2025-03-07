<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class formateurAnimateurController extends Controller
{
    public function index()
    {
        $formateurs = FormateurAnimateur::all();
        return response()->json($formateurs);
    }

    // Afficher un formateur animateur spécifique
    public function show($id)
    {
        $formateur = FormateurAnimateur::find($id);
        return response()->json($formateur);
    }

    // Ajouter un nouveau formateur animateur
    public function store(Request $request)
    {
        $request->validate([
            'formateur_id' => 'required|unique:formateur_animateurs,formateur_id|exists:formateurs,id',
            'filliere' => 'nullable|string',
        ]);

        $formateur = FormateurAnimateur::create($request->all());

        return response()->json([
            'message' => 'ajouter avec succes'
        ]);
    }

    // Mettre à jour un formateur animateur
    public function update(Request $request, $id)
    {
        $formateur = FormateurAnimateur::find($id);
        $formateur->update($request->all());

        return response()->json([
            'message' => 'mettre a jour avec succes',
            'data' => 200
        ]);
    }

    // Supprimer un formateur animateur
    public function destroy($id)
    {
        FormateurAnimateur::destroy($id);
        return response()->json(['message' => 'Formateur Animateur supprimé avec succès']);
    }
}
