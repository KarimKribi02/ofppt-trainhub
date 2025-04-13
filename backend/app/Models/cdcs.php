<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens; 

class cdcs extends Model
{
    use HasFactory, HasApiTokens;  

    protected $table = 'cdcs';
    protected $fillable = ['email', 'password', 'role'];

    protected $hidden = [
        'password'
    ];
    
}

