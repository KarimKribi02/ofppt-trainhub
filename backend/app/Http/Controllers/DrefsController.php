<?php

namespace App\Http\Controllers;

use App\Models\drefs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class DrefsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $drefs = drefs::all();
        return response()->json([
            'data' => $drefs
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:drefs,email',
            'password' => 'required|min:6',
            'role' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $drefs = drefs::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'data' => $drefs
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $drefs = drefs::find($id);

        if (!$drefs) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'email' => 'email|unique:drefs,email,' . $id,
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

        $drefs->update($data);

        return response()->json([
            'message' => 'User updated successfully',
            'data' => $drefs
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $drefs = drefs::find($id);

        if (!$drefs) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $drefs->delete();
        return response()->json([
            'message' => 'User deleted successfully'
        ], 200);
    }
}