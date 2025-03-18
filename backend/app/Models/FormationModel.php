<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormationModel extends Model
{
    use HasFactory;

    protected $table = 'formations';

    protected $fillable = ['titre', 'description', 'dateDebut', 'dateFin', 'lieux', 'filières', 'formateurs_animateurs','document', 'statut',  'mode','lien_teams','participant_ids','hebergement_id'];


    protected $casts = [
        'participant_ids' => 'array',
    ];

 public function formateurParticipants()
    {
        return FormateurParticipant::whereIn('id', $this->participant_ids ?? []);
    }

    public function hebergement()
{
    return $this->belongsTo(hebergement::class);
}
   
}
