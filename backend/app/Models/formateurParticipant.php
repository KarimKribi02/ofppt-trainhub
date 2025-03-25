<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens; 

class formateurParticipant extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'formateur_participants';

    protected $fillable = ['nom','prenom','email','filliere','etablissement','hebergement_id'];

    public function formations()
    {
        return FormationModel::whereJsonContains('participant_ids', $this->id);
    }
}
