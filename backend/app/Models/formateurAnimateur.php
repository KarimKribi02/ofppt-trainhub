<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens; 

class FormateurAnimateur extends Model
{
    use HasFactory, HasApiTokens;
    
    protected $table = 'formateur_animateurs';
    protected $fillable = ['nom','prenom','email','password','role','filières'];

}
