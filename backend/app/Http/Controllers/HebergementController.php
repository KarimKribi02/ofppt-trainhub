<?php

namespace App\Http\Controllers;

use App\Models\hebergement;
use Illuminate\Http\Request;

class HebergementController extends Controller
{
   /**
     * Retourne la liste des hébergements en JSON.
     */
    public function index()
    {
        return response()->json(hebergement::all());
    }

    /**
     * Enregistre un nouvel hébergement dans la base de données.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom_hebergement' => 'required|string|max:255',
            'lieu' => 'required|string|max:255',
            'localisation' => 'required|string|max:255',
            'date_arriver' => 'required|date',
            'date_depart' => 'required|date|after_or_equal:date_arriver',
        ]);

        $hebergement = hebergement::create($request->all());
        return response()->json($hebergement, 201);
    }

    /**
     * Retourne les détails d'un hébergement en JSON.
     */
    public function show(hebergement $hebergement)
    {
        return response()->json($hebergement);
    }

    /**
     * Met à jour un hébergement dans la base de données.
     */
    public function update(Request $request, hebergement $hebergement)
    {
        $request->validate([
            'nom_hebergement' => 'required|string|max:255',
            'lieu' => 'required|string|max:255',
            'localisation' => 'required|string|max:255',
            'date_arriver' => 'required|date',
            'date_depart' => 'required|date|after_or_equal:date_arriver',
        ]);

        $hebergement->update($request->all());
        return response()->json($hebergement);
    }

    /**
     * Supprime un hébergement de la base de données.
     */
    public function destroy(hebergement $hebergement)
    {
        $hebergement->delete();
        return response()->json(['message' => 'Hébergement supprimé avec succès']);
    }
}
