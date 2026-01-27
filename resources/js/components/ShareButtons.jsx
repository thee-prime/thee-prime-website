import { Share2, Facebook, Twitter, Linkedin, Link2, Mail, Send, Check } from 'lucide-react';
import { useState } from 'react';

const ShareButton = ({
    icon: Icon,
    label,
    onClick,
    href,
    colorClass,
    hoverClass
}) => {
    const Component = href ? 'a' : 'button';
    const props = href
        ? { href, target: '_blank', rel: 'noopener noreferrer' }
        : { onClick, type: 'button' };

    return (
        <Component
            {...props}
            className={`group relative flex items-center justify-center p-3 rounded-lg transition-all duration-300 ${colorClass} ${hoverClass} hover:scale-105 hover:shadow-lg`}
            title={label}
        >
            <Icon className="w-5 h-5" />
            <span className="sr-only">{label}</span>

            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {label}
            </span>
        </Component>
    );
};

export default function ShareButtons({ title, url }) {
    const [copied, setCopied] = useState(false);
    const encodedUrl = encodeURIComponent(url || (typeof window !== 'undefined' ? window.location.href : ''));
    const encodedTitle = encodeURIComponent(title);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url || window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Share2 className="w-5 h-5 text-purple-400" />
                <span className="font-medium text-white">Share this article</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                {/* Facebook */}
                <ShareButton
                    icon={Facebook}
                    label="Share on Facebook"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    colorClass="bg-slate-800 text-slate-400 border border-slate-700"
                    hoverClass="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
                />

                {/* Twitter / X */}
                <ShareButton
                    icon={Twitter}
                    label="Share on X (Twitter)"
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    colorClass="bg-slate-800 text-slate-400 border border-slate-700"
                    hoverClass="hover:bg-black hover:text-white hover:border-slate-500"
                />

                {/* LinkedIn */}
                <ShareButton
                    icon={Linkedin}
                    label="Share on LinkedIn"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    colorClass="bg-slate-800 text-slate-400 border border-slate-700"
                    hoverClass="hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
                />

                {/* WhatsApp */}
                <ShareButton
                    icon={({ className }) => (
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={className}
                        >
                            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                        </svg>
                    )}
                    label="Share on WhatsApp"
                    href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                    colorClass="bg-slate-800 text-slate-400 border border-slate-700"
                    hoverClass="hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
                />

                {/* Telegram */}
                <ShareButton
                    icon={Send}
                    label="Share on Telegram"
                    href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
                    colorClass="bg-slate-800 text-slate-400 border border-slate-700"
                    hoverClass="hover:bg-[#0088cc] hover:text-white hover:border-[#0088cc]"
                />

                {/* Email */}
                <ShareButton
                    icon={Mail}
                    label="Share via Email"
                    href={`mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`}
                    colorClass="bg-slate-800 text-slate-400 border border-slate-700"
                    hoverClass="hover:bg-red-500 hover:text-white hover:border-red-500"
                />

                <div className="w-px h-8 bg-slate-700 mx-1"></div>

                {/* Copy Link */}
                <ShareButton
                    icon={copied ? Check : Link2}
                    label={copied ? "Copied!" : "Copy Link"}
                    onClick={handleCopy}
                    colorClass={`bg-slate-800 border border-slate-700 ${copied ? 'text-green-400 border-green-500/50' : 'text-slate-400'}`}
                    hoverClass={copied ? 'cursor-default' : 'hover:bg-purple-600 hover:text-white hover:border-purple-600'}
                />
            </div>
        </div>
    );
}
