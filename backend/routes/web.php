<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});





// Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login'); 
// Route::post('/login', [AuthController::class, 'authenticate']);
// Route::get('/dashboard', function () {
//     return view('dashboard'); // Assure-toi que cette vue existe
// })->middleware('auth','verified')->name('dashboard');

