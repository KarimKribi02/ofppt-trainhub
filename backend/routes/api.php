<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\messageController;

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

Route::resource('message', messageController::class);  // api de message




