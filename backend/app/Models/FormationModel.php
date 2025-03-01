<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormationModel extends Model
{
    use HasFactory;

    protected $table = 'formations';

    protected $fillable = ['titre','description','dateDebut','dateFin','statut','region','lieux','image','document'];
}
