<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class drefs extends Model
{
    use HasFactory,HasApiTokens;

    protected $table = 'drefs';
    
    protected $fillable = [
        'email',
        'password',
        'name'
    ];
    
    protected $hidden = [
        'password'
    ];
}
