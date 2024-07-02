<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Auth;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    public function mount($record): void
    {
        parent::mount($record);

        if (!Auth::user()->hasRole('super admin')) {
            $this->redirect('/admin');
        }
    }
}
