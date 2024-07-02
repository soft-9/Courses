<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function shouldRegisterNavigation(): bool
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->hasRole('super admin')) {
                \Log::info('User has super admin role - shouldRegisterNavigation');
                return true;
            } else {
                \Log::info('User does not have super admin role - shouldRegisterNavigation');
            }
        } else {
            \Log::info('User not authenticated - shouldRegisterNavigation');
        }
        return false;
    }

    public static function canCreate(): bool
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->hasRole('super admin')) {
                \Log::info('User has super admin role - canCreate');
                return true;
            } else {
                \Log::info('User does not have super admin role - canCreate');
            }
        } else {
            \Log::info('User not authenticated - canCreate');
        }
        return false;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')->required(),
                Forms\Components\FileUpload::make('profile_photo')->image(),
                Forms\Components\Select::make('gender')
                    ->options([
                        'male' => 'Male',
                        'female' => 'Female',
                    ])
                    ->reactive()
                    ->required(),
                Forms\Components\TextInput::make('email')
                    ->email()
                    ->rules(['required_without:phone', 'email', 'unique:users,email'])
                    ->required(function ($get) {
                        return empty($get('phone'));
                    }),
                Forms\Components\TextInput::make('phone')
                    ->rules(['required_without:email', 'digits:11', 'numeric', 'unique:users,phone'])
                    ->required(function ($get) {
                        return empty($get('email'));
                    }),
                Forms\Components\TextInput::make('password')
                    ->password()
                    ->required()
                    ->minLength(8),
                Forms\Components\Select::make('roles')
                    ->multiple()
                    ->relationship('roles', 'name')
                    ->preload()
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\ImageColumn::make('profile_photo')->disk('public'),
                Tables\Columns\TextColumn::make('email'),
                Tables\Columns\TextColumn::make('phone'),
                Tables\Columns\TextColumn::make('roles.name')->label('Roles')->limit(50),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->headerActions([
                Tables\Actions\Action::make('createUser')
                    ->label('Create User')
                    ->url('http://test-course.test/admin/users/create')
                    ->color('primary')
                    ->icon('heroicon-o-plus'),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }

    public static function getNavigationLabel(): string
    {
        return 'Users';
    }

    public static function getNavigationGroup(): ?string
    {
        return 'User Management';
    }

    public static function getNavigationIcon(): string
    {
        return 'heroicon-o-rectangle-stack';
    }

    public static function getNavigationSort(): ?int
    {
        return 1;
    }

    public static function getNavigationBadge(): ?string
    {
        return null;
    }
}
