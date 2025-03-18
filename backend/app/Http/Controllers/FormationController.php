<?php

namespace App\Http\Controllers;

use App\Models\FormationModel;
use App\Models\FormateurParticipant;
use Illuminate\Http\Request;

class FormationController extends Controller
{
    /**
     * Return a list of all formations along with related formateurParticipants.
     */
    public function index()
    {
        $formations = FormationModel::all();
        $formations->each(function ($formation) {
            $formation->formateurParticipants = $formation->formateurParticipants()->get();
            $formation->hebergement = $formation->hebergement;
        });

        return response()->json($formations, 200);
    }

    /**
     * Store a new formation.
     */
    public function store(Request $request)
    {
        $this->validateFormation($request);

        $data = $this->prepareFormationData($request);

        // Create the formation
        $formation = FormationModel::create($data);

        // Return the response
        $formation->formateurParticipants = $formation->formateurParticipants()->get();
        $formation->hebergement = $formation->hebergement;

        return response()->json([
            'status' => 200,
            'message' => 'Formation créée avec succès',
            'data' => $formation,
        ], 201);
    }

    /**
     * Show a specific formation.
     */
    public function show($id)
    {
        $formation = FormationModel::find($id);

        if (!$formation) {
            return response()->json(['message' => 'Formation non trouvée'], 404);
        }

        $formation->formateurParticipants = $formation->formateurParticipants()->get();
        $formation->hebergement = $formation->hebergement;

        return response()->json($formation);
    }

    /**
     * Update an existing formation.
     */
    public function update(Request $request, $id)
    {
        $formation = FormationModel::find($id);

        if (!$formation) {
            return response()->json(['message' => 'Formation non trouvée'], 404);
        }

        $this->validateFormation($request);

        $data = $this->prepareFormationData($request);

        // Update the formation
        $formation->update($data);
        
        $formation->formateurParticipants = $formation->formateurParticipants()->get();
        $formation->hebergement = $formation->hebergement;

        return response()->json([
            'status' => 200,
            'message' => 'Formation modifiée avec succès',
            'data' => $formation
        ], 200);
    }

    /**
     * Delete a formation.
     */
    public function destroy($id)
    {
        $formation = FormationModel::find($id);

        if (!$formation) {
            return response()->json(['message' => 'Formation non trouvée'], 404);
        }

        $formation->delete();
        return response()->json(['message' => 'Formation supprimée'], 200);
    }

    /**
     * Validate the formation data.
     */
    private function validateFormation(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required',
            'dateDebut' => 'required|date',
            'dateFin' => 'required|date|after_or_equal:dateDebut',
            'filières' => 'required|string',
            'formateurs_animateurs' => 'required|string',
            'lieux' => 'required|string',
            'statut' => 'required|string',
            'mode' => 'required|string',
            'lien_teams' => 'nullable|url',
            'document' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'participant_ids' => 'nullable|array',
            'participant_ids.*' => 'exists:formateur_participants,id', // Validate participant IDs
        ]);
    }

    /**
     * Prepare formation data for storing or updating.
     */
    private function prepareFormationData(Request $request)
    {
        $data = [
            'titre' => $request->titre,
            'description' => $request->description,
            'dateDebut' => $request->dateDebut,
            'dateFin' => $request->dateFin,
            'lieux' => $request->lieux,
            'filières' => $request->filières,
            'formateurs_animateurs' => $request->formateurs_animateurs,
            'statut' => $request->statut,
            'mode' => $request->mode,
            'lien_teams' => $request->lien_teams,
            'participant_ids' => $request->participant_ids ?? null,
        ];

        // Handle file upload
        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('formations', $fileName, 'public');
            $data['document'] = $fileName;
        }

        return $data;
    }
}
