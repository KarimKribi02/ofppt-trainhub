<?php 

namespace App\Http\Controllers;

use App\Models\FormationModel;
use Illuminate\Http\Request;

class FormationController extends Controller 
{
    // pour afficher tout
    public function index() 
    {
        $formations = FormationModel::all();
        return response()->json($formations);
    }
    
    // pour stocker les formation et valider  
    public function store(Request $request) 
    {
        $validated = $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
            'dateDebut' => 'required|date',
            'dateFin' => 'required|date|after_or_equal:dateDebut',
            'statut' => 'required|string',
            'region' => 'required|string',
            'lieux' => 'required|string',
            'document' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif',
        ]);
        
        $formation = new FormationModel();
        $formation->titre = $validated['titre'];
        $formation->description = $validated['description'];
        $formation->dateDebut = $validated['dateDebut'];
        $formation->dateFin = $validated['dateFin'];
        $formation->statut = $validated['statut'];
        $formation->region = $validated['region'];
        $formation->lieux = $validated['lieux'];
        
        if ($request->hasFile('document')) {
            $formation->document = $request->file('document')->store('documents');
        }
        
        if ($request->hasFile('image')) {
            $formation->image = $request->file('image')->store('images');
        }
        
        $formation->save();
        
        return response()->json([
            'status'=> 200,
            'message'=>'formation envoyer par succes'
        ]);
    }
    
    // pour afficher un formation specifier filtrage
    public function show($id)
    {
        $formation = FormationModel::findOrFail($id);
        return response()->json($formation);
    }
    
    // pour mettre a jour un formation
    public function update(Request $request, $id)
    {
        $formation = FormationModel::findOrFail($id); 
      
        $request->validate([
            'titre' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'dateDebut' => 'sometimes|required|date', 
            'dateFin' => 'sometimes|required|date|after_or_equal:dateDebut', 
            'statut' => 'sometimes|required|string', 
            'region' => 'sometimes|required|string',
            'lieux' => 'sometimes|required|string',
            'document' => 'nullable|string', 
            'image' => 'nullable|string'
        ]);
      
        $formation->update($request->all());
      
        return response()->json($formation);
    }
    
    // pour supprimier formation
    public function destroy($id)
    {
        $formation = FormationModel::findOrFail($id);
        $formation->delete();
      
        return response()->json(['message' => 'Formation supprimée avec succès']);
    }
}