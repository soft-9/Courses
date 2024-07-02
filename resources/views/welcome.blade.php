<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <link rel="canonical" href="{{ url()->current() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title></title>
    @viteReactRefresh
    @vite('resources/frontend/index.jsx')
</head>
<body>
    <div id="root" class="grid grid-rows-[auto_1fr_auto] h-screen"></div>
</body>
</html>
