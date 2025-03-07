<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class formateur extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'prenom', 'email'];

    
    public function formateurAnimateur()
    {
        return $this->hasOne(formateurAnimateur::class, 'formateur_id');
    }

 

}
