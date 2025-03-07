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
            $table->unsignedBigInteger('formateur_animateur_id');
            $table->string('lieux');
            $table->string('document')->nullable();
            $table->text('statut')->nullable();
            $table->text('mode');
            $table->timestamps();
            $table->foreign('formateur_animateur_id')->references('id')->on('formateur_animateurs')->onDelete('cascade');
          });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfexist('formations');
    }
};
