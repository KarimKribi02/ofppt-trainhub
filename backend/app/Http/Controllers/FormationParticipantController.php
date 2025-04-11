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
        $formation = FormationModel::find($id);
        if (!$formation) {
            return response()->json(['message' => 'Formation non trouvée'], 404);
        }

        // MODIFIÉ: Ajout de est_absent dans la récupération
        $participants = FormationParticipant::where('formation_id', $id)
            ->with(['participant' => function ($query) {
                $query->select('id', 'nom', 'prenom', 'filliere', 'etablissement');
            }])
            ->get()
            ->map(function ($participant) {
                return [
                    'id' => $participant->participant->id,
                    'nom' => $participant->participant->nom,
                    'prenom' => $participant->participant->prenom,
                    'filliere' => $participant->participant->filliere,
                    'etablissement' => $participant->participant->etablissement,
                    'est_absent' => (bool)$participant->est_absent, // Conversion explicite en booléen
                ];
            });

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
            'absent' => 'required|boolean', // Expect 'absent' as a boolean
            'date_absence' => 'nullable|date',
        ]);
    
        $formationParticipant = FormationParticipant::where('formation_id', $formationId)
            ->where('participant_id', $participantId)
            ->first();
    
        if (!$formationParticipant) {
            return response()->json(['message' => 'Participant non trouvé pour cette formation'], 404);
        }
    
        // Use 'absent' directly and fix the date_absence logic
        $formationParticipant->est_absent = $request->absent ? 1 : 0; // Toujours stocker 1 ou 0
        $formationParticipant->date_absence = $request->absent ? $request->date_absence ?? now() : null;
        $formationParticipant->save();
    
        return response()->json([
            'message' => 'Absence mis à jour avec succès',
            'data' => [
                'id' => $participantId,
                'est_absent' => (bool)$formationParticipant->est_absent,
                'date_absence' => $formationParticipant->date_absence
            ]
        ], 200);
    }

}