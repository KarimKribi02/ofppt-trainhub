<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FormateurController extends Controller
{
    public function index()
    {
        $formateurs = Formateur::all();
        return response()->json($formateurs);
    }

    // Afficher un formateur spécifique
    public function show($id)
    {
        $formateur = Formateur::findOrFail($id);
        return response()->json($formateur);
    }

    // Ajouter un nouveau formateur
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|unique:formateurs,email',
        ]);

        $formateur = Formateur::create($request->all());

        return response()->json($formateur, 201);
    }

    // Mettre à jour un formateur
    public function update(Request $request, $id)
    {
        $formateur = Formateur::findOrFail($id);

        $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'prenom' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|unique:formateurs,email,' . $id,
        ]);

        $formateur->update($request->all());

        return response()->json($formateur);
    }

    // Supprimer un formateur
    public function destroy($id)
    {
        Formateur::destroy($id);
        return response()->json(['message' => 'Formateur supprimé avec succès']);
    }
}
