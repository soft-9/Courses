<?php

return [
    'default' => env('FILESYSTEM_DISK', 'local'),

    'disks' => [
        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
            'throw' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'user_photos' => [
            'driver' => 'local',
            'root' => storage_path('app/public/user_photos'),
            'url' => env('APP_URL').'/storage/user_photos',
            'visibility' => 'public',
        ],

        'course_images' => [
            'driver' => 'local',
            'root' => storage_path('app/public/course_images'),
            'url' => env('APP_URL').'/storage/course_images',
            'visibility' => 'public',
        ],

        'videos' => [
            'driver' => 'local',
            'root' => storage_path('app/public/videos'),
            'url' => env('APP_URL').'/storage/videos',
            'visibility' => 'public',
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'throw' => false,
        ],
    ],

    'links' => [
        public_path('storage') => storage_path('app/public'),
        public_path('storage/user_photos') => storage_path('app/public/user_photos'),
        public_path('storage/course_images') => storage_path('app/public/course_images'),
    ],
];
