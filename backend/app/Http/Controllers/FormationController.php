<?php

namespace App\Http\Controllers;

use App\Models\FormationModel;
use App\Models\Hebergement;
use Illuminate\Http\Request;

class FormationController extends Controller
{
    public function index()
    {
        $formations = FormationModel::all();
        return response()->json($formations, 200);
    }

    public function store(Request $request)
    {
        $this->validateFormation($request);
        $data = $this->prepareFormationData($request);
        $formation = FormationModel::create($data);
        $formation->load('hebergement');
        return response()->json([
            'status' => 200,
            'message' => 'Formation créée avec succès',
            'data' => $formation,
        ], 201);
    }

    public function show($id)
    {
        $formation = FormationModel::with('hebergement')->find($id);
        if (!$formation) {
            return response()->json(['message' => 'Formation non trouvée'], 404);
        }
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
        $formation->load('hebergement');
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

    public function getHebergements()
    {
        $hebergements = Hebergement::all();
        return response()->json($hebergements, 200);
    }

    // Mettre à jour une formation existante avec un hebergement_id via l'URL
    public function assignHebergement(Request $request, $formation_id)
{
    $request->validate([
        'hebergement_id' => 'required|exists:hebergements,id',
    ]);

    $formation = FormationModel::find($formation_id);
    if (!$formation) {
        return response()->json(['message' => 'Formation non trouvée'], 404);
    }

    $formation->update([
        'hebergement_id' => $request->hebergement_id
    ]);

    $formation->load('hebergement');

    return response()->json([
        'status' => 200,
        'message' => 'Hébergement assigné avec succès',
        'data' => $formation,
    ], 200);
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
            'document' => 'sometimes|file|mimes:pdf,doc,docx,ppt,pptx',
            'hebergement_id' => 'nullable|exists:hebergements,id',
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
            'hebergement_id' => $request->hebergement_id ?? null
        ];

        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('formations', $fileName, 'public');
            $data['document'] = $fileName;
        }

        return $data;
    }

    public function uploadDocument(Request $request, $formation_id)
{
    // Validate the formation exists
    $formation = FormationModel::find($formation_id);
    if (!$formation) {
        return response()->json(['message' => 'Formation non trouvée'], 404);
    }

    // Validate the document
    $request->validate([
        'document' => 'required|file|mimes:pdf,doc,docx,ppt,pptx|max:10240', // Max 10MB
    ]);

    try {
        // Handle the file upload
        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('documents', $fileName, 'public');

            // Update the formation with the new document
            $formation->update([
                'document' => $fileName
            ]);

            // Load related data if needed
            $formation->load('hebergement');

            return response()->json([
                'status' => 200,
                'message' => 'Document téléchargé avec succès',
                'data' => $formation,
            ], 200);
        }

        return response()->json([
            'message' => 'Aucun document fourni'
        ], 400);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erreur lors du téléchargement du document',
            'error' => $e->getMessage()
        ], 500);
    }
}
} 