<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\messageController;
use App\Http\Controllers\formateurAnimateurController;
use App\Http\Controllers\FormateurParticipantController;
use App\Http\Controllers\HebergementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TestUploadController;
use App\Http\Controllers\FormationParticipantController;
use App\Http\Controllers\ForamtionhebergmentController;
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


Route::resource('formations', FormationController::class); // api de formation

// Route::resource('message', messageController::class);  // api de message

Route::resource('animateurs',formateurAnimateurController::class);  // api de formateurs animateurs

Route::resource('participants',FormateurParticipantController::class); // api de formateurs participants

// Route::post('/formations/{id}/add-participants', [FormationController::class, 'addParticipants']); // api de ajouter formateurs participants


Route::post('/formations/{formation_id}/upload-document', [FormationController::class, 'uploadDocument']); // api de telecharger document

Route::resource('hebergements', HebergementController::class);  // api de hebergement
Route::post('/hebergements/assign/{formation_id}', [FormationController::class, 'assignHebergement']);

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUser']);



// Route personnalisée pour ajouter des participants à une formation
Route::post('/formation-participants/{id}', [FormationParticipantController::class, 'addParticipants']);

// Route resource pour les opérations CRUD standard
Route::resource('formation-participants', FormationParticipantController::class);

Route::resource('formation-hebergements', ForamtionhebergmentController::class);  // api de hebergement avec formation

Route::delete('/formation-participants/{formationId}/{participantId}', [FormationParticipantController::class, 'detachParticipant']);


