<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormationParticipant extends Model 
{
    use HasFactory;

    protected $table = 'formation_participants'; 

    protected $fillable = ['formation_id', 'participant_id']; 

    public function formation()  
    {
        return $this->belongsTo(FormationModel::class, 'formation_id');  
    }
   
    public function participant() 
    {
        return $this->belongsTo(formateurParticipant::class, 'participant_id');  
    }
}