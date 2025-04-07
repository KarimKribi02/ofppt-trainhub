<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormationModel extends Model
{
    use HasFactory;

    protected $table = 'formations';

    protected $fillable = ['titre', 'description', 'dateDebut', 'dateFin', 'lieux', 'filières','formateurs_animateurs', 'statut', 'mode', 'lien_teams', 'document', 'hebergement_id'];

    // protected $casts = [
    //     'participant_ids' => 'array' // Pour gérer automatiquement le JSON
    // ];

    // public function getFormateurParticipantsAttribute()
    // {
    //     if (empty($this->participant_ids)) {
    //         return collect(); // Retourne une collection vide si aucun ID
    //     }
    //     return FormateurParticipant::whereIn('id', $this->participant_ids)->get();
    // }

    public function formationParticipants()
    {
        return $this->hasMany(FormationParticipant::class, 'formation_id');
    }

    public function hebergement()
    {
        return $this->belongsTo(hebergement::class, 'hebergement_id');
    }
}
