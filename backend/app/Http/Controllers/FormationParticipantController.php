<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormationParticipant;
use App\Models\FormationModel;
use App\Models\formateurParticipant;

class FormationParticipantController extends Controller
{
    // Récupérer tous les participants
 

    // Ajouter des participants à une formation
    public function addParticipants(Request $request, $id)
    {
        $request->validate([
            'participant_ids' => 'required|array',
            'participant_ids.*' => 'exists:formateur_participants,id',
        ]);

        $formation = FormationModel::find($id);

        $data = [];
        foreach ($request->participant_ids as $participantId) {
            if (!FormationParticipant::where('formation_id', $id)
                ->where('participant_id', $participantId)
                ->exists()) {
                $data[] = [
                    'formation_id' => $id,
                    'participant_id' => $participantId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        if (empty($data)) {
            return response()->json(['message' => 'Aucun nouveau participant ajouté'], 200);
        }

        FormationParticipant::insert($data);

        return response()->json(['message' => 'Participants ajoutés avec succès'], 201);
    }

    // Méthodes de la ressource (exemples)
    public function index()
    {
        return FormationParticipant::with(['formation', 'participant'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'participant_id' => 'required|exists:formateur_participants,id',
        ]);
        $formationParticipant = FormationParticipant::create($validated);
        return response()->json($formationParticipant, 201);
    }

   
    public function show($id)
    {
        $formationParticipant = FormationParticipant::with(['formation', 'participant'])->findOrFail($id);
        return response()->json($formationParticipant);
    }

    public function update(Request $request, $id)
    {
        $formationParticipant = FormationParticipant::find($id);
        
        $validated = $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'participant_id' => 'required|exists:formateur_participants,id',
        ]);

        $formationParticipant->update($validated);
        return response()->json($formationParticipant->load(['formation', 'participant']));
    }

    public function destroy($id)
    {
        $formationParticipant = FormationParticipant::find($id);
        $formationParticipant->delete();
        return response()->json(null, 204);
    }
}