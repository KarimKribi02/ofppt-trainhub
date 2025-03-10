<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormateurParticipant;

class FormateurParticipantController extends Controller
{
    /**
     * Afficher tous les formateurs participants.
     */
    public function index()
    {
        $formateursParticipants = FormateurParticipant::all();
        return response()->json($formateursParticipants);
    }

    /**
     * Ajouter un nouveau formateur participant.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|unique:formateur_participants,email',
            'filliere' => 'required|string|max:255',
            'etablissement' => 'required|string|max:255',
        ]);

        $formateurParticipant = FormateurParticipant::create($request->all());

        return response()->json([
            'message' => 'formateur participant ajouter avec succes'
        ]);
    }

    /**
     * Afficher un formateur participant spécifique.
     */
    public function show($id)
    {
        $formateurParticipant = FormateurParticipant::find($id);

        if (!$formateurParticipant) {
            return response()->json(['message' => 'Formateur participant non trouvé']);
        }

        return response()->json($formateurParticipant);
    }

    /**
     * Mettre à jour un formateur participant.
     */
    public function update(Request $request, $id)
    {
        $formateurParticipant = FormateurParticipant::find($id);

        if (!$formateurParticipant) {
            return response()->json(['message' => 'Formateur participant non trouvé'], 404);
        }

        $request->validate([
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|unique:formateur_participants,email,' . $id,
            'filliere' => 'sometimes|string|max:255',
            'etablissement' => 'sometimes|string|max:255',
        ]);

        $formateurParticipant->update($request->all());

        return response()->json($formateurParticipant);
    }

    /**
     * Supprimer un formateur participant.
     */
    public function destroy($id)
    {
        $formateurParticipant = FormateurParticipant::find($id);

        if (!$formateurParticipant) {
            return response()->json(['message' => 'Formateur participant non trouvé'], 404);
        }

        $formateurParticipant->delete();

        return response()->json(['message' => 'Formateur participant supprimé avec succès']);
    }
}
