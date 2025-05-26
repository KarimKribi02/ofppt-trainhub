<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens; 

class formateurParticipant extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'formateur_participants';

    protected $fillable = ['nom','prenom','email','password','role','filliere','etablissement','hebergement_id'];

   public function  formations() {
    return $this->belongsTOMany(Formation::class,'formation_participants','participant_id','formation_id');
   }

    public function hebergement()
    {
        return $this->belongsTo(hebergement::class);
    }
    
   
}
