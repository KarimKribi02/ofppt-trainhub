<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormationModel extends Model
{
    use HasFactory;

    protected $table = 'formations';

    protected $fillable = ['titre', 'description', 'dateDebut', 'dateFin', 'lieux', 'filières', 'formateur_animateur_id','document', 'statut',  'mode' ];

    public function formateurAnimateur()
    {
        return $this->belongsTo(formateurAnimateur::class, 'formateur_animateur_id');
    }

}
