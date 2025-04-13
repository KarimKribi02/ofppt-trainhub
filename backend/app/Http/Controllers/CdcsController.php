<?php

namespace App\Http\Controllers;

use App\Models\cdcs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CdcsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cdcs = cdcs::all();
        return response()->json([
            'data' => $cdcs
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:cdcs,email',
            'password' => 'required|min:6',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
    
        $cdcs = cdcs::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'CDC', 
        ]);
    
        return response()->json([
            'message' => 'User created successfully',
            'data' => $cdcs
        ], 201);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $cdcs = cdcs::find($id);

        if (!$cdcs) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'email' => 'email|unique:cdcs,email,' . $id,
            'password' => 'sometimes|min:6',
            'role' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only(['email', 'role']);
        if ($request->has('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $cdcs->update($data);

        return response()->json([
            'message' => 'User updated successfully',
            'data' => $cdcs
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cdcs = cdcs::find($id);

        if (!$cdcs) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $cdcs->delete();
        return response()->json([
            'message' => 'User deleted successfully'
        ], 200);
    }
}