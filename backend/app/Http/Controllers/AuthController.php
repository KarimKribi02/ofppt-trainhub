<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\cdcs;
use App\Models\drefs;
use App\Models\FormateurAnimateur;
use Illuminate\Support\Facades\Hash;
USE App\Models\formateurParticipant;
use App\Models\ResponsableDr;
use App\Models\Admin;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

       
        $user = cdcs::where('email', $request->email)->first() ?? drefs::where('email', $request->email)->first() ?? FormateurAnimateur::where('email', $request->email)->first() ?? formateurParticipant::where('email', $request->email)->first()
            ?? ResponsableDr::where('email', $request->email)->first() ?? Admin::where('email', $request->email)->first();

        
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }
        if (!in_array($user->role, ['CDC', 'DREF','ANIMATEUR', 'PARTICIPANT','RESPONSABLE_DR','ADMIN'])) {
            return response()->json(['message' => 'Rôle invalide'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // Réponse avec le token et les informations de l'utilisateur
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->role, 
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'filliere' => $user->filiere,
                'etablissement' => $user->etablissement
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion réussie']);
    }

    public function getUser(Request $request)
{
    $user = $request->user(); 

    if (!$user) {
        return response()->json(['message' => 'Utilisateur non authentifié'], 401);
    }

    return response()->json([
        'id' => $user->id,
        'email' => $user->email,
        'role' => $user->role,
        'nom' => $user->nom,
        'prenom' => $user->prenom,
        'filliere' => $user->filiere,
        'etablissement' => $user->etablissement
    ]);
}
}
