<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormateurAnimateur extends Model
{
    use HasFactory;
    
    protected $table = 'formateur_animateurs';
    protected $fillable = ['nom','prenom','email','filières'];

}
