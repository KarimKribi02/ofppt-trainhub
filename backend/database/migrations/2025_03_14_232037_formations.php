<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formations', function (Blueprint $table){   
            $table->id();
            $table->string('titre');
            $table->text('description');
            $table->date('dateDebut');
            $table->date('dateFin');    
            $table->string('filières');
            $table->string('formateurs_animateurs');
            $table->string('lieux');
            $table->string('document')->nullable();
            $table->string('statut');
            $table->string('mode');
            $table->string('lien_teams')->nullable();
            $table->json('participant_ids')->nullable();
            $table->timestamps();
          });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        schema::dropIfExists('formations');
    }
};
