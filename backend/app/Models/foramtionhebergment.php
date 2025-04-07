<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class foramtionhebergment extends Model
{
    use HasFactory;

    protected $table = 'formationhebergments';

    protected $fillable = ['formation_id', 'hebergement_id'];

    public function formation()
    {
        return $this->belongsTo(FormationModel::class, 'formation_id');
    }

    public function hebergement()
    {
        return $this->belongsTo(Hebergement::class, 'hebergement_id');
    }
}
