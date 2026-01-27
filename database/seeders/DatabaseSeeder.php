<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        User::updateOrCreate(
            ['email' => 'admin@theeprime.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
            ]
        );

        // Create Categories
        $categories = [
            [
                'name' => 'Technology',
                'slug' => 'technology',
                'description' => 'Latest tech news, tutorials, and insights',
                'is_active' => true,
                'order' => 1,
            ],
            [
                'name' => 'Programming',
                'slug' => 'programming',
                'description' => 'Coding tutorials and best practices',
                'is_active' => true,
                'order' => 2,
            ],
            [
                'name' => 'Web Development',
                'slug' => 'web-development',
                'description' => 'Frontend and backend web development',
                'is_active' => true,
                'order' => 3,
            ],
            [
                'name' => 'প্রযুক্তি',
                'slug' => 'projukti',
                'description' => 'বাংলায় প্রযুক্তি বিষয়ক আর্টিকেল',
                'is_active' => true,
                'order' => 4,
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['slug' => $category['slug']], $category);
        }

        // Create sample posts only if none exist
        if (Post::count() === 0) {
            $posts = [
                [
                    'category_id' => 1,
                    'title' => 'Getting Started with Laravel 12',
                    'slug' => 'getting-started-laravel-12',
                    'excerpt' => 'Learn the basics of Laravel 12 and build your first application.',
                    'content' => "# Getting Started with Laravel 12\n\nLaravel 12 brings exciting new features to the PHP ecosystem. In this guide, we'll explore the fundamentals.\n\n## Installation\n\nFirst, ensure you have PHP 8.2+ installed:\n\n```bash\ncomposer create-project laravel/laravel my-app\n```\n\n## Key Features\n\n- **Improved Performance** - Laravel 12 is faster than ever\n- **Better DX** - Developer experience improvements\n- **New Starter Kits** - Fresh React and Vue starters\n\n## Conclusion\n\nLaravel 12 continues to be the best PHP framework for modern applications.",
                    'meta_title' => 'Getting Started with Laravel 12 | Complete Guide',
                    'meta_description' => 'Learn Laravel 12 fundamentals, installation, and key features. Build your first modern PHP web application.',
                    'focus_keyword' => 'Laravel 12',
                    'keywords' => json_encode(['laravel', 'php', 'web development', 'framework', 'tutorial']),
                    'is_published' => true,
                    'published_at' => now()->subDays(2),
                    'view_count' => 1250,
                ],
                [
                    'category_id' => 2,
                    'title' => 'Understanding CQRS Pattern in PHP',
                    'slug' => 'understanding-cqrs-pattern-php',
                    'excerpt' => 'A deep dive into the Command Query Responsibility Segregation pattern.',
                    'content' => "# Understanding CQRS Pattern\n\nCQRS stands for **Command Query Responsibility Segregation**. It's an architectural pattern that separates read and write operations.\n\n## Why CQRS?\n\n1. **Scalability** - Scale reads and writes independently\n2. **Maintainability** - Clear separation of concerns\n3. **Testability** - Easier to test isolated components\n\n## Implementation\n\n```php\nclass PostCommand {\n    public function create(CreatePostDTO \$dto): Post {\n        return Post::create(\$dto->toArray());\n    }\n}\n\nclass PostQuery {\n    public function findBySlug(string \$slug): ?Post {\n        return Post::where('slug', \$slug)->first();\n    }\n}\n```\n\n## Best Practices\n\n- Keep Commands simple and focused\n- Queries should be read-only\n- Use DTOs for data transfer",
                    'meta_title' => 'CQRS Pattern in PHP | Architecture Guide',
                    'meta_description' => 'Learn CQRS architectural pattern in PHP. Commands, queries, and best practices for scalable applications.',
                    'focus_keyword' => 'CQRS Pattern',
                    'keywords' => json_encode(['cqrs', 'php', 'architecture', 'design pattern', 'commands']),
                    'is_published' => true,
                    'published_at' => now()->subDays(1),
                    'view_count' => 890,
                ],
                [
                    'category_id' => 3,
                    'title' => 'Building a Blog with Inertia.js and React',
                    'slug' => 'building-blog-inertiajs-react',
                    'excerpt' => 'Create a modern blog using Laravel, Inertia.js, and React.',
                    'content' => "# Building a Blog with Inertia.js\n\nInertia.js allows you to create modern single-page apps using classic server-side routing.\n\n## Setup\n\n```bash\ncomposer require inertiajs/inertia-laravel\nnpm install @inertiajs/react\n```\n\n## Creating Pages\n\n```jsx\nimport { Head } from '@inertiajs/react';\n\nexport default function Home({ posts }) {\n    return (\n        <>\n            <Head title=\"Home\" />\n            {posts.map(post => (\n                <article key={post.id}>\n                    <h2>{post.title}</h2>\n                </article>\n            ))}\n        </>\n    );\n}\n```\n\n## Benefits\n\n- No API needed\n- Server-side rendering\n- Seamless navigation",
                    'meta_title' => 'Inertia.js Blog Tutorial | Laravel + React',
                    'meta_description' => 'Build a modern blog with Laravel, Inertia.js and React. Step-by-step tutorial with code examples.',
                    'focus_keyword' => 'Inertia.js',
                    'keywords' => json_encode(['inertia', 'react', 'laravel', 'blog', 'tutorial']),
                    'is_published' => true,
                    'published_at' => now(),
                    'view_count' => 450,
                ],
                [
                    'category_id' => 4,
                    'title' => 'রিঅ্যাক্ট শেখার সম্পূর্ণ গাইড',
                    'slug' => 'react-learning-guide-bangla',
                    'excerpt' => 'বাংলায় রিঅ্যাক্ট শেখার জন্য একটি সম্পূর্ণ গাইড।',
                    'content' => "# রিঅ্যাক্ট শেখার সম্পূর্ণ গাইড\n\nরিঅ্যাক্ট হলো ফেসবুক কর্তৃক তৈরি একটি জাভাস্ক্রিপ্ট লাইব্রেরি।\n\n## কেন রিঅ্যাক্ট?\n\n- **কম্পোনেন্ট বেসড** - পুনঃব্যবহারযোগ্য কোড\n- **ভার্চুয়াল DOM** - দ্রুত পারফরম্যান্স\n- **বড় কমিউনিটি** - প্রচুর রিসোর্স\n\n## প্রথম কম্পোনেন্ট\n\n```jsx\nfunction Welcome({ name }) {\n    return <h1>Hello, {name}!</h1>;\n}\n```\n\n## উপসংহার\n\nরিঅ্যাক্ট শেখা আপনার ক্যারিয়ারের জন্য অত্যন্ত গুরুত্বপূর্ণ।",
                    'meta_title' => 'রিঅ্যাক্ট শেখার গাইড | বাংলা টিউটোরিয়াল',
                    'meta_description' => 'বাংলায় রিঅ্যাক্ট শিখুন। কম্পোনেন্ট, স্টেট, এবং প্রপস সহ সম্পূর্ণ গাইড।',
                    'focus_keyword' => 'রিঅ্যাক্ট',
                    'keywords' => json_encode(['react', 'javascript', 'bangla', 'tutorial', 'programming']),
                    'is_published' => true,
                    'published_at' => now()->subHours(5),
                    'view_count' => 320,
                ],
            ];

            foreach ($posts as $post) {
                Post::create($post);
            }
        }
    }
}
