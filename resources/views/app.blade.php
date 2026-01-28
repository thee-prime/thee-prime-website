<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-GVZH8HP7KQ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-GVZH8HP7KQ');
    </script>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'TheePrime') }}</title>

    {{-- Favicon --}}
    <link rel="icon" href="/storage/theeprime.png" type="image/png">
    <link rel="apple-touch-icon" href="/storage/theeprime.png">

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    {{-- Dynamic SEO Meta Tags (set via Inertia Head) --}}
    @if(isset($page['props']['seo']))
        @php $seo = $page['props']['seo']; @endphp

        {{-- Basic SEO --}}
        @if(!empty($seo['description']))
            <meta name="description" content="{{ $seo['description'] }}">
        @endif
        @if(!empty($seo['keywords']))
            <meta name="keywords"
                content="{{ is_array($seo['keywords']) ? implode(', ', $seo['keywords']) : $seo['keywords'] }}">
        @endif
        @if(!empty($seo['canonical']))
            <link rel="canonical" href="{{ $seo['canonical'] }}">
        @endif

        {{-- Open Graph --}}
        <meta property="og:type" content="{{ $seo['type'] ?? 'website' }}">
        <meta property="og:title" content="{{ $seo['title'] ?? config('app.name') }}">
        @if(!empty($seo['description']))
            <meta property="og:description" content="{{ $seo['description'] }}">
        @endif
        <meta property="og:url" content="{{ $seo['url'] ?? request()->url() }}">
        @if(!empty($seo['image']))
            @php
                // Ensure absolute URL for OG image
                $ogImage = $seo['image'];
                if (!str_starts_with($ogImage, 'http')) {
                    $ogImage = url($ogImage);
                }
            @endphp
            <meta property="og:image" content="{{ $ogImage }}">
            <meta property="og:image:secure_url" content="{{ $ogImage }}">
            <meta property="og:image:type" content="image/jpeg">
            <meta property="og:image:width" content="1200">
            <meta property="og:image:height" content="630">
            <meta property="og:image:alt" content="{{ $seo['title'] ?? '' }}">
        @endif
        <meta property="og:site_name" content="{{ config('app.name', 'TheePrime') }}">
        <meta property="og:locale" content="{{ app()->getLocale() }}">

        {{-- Twitter Card --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $seo['title'] ?? config('app.name') }}">
        @if(!empty($seo['description']))
            <meta name="twitter:description" content="{{ $seo['description'] }}">
        @endif
        @if(!empty($seo['image']))
            <meta name="twitter:image" content="{{ $ogImage }}">
            <meta name="twitter:image:alt" content="{{ $seo['title'] ?? '' }}">
        @endif

        {{-- Article-specific meta (for blog posts) --}}
        @if(($seo['type'] ?? '') === 'article')
            @if(!empty($seo['published_time']))
                <meta property="article:published_time" content="{{ $seo['published_time'] }}">
            @endif
            @if(!empty($seo['author']))
                <meta property="article:author" content="{{ $seo['author'] }}">
            @endif
            @if(!empty($seo['section']))
                <meta property="article:section" content="{{ $seo['section'] }}">
            @endif
        @endif

        {{-- JSON-LD Structured Data --}}
        @if(($seo['type'] ?? '') === 'article')
            @php
                $jsonLd = [
                    '@context' => 'https://schema.org',
                    '@type' => 'BlogPosting',
                    'headline' => $seo['title'] ?? '',
                    'description' => $seo['description'] ?? '',
                    'datePublished' => $seo['published_time'] ?? now()->toIso8601String(),
                    'author' => [
                        '@type' => 'Person',
                        'name' => $seo['author'] ?? config('app.name'),
                    ],
                    'publisher' => [
                        '@type' => 'Organization',
                        'name' => config('app.name', 'TheePrime'),
                        'logo' => [
                            '@type' => 'ImageObject',
                            'url' => url('/logo.png'),
                        ],
                    ],
                    'mainEntityOfPage' => [
                        '@type' => 'WebPage',
                        '@id' => $seo['url'] ?? request()->url(),
                    ],
                ];
                if (!empty($seo['image'])) {
                    $jsonLd['image'] = $seo['image'];
                }
                if (!empty($seo['keywords'])) {
                    $jsonLd['keywords'] = is_array($seo['keywords']) ? implode(', ', $seo['keywords']) : $seo['keywords'];
                }
            @endphp
            <script type="application/ld+json">{!! json_encode($jsonLd, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}</script>
        @else
            @php
                $jsonLd = [
                    '@context' => 'https://schema.org',
                    '@type' => 'WebSite',
                    'name' => config('app.name', 'TheePrime'),
                    'url' => config('app.url'),
                    'potentialAction' => [
                        '@type' => 'SearchAction',
                        'target' => config('app.url') . '?search={search_term_string}',
                        'query-input' => 'required name=search_term_string',
                    ],
                ];
            @endphp
            <script type="application/ld+json">{!! json_encode($jsonLd, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}</script>
        @endif
    @endif

    {{-- Google Analytics --}}
    @if(config('services.google_analytics.measurement_id'))
        <script async
            src="https://www.googletagmanager.com/gtag/js?id={{ config('services.google_analytics.measurement_id') }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '{{ config('services.google_analytics.measurement_id') }}');
        </script>
    @endif

    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
