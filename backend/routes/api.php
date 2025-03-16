<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\messageController;
use App\Http\Controllers\formateurAnimateurController;
use App\Http\Controllers\FormateurParticipantController;
use App\Http\Controllers\HebergementController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




// les api de formations

// Route::get('/formations', [FormationController::class, 'index']); 
// Route::get('/formations/{id}', [FormationController::class, 'show']); // Récupérer une formation specifique
// Route::post('/formations', [FormationController::class, 'store']); // Creer une nouvelle formation
// Route::put('/formations/{id}', [FormationController::class, 'update']); // Mettre a jour une formation
// Route::delete('/formations/{id}', [FormationController::class, 'destroy']); // Supprimer une formation



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
    
});

Route::resource('formations', FormationController::class); // api de formation

// Route::resource('message', messageController::class);  // api de message

Route::resource('animateurs',formateurAnimateurController::class);  // api de formateurs animateurs

Route::resource('participants',FormateurParticipantController::class); // api de formateurs participants

Route::post('participants/{formateurParticipantId}/assign-to-formation', [FormateurParticipantController::class, 'assignToFormation']);

Route::get('/formations/{id}/download', [FormationController::class, 'downloadDocument']); // api de telecharger document

Route::resource('hebergements', HebergementController::class);  // api de hebergement

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);




