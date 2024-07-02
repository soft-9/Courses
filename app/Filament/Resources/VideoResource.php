<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VideoResource\Pages;
use App\Models\Video;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Tables;
use Illuminate\Support\Facades\Auth;

class VideoResource extends Resource
{
    protected static ?string $model = Video::class;

    protected static ?string $navigationIcon = 'heroicon-o-video-camera';

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')->required(),
                Forms\Components\Radio::make('video_source')
                    ->options([
                        'url' => 'رابط',
                        'file' => 'رفع من الجهاز',
                    ])
                    ->reactive()
                    ->required(),
                Forms\Components\TextInput::make('url')
                    ->url()
                    ->requiredWith(['video_source'])
                    ->visible(fn ($get) => $get('video_source') === 'url'),
                Forms\Components\FileUpload::make('file')
                    ->disk('videos')
                    ->acceptedFileTypes(['video/mp4', 'video/avi', 'video/mpeg', 'video/quicktime'])
                    ->visible(fn ($get) => $get('video_source') === 'file')
                    ->required(fn ($get) => $get('video_source') === 'file'),
                Forms\Components\Textarea::make('description')->required(),
                Forms\Components\Select::make('course_id')
                    ->relationship('course', 'title')
                    ->options(function () {
                        return Auth::user()->courses->pluck('title', 'id');
                    })
                    ->required(),
                Forms\Components\Hidden::make('created_by')->default(Auth::id())->required(),
            ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->label('Title'),
                Tables\Columns\TextColumn::make('url')->url(fn ($record) => $record->url)->limit(50),
                Tables\Columns\TextColumn::make('description')->limit(50),
                Tables\Columns\TextColumn::make('course.title')->label('Course Title'),
                Tables\Columns\TextColumn::make('creator.name')->label('Created By'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListVideos::route('/'),
            'create' => Pages\CreateVideo::route('/create'),
            'edit' => Pages\EditVideo::route('/{record}/edit'),
        ];
    }
}
