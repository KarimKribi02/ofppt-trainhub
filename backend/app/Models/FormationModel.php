<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormationModel extends Model
{
    use HasFactory;

    protected $table = 'formations';

    protected $fillable = ['titre', 'description', 'dateDebut', 'dateFin', 'formateur_animateur_id', 'statut', 'lieux', 'mode', 'document'];

    public function formateurAnimateur()
    {
        return $this->belongsTo(FormateurAnimateur::class, 'formateur_animateur_id');
    }

}
