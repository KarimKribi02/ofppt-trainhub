<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\formateurParticipant;
use Illuminate\Support\Facades\Hash;

class FormateurParticipantController extends Controller
{
    /**
     * Afficher tous les formateurs participants.
     */
    public function index()
    {
        $formateursParticipants = formateurParticipant::all();
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
            'password' => 'required|string|min:8',
            'filliere' => 'required|string|max:255',
            'etablissement' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'hebergement_id' => 'nullable|exists:hebergements,id',
        ]);

        $formateurParticipant = formateurParticipant::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hashage du mot de passe
            'filliere' => $request->filliere,
            'etablissement' => $request->etablissement,
            'role' => $request->role,
            'hebergement_id' => $request->hebergement_id,
        ]);

        return response()->json([
            'message' => 'Formateur participant ajouté avec succès',
            'data' => $formateurParticipant
        ], 201);
    }

    /**
     * Afficher un formateur participant spécifique.
     */
    public function show($id)
    {
        $formateurParticipant = formateurParticipant::find($id);

        if (!$formateurParticipant) {
            return response()->json(['message' => 'Formateur participant non trouvé'], 404);
        }

        return response()->json($formateurParticipant);
    }

    /**
     * Mettre à jour un formateur participant.
     */
    public function update(Request $request, $id)
    {
        $formateurParticipant = formateurParticipantt::find($id);

        if (!$formateurParticipant) {
            return response()->json(['message' => 'Formateur participant non trouvé'], 404);
        }

        $request->validate([
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|unique:formateur_participants,email,' . $id,
            'password' => 'sometimes|string|min:8',
            'filliere' => 'sometimes|string|max:255',
            'etablissement' => 'sometimes|string|max:255',
            'role' => 'sometimes|string|max:255',
            'hebergement_id' => 'nullable|exists:hebergements,id',
        ]);

        $data = $request->all();
        if ($request->has('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $formateurParticipant->update($data);

        return response()->json([
            'message' => 'Formateur participant mis à jour avec succès',
            'data' => $formateurParticipant
        ]);
    }

    /**
     * Supprimer un formateur participant.
     */
    public function destroy($id)
    {
        $formateurParticipant = formateurParticipant::find($id);

        if (!$formateurParticipant) {
            return response()->json(['message' => 'Formateur participant non trouvé'], 404);
        }

        $formateurParticipant->delete();

        return response()->json(['message' => 'Formateur participant supprimé avec succès']);
    }
}