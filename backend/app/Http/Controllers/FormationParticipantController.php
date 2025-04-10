<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormationParticipant;
use App\Models\FormationModel;
use App\Models\formateurParticipant;
use Illuminate\Support\Facades\DB;


class FormationParticipantController extends Controller
{
 

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
        $participants = FormationParticipant::where('formation_id', $id)
            ->with('participant') 
            ->get();
    
        return response()->json(['participants' => $participants]);
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

    public function detachParticipant($formationId, $participantId)
    {
        // Vérifie si la liaison existe
        $deleted = DB::table('formation_participants')
            ->where('formation_id', $formationId)
            ->where('participant_id', $participantId)
            ->delete();
    
        if ($deleted) {
            return response()->json(['message' => 'Participant détaché avec succès.'], 200);
        } else {
            return response()->json(['message' => 'Aucune correspondance trouvée.'], 404);
        }
    }
    
    // Gérer l'absence ou la présence d'un participant
public function manageAttendance(Request $request, $formationId, $participantId)
{
    $request->validate([
        'est_absent' => 'required|in:oui,non', // 'oui' pour absent, 'non' pour présent
        'date_absence' => 'nullable|date', // Date facultative si absent
    ]);

    // Recherche de l'enregistrement dans formation_participants
    $formationParticipant = FormationParticipant::where('formation_id', $formationId)
        ->where('participant_id', $participantId)
        ->first();

    if (!$formationParticipant) {
        return response()->json(['message' => 'Participant non trouvé pour cette formation'], 404);
    }

    // Mise à jour des champs est_absent et date_absence
    $formationParticipant->est_absent = $request->est_absent;
    $formationParticipant->date_absence = $request->est_absent === 'oui' ? $request->date_absence : null;
    $formationParticipant->save();

    return response()->json([
        'message' => 'Statut d\'absence mis à jour avec succès',
        'data' => $formationParticipant->load('participant')
    ], 200);
}

}