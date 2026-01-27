import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Lock, Key, Save } from 'lucide-react';

export default function ProfileEdit({ user }) {
    const { flash } = usePage().props;

    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/admin/profile/password', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout title="Profile">
            <div className="max-w-xl">
                <h2 className="text-2xl font-bold text-white mb-2">Profile Settings</h2>
                <p className="text-slate-400 mb-8">Manage your account password</p>

                {flash?.success && (
                    <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
                        {flash.success}
                    </div>
                )}

                <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                            <span className="text-2xl text-white font-bold">
                                {user.name?.charAt(0)?.toUpperCase() || 'A'}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                            <p className="text-slate-400">{user.email}</p>
                        </div>
                    </div>

                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Key className="w-5 h-5" />
                        Change Password
                    </h4>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Current Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={data.current_password}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="Enter current password"
                                />
                            </div>
                            {errors.current_password && (
                                <p className="mt-1 text-sm text-red-400">{errors.current_password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="Enter new password"
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {processing ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
