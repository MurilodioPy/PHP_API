<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::apiResource('eventos', 'App\Http\Controllers\api\EventoController');

Route::get('/teste', function () {
    return "Api Funcionando";
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
