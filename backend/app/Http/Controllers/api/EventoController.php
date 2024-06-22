<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Evento;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class EventoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Evento::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $validatedData = $request->validate([
                'nome' => 'required|string|max:255',
                'data' => 'required|date_format:Y-m-d',
                'local' => 'required|string|max:255',
                'descricao' => 'required|string',
            ]);


            $data = Carbon::createFromFormat('Y-m-d', $validatedData['data']);
            $formatada = $data->format('Y-m-d');

            Log::info("Formatada: {$formatada}");
            Log::info("Inserting event with nome: {$validatedData['nome']}, data: {$formatada}, local: {$validatedData['local']}, descricao: {$validatedData['descricao']}");



            $evento = Evento::create([
                'nome' => $validatedData['nome'],
                'data' => $formatada,
                'local' => $validatedData['local'],
                'descricao' => $validatedData['descricao'],
            ]);

            DB::commit();
            return response()->json($evento, 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error saving event: ', ['exception' => $e]);
            DB::rollback();
            return response()->json(['message' => 'Erro ao salvar o evento.'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $evento = Evento::find($id);

        if (!$evento) {
            return response()->json(['message' => 'Evento não encontrado'], 404);
        }

        return response()->json($evento);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();

        try {
            $evento = Evento::find($id);

            if (!$evento) {
                return response()->json(['message' => 'Evento não encontrado.'], 404);
            }

            $validatedData = $request->validate([
                'nome' => 'required|string|max:255',
                'data' => 'required|date_format:Y-m-d',
                'local' => 'required|string|max:255',
                'descricao' => 'required|string',
            ]);



            $data = Carbon::createFromFormat('Y-m-d', $validatedData['data']);
            $formatada = $data->format('Y-m-d');

            Log::info("Formatada: {$formatada}");

            $evento->update([
                'nome' => $validatedData['nome'],
                'data' => $formatada,
                'local' => $validatedData['local'],
                'descricao' => $validatedData['descricao'],
            ]);

            DB::commit();
            return response()->json($evento, 200);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Erro ao atualizar o evento.'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();

        try {
            $evento = Evento::find($id);

            if (!$evento) {
                return response()->json(['message' => 'Evento não encontrado.'], 404);
            }

            $evento->delete();

            DB::commit();
            return response()->json(['message' => 'Evento excluído com sucesso.'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Erro ao excluir o evento.'], 500);
        }
    }
}
