<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class formateurAnimateur extends Model
{
    use HasFactory;

    protected $table = 'formateur_animateurs';

    protected $fillable = ['formateur_id', 'filliere'];
    
    public function formations()
    {
        return $this->hasMany(FormationModel::class, 'formateur_animateur_id');
    }

    public function formateur()
    {
        return $this->belongsTo(formateur::class);
    }
}
