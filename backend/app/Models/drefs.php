<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;  // Importer le trait

class drefs extends Model
{
    use HasFactory, HasApiTokens;  // Ajouter le trait ici

    protected $table = 'drefs';
    protected $fillable = ['email', 'password', 'role'];

     protected $hidden = [
     'password'
 ];
 
}

