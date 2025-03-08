<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormateurAnimateur;
class formateurAnimateurController extends Controller
{
    public function index()
    {
        $formateurs = FormateurAnimateur::all();
        return response()->json($formateurs);
    }

    // Afficher un formateur/animateur spécifique
    public function show($id)
    {
        $formateur = FormateurAnimateur::find($id);
        
        if (!$formateur) {
            return response()->json(['message' => 'Formateur non trouvé'], 404);
        }

        return response()->json($formateur);
    }

    // Enregistrer un formateur/animateur
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:formateur_animateurs,email',
            'filliere' => 'nullable|string|max:255',
        ]);

        $formateur = FormateurAnimateur::create($request->all());

        return response()->json($formateur, 201);  // 201 pour la création réussie
    }

    // Mettre à jour un formateur/animateur
    public function update(Request $request, $id)
    {
        $formateur = FormateurAnimateur::find($id);
        
        if (!$formateur) {
            return response()->json(['message' => 'Formateur non trouvé'], 404);
        }

        $formateur->update($request->all());

        return response()->json($formateur);
    }

    // Supprimer un formateur/animateur
    public function destroy($id)
    {
        $formateur = FormateurAnimateur::find($id);
        
        if (!$formateur) {
            return response()->json(['message' => 'Formateur non trouvé'], 404);
        }

        $formateur->delete();

        return response()->json(['message' => 'Formateur supprimé avec succès']);
    }
}
