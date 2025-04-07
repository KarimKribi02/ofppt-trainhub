<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class uploadfile extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'document' => 'required|file|mimes:pdf,doc,docx,ppt,pptx|max:10240'
        ]);

        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('test_uploads', $fileName, 'public');

            return response()->json([
                'message' => 'Fichier téléchargé avec succès',
                'filename' => $fileName
            ], 200);
        }

        return response()->json(['message' => 'Aucun fichier fourni'], 400);
    }
}
