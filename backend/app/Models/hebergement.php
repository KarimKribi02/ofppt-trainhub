<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class hebergement extends Model
{
    use HasFactory;

    protected $table = 'hebergements';

    protected $fillable = ['nom_hebergement','lieu','localisation','date_arriver','date_depart'];

}
