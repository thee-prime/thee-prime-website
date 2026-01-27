import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MainLayout({ children, title = 'TheePrime' }) {
    const { flash } = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <Head title={title} />

            {/* Sticky Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                        >
                            <img
                                src="/storage/theeprime.png"
                                alt="TheePrime"
                                className="w-10 h-10 object-contain"
                            />
                            TheePrime
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link
                                href="/"
                                className="text-slate-300 hover:text-white transition-colors font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/blog"
                                className="text-slate-300 hover:text-white transition-colors font-medium"
                            >
                                Blog
                            </Link>
                        </nav>

                        {/* Desktop Admin Link */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link
                                href="/admin"
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all transform hover:scale-105"
                            >
                                Admin
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-slate-300 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl absolute w-full left-0 top-16 transition-all duration-300 ease-in-out">
                        <div className="px-4 py-6 space-y-4">
                            <Link
                                href="/"
                                className="block px-4 py-3 rounded-lg bg-slate-800/50 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/blog"
                                className="block px-4 py-3 rounded-lg bg-slate-800/50 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link
                                href="/admin"
                                className="block px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Admin Panel
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Flash Messages */}
            {
                flash?.success && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400">
                            {flash.success}
                        </div>
                    </div>
                )
            }
            {
                flash?.error && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
                            {flash.error}
                        </div>
                    </div>
                )
            }

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-slate-900/50 border-t border-slate-700/50 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Brand */}
                        <div>
                            <Link
                                href="/"
                                className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
                            >
                                TheePrime
                            </Link>
                            <p className="mt-4 text-slate-400">
                                Discover insightful articles on technology, programming, and more.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-slate-400">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blog"
                                        className="hover:text-white transition-colors"
                                    >
                                        All Posts
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
                            <p className="text-slate-400">
                                Stay updated with our latest articles and news.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-700/50 text-center text-slate-400">
                        <p>
                            © {new Date().getFullYear()} TheePrime. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div >
    );
}
