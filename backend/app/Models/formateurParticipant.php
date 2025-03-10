<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class formateurParticipant extends Model
{
    use HasFactory;

    protected $table = 'formateur_participants';

    protected $fillable = ['nom','prenom','email','filliere','etablissement'];
}
