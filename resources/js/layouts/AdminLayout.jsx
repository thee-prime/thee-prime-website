import { Head, Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, FolderOpen, FileText, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Categories', href: '/admin/categories', icon: FolderOpen },
    { name: 'Posts', href: '/admin/posts', icon: FileText },
];

export default function AdminLayout({ children, title = 'Admin' }) {
    const { url, props } = usePage();
    const { flash } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (href) => {
        if (href === '/admin' && url === '/admin') return true;
        if (href !== '/admin' && url.startsWith(href)) return true;
        return false;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Head title={`${title} | Admin`} />

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 border-r border-slate-700/50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700/50">
                    <Link
                        href="/"
                        className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
                    >
                        <div className="flex items-center gap-2">
                            <img
                                src="/storage/theeprime.png"
                                alt="TheePrime"
                                className="w-8 h-8 object-contain"
                            />
                            TheePrime
                        </div>
                    </Link>
                    <button
                        className="lg:hidden text-slate-400 hover:text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="mt-6 px-3">
                    <ul className="space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(item.href)
                                        ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                    {isActive(item.href) && (
                                        <ChevronRight className="w-4 h-4 ml-auto" />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="absolute bottom-6 left-3 right-3 space-y-2">
                    <Link
                        href="/admin/profile"
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${url.startsWith('/admin/profile')
                            ? 'bg-purple-600/20 text-white border border-purple-500/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                            }`}
                    >
                        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-xs font-bold">
                            {props.auth?.user?.name?.charAt(0)?.toUpperCase() || 'A'}
                        </span>
                        Profile
                    </Link>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-all"
                    >
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
                    <div className="flex items-center justify-between h-16 px-4 lg:px-8">
                        <button
                            className="lg:hidden text-slate-400 hover:text-white p-2"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-lg font-semibold text-white">{title}</h1>
                        <div className="w-10" />
                    </div>
                </header>

                {/* Flash Messages */}
                <div className="px-4 lg:px-8">
                    {flash?.success && (
                        <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400">
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
                            {flash.error}
                        </div>
                    )}
                </div>

                {/* Page Content */}
                <main className="p-4 lg:p-8 text-white">{children}</main>
            </div>
        </div>
    );
}
