<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\cdcs;
use App\Models\drefs;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = cdcs::where('email', $request->email)->first() ?? drefs::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'type' => $user instanceof cdcs ? 'cdc' : 'dref',
                    'name' => $user->name,
                ]
            ]);
        }

        return response()->json(['message' => 'Identifiants invalides'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion réussie']);
    }
}