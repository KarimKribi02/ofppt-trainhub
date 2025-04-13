<?php

namespace App\Http\Controllers;

use App\Models\ResponsableDr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ResponsableDrController extends Controller
{
    // Afficher la liste des responsables
    public function index()
    {
        $responsables = ResponsableDr::all();
        return response()->json($responsables);
    }

    // Afficher un responsable spécifique
    public function show($id)
    {
        $responsable = ResponsableDr::find($id);
        if (!$responsable) {
            return response()->json(['message' => 'Responsable non trouvé'], 404);
        }
        return response()->json($responsable);
    }

    // Créer un nouveau responsable
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:responsable_drs',
            'password' => 'required|min:6',
            'role' => 'required|string',
        ]);

        $responsable = ResponsableDr::create([
            'email' => $request->email,
            'password' => Hash::make($request->password), // sécuriser le mot de passe
            'role' => $request->role,
        ]);

        return response()->json($responsable, 201);
    }

    // Mettre à jour un responsable
    public function update(Request $request, $id)
    {
        $responsable = ResponsableDr::find($id);
        if (!$responsable) {
            return response()->json(['message' => 'Responsable non trouvé'], 404);
        }

        $responsable->update([
            'email' => $request->email ?? $responsable->email,
            'role' => $request->role ?? $responsable->role,
            'password' => $request->password ? Hash::make($request->password) : $responsable->password,
        ]);

        return response()->json($responsable);
    }

    // Supprimer un responsable
    public function destroy($id)
    {
        $responsable = ResponsableDr::find($id);
        if (!$responsable) {
            return response()->json(['message' => 'Responsable non trouvé'], 404);
        }

        $responsable->delete();

        return response()->json(['message' => 'Responsable supprimé avec succès']);
    }
}
