<?php

namespace App\Http\Controllers;

use App\Models\FormationModel;
use App\Models\FormateurParticipant;
use Illuminate\Http\Request;

class FormationController extends Controller
{
    public function index()
    {
        $formations = FormationModel::all();
        $formations->each(function ($formation) {
            $formation->formateurParticipants = $formation->formateurParticipants(); // Sans get()
            $formation->hebergement = $formation->hebergement;
        });

        return response()->json($formations, 200);
    }

    public function store(Request $request)
    {
        $this->validateFormation($request);

        $data = $this->prepareFormationData($request);
        $formation = FormationModel::create($data);

        $formation->formateurParticipants = $formation->formateurParticipants(); // Sans get()
        $formation->hebergement = $formation->hebergement;

        return response()->json([
            'status' => 200,
            'message' => 'Formation créée avec succès',
            'data' => $formation,
        ], 201);
    }

    public function show($id)
    {
        $formation = FormationModel::find($id);

        if (!$formation) {
            return response()->json(['message' => 'Formation non trouvée'], 404);
        }

        $formation->formateurParticipants = $formation->formateurParticipants(); // Sans get()
        $formation->hebergement = $formation->hebergement;

        return response()->json($formation, 200);
    }

    public function update(Request $request, $id)
    {
        $formation = FormationModel::find($id);

        if (!$formation) {
            return response()->json(['message' => 'Formation non trouvée'], 404);
        }

        $this->validateFormation($request);

        $data = $this->prepareFormationData($request);
        $formation->update($data);

        $formation->formateurParticipants = $formation->formateurParticipants(); // Sans get()
        $formation->hebergement = $formation->hebergement;

        return response()->json([
            'status' => 200,
            'message' => 'Formation modifiée avec succès',
            'data' => $formation
        ], 200);
    }

    public function destroy($id)
    {
        $formation = FormationModel::find($id);

        if (!$formation) {
            return response()->json(['message' => 'Formation non trouvée'], 404);
        }

        $formation->delete();
        return response()->json(['message' => 'Formation supprimée'], 200);
    }

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
            'participant_ids.*' => 'exists:formateur_participants,id',
        ]);
    }

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

        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('formations', $fileName, 'public');
            $data['document'] = $fileName;
        }

        return $data;
    }
}