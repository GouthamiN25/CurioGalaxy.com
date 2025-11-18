import React from 'react';
import { Navigation } from '../components/Navigation';
import { Compass } from 'lucide-react';

interface PlaceholderProps {
    title: string;
    desc: string;
}

export const PlaceholderPage: React.FC<PlaceholderProps> = ({ title, desc }) => {
    return (
        <main className="max-w-7xl mx-auto px-6 text-center pb-20 pt-10">
            <Navigation />
            <div className="mt-20 flex flex-col items-center justify-center min-h-[40vh] space-y-6">
                <Compass size={64} className="text-white/20" />
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="text-white/60 max-w-md">{desc}</p>
                <div className="px-6 py-2 rounded-full border border-dashed border-white/30 text-sm text-white/50">
                    Coming Soon to the Galaxy
                </div>
            </div>
        </main>
    );
};

export const Tales: React.FC = () => <PlaceholderPage title="Tales" desc="Long-form stories about coding adventures and tech discoveries." />;
export const Collection: React.FC = () => <PlaceholderPage title="Collection" desc="Curated lists of essential tools, libraries, and resources." />;
