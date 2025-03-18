<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormationModel extends Model
{
    use HasFactory;

    protected $table = 'formations';

    protected $fillable = [
        'titre', 'description', 'dateDebut', 'dateFin', 'lieux', 'filières',
        'formateurs_animateurs', 'statut', 'mode', 'lien_teams', 'document', 'participant_ids'
    ];

    protected $casts = [
        'participant_ids' => 'array' // Pour gérer automatiquement le JSON
    ];

    public function formateurParticipants()
    {
        return FormateurParticipant::whereIn('id', $this->participant_ids ?? [])->get();
    }

    public function hebergement()
{
    return $this->belongsTo(hebergement::class);
}
   
}
