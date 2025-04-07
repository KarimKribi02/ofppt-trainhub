<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormationModel;
use App\Models\Hebergement;
use Illuminate\Support\Facades\DB;

class FormationHebergementController extends Controller
{
    public function index()
    {
        $formationHebergements = DB::table('formationhebergements')
            ->with(['formation', 'hebergement'])
            ->get();
        return response()->json($formationHebergements);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'hebergement_id' => 'required|exists:hebergements,id',
        ]);

        // Check if the formation exists
        $formation = FormationModel::find($validated['formation_id']);
        if (!$formation) {
            return response()->json(['message' => 'Formation non trouvée'], 404);
        }

        // Check if the hebergement exists
        $hebergement = Hebergement::find($validated['hebergement_id']);
        if (!$hebergement) {
            return response()->json(['message' => 'Hébergement non trouvé'], 404);
        }

        // Check for existing association
        if (DB::table('formation_hebergements')
            ->where('formation_id', $validated['formation_id'])
            ->where('hebergement_id', $validated['hebergement_id'])
            ->exists()) {
            return response()->json(['message' => 'Cette association existe déjà'], 400);
        }

        try {
            $formationHebergement = DB::table('formation_hebergements')->insert([
                'formation_id' => $validated['formation_id'],
                'hebergement_id' => $validated['hebergement_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json([
                'message' => 'Association créée avec succès',
                'data' => [
                    'formation_id' => $validated['formation_id'],
                    'hebergement_id' => $validated['hebergement_id']
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la création de l\'association',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $formationHebergement = DB::table('formation_hebergements')
            ->where('id', $id)
            ->first();

        if (!$formationHebergement) {
            return response()->json(['message' => 'Association non trouvée'], 404);
        }

        return response()->json($formationHebergement);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'hebergement_id' => 'required|exists:hebergements,id',
        ]);

        $formationHebergement = DB::table('formation_hebergements')
            ->where('id', $id)
            ->first();

        if (!$formationHebergement) {
            return response()->json(['message' => 'Association non trouvée'], 404);
        }

        try {
            DB::table('formation_hebergements')
                ->where('id', $id)
                ->update([
                    'formation_id' => $validated['formation_id'],
                    'hebergement_id' => $validated['hebergement_id'],
                    'updated_at' => now(),
                ]);

            return response()->json([
                'message' => 'Association mise à jour avec succès',
                'data' => [
                    'id' => $id,
                    'formation_id' => $validated['formation_id'],
                    'hebergement_id' => $validated['hebergement_id']
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $formationHebergement = DB::table('formation_hebergements')
            ->where('id', $id)
            ->first();

        if (!$formationHebergement) {
            return response()->json(['message' => 'Association non trouvée'], 404);
        }

        DB::table('formation_hebergements')
            ->where('id', $id)
            ->delete();

        return response()->json(['message' => 'Association supprimée avec succès'], 204);
    }
}