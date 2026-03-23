<<<<<<< HEAD
'use client';

import { useState } from 'react';
import { Search, Globe, Shield, Zap, Accessibility, ChevronRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error('Gagal menganalisis website. Pastikan URL benar.');

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Audit Website Anda <br />
          <span className="gradient-text">Dalam Hitungan Detik</span>
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Dapatkan skor mendalam untuk SEO, Performa, Aksesibilitas, dan Keamanan dengan satu klik sederhana.
        </p>

        <form onSubmit={handleAnalyze} className="max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
          <div className="relative flex items-center glass rounded-2xl p-2 shadow-2xl">
            <div className="pl-4 text-slate-500">
              <Search size={24} />
            </div>
            <input
              type="text"
              placeholder="Masukkan URL website (contoh: https://google.com)"
              className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-lg text-white placeholder-slate-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !url}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 px-10 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Menganalisis...
                </>
              ) : (
                'Analisis Sekarang'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-8 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 flex items-center justify-center gap-3 animate-bounce">
            <AlertCircle size={20} />
            {error}
          </div>
        )}
      </section>

      {/* Results Section */}
      {results && (
        <section className="animate-in fade-in zoom-in duration-500 space-y-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ScoreCard title="SEO" score={results.seo.score} icon={<Globe className="text-blue-400" />} />
            <ScoreCard title="Performa" score={results.performance.score} icon={<Zap className="text-yellow-400" />} />
            <ScoreCard title="Aksesibilitas" score={results.accessibility.score} icon={<Accessibility className="text-emerald-400" />} />
            <ScoreCard title="Keamanan" score={results.security.score} icon={<Shield className="text-red-400" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DetailSection title="Analisis SEO" data={results.seo.details} />
            <DetailSection title="Keamanan & Header" data={results.security.details} />
          </div>
        </section>
      )}

      {/* Feature Section */}
      {!results && !loading && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pb-20">
          <FeatureItem
            icon={<Zap className="text-yellow-400" />}
            title="Analisis Cepat"
            desc="Teknologi pemindaian terbaru kami memberikan hasil dalam waktu kurang dari 5 detik."
          />
          <FeatureItem
            icon={<Shield className="text-blue-400" />}
            title="Sesuai Standar"
            desc="Menggunakan standar industri dari Google Lighthouse dan OWASP untuk hasil akurat."
          />
          <FeatureItem
            icon={<CheckCircle2 className="text-emerald-400" />}
            title="Laporan Detail"
            desc="Dapatkan panduan langkah-demi-langkah untuk memperbaiki masalah di website Anda."
          />
        </section>
      )}
    </div>
  );
}

function ScoreCard({ title, score, icon }) {
  const getScoreColor = (s) => {
    if (s >= 90) return 'text-emerald-400';
    if (s >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBgColor = (s) => {
    if (s >= 90) return 'bg-emerald-400/10';
    if (s >= 70) return 'bg-yellow-400/10';
    return 'bg-red-400/10';
  };

  return (
    <div className="glass rounded-3xl p-8 flex flex-col items-center text-center card-hover">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${getBgColor(score)}`}>
        {icon}
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-widest">{title}</h3>
      <div className={`text-5xl font-black ${getScoreColor(score)}`}>{score}</div>
      <div className="w-full bg-slate-800 h-2 rounded-full mt-6 overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-out`} 
          style={{ 
            width: `${score}%`, 
            backgroundColor: score >= 90 ? '#10b981' : score >= 70 ? '#fbc02d' : '#ef4444' 
          }}
        ></div>
      </div>
    </div>
  );
}

function DetailSection({ title, data }) {
  return (
    <div className="glass rounded-3xl p-8 border-white/5">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
        {title}
      </h3>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors group">
            <div className={`mt-1 flex-shrink-0 ${item.status === 'success' ? 'text-emerald-500' : item.status === 'warning' ? 'text-yellow-500' : 'text-red-500'}`}>
              {item.status === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-slate-200 flex justify-between">
                {item.label}
                <span className="text-xs font-normal text-slate-500 group-hover:text-slate-300 transition-colors uppercase">Info</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <div className="glass rounded-3xl p-8 card-hover group">
      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  );
}
=======
'use client';

import { useState } from 'react';
import { Search, Globe, Shield, Zap, Accessibility, ChevronRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error('Gagal menganalisis website. Pastikan URL benar.');

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Audit Website Anda <br />
          <span className="gradient-text">Dalam Hitungan Detik</span>
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Dapatkan skor mendalam untuk SEO, Performa, Aksesibilitas, dan Keamanan dengan satu klik sederhana.
        </p>

        <form onSubmit={handleAnalyze} className="max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
          <div className="relative flex items-center glass rounded-2xl p-2 shadow-2xl">
            <div className="pl-4 text-slate-500">
              <Search size={24} />
            </div>
            <input
              type="text"
              placeholder="Masukkan URL website (contoh: https://google.com)"
              className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-lg text-white placeholder-slate-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !url}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 px-10 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Menganalisis...
                </>
              ) : (
                'Analisis Sekarang'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-8 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 flex items-center justify-center gap-3 animate-bounce">
            <AlertCircle size={20} />
            {error}
          </div>
        )}
      </section>

      {/* Results Section */}
      {results && (
        <section className="animate-in fade-in zoom-in duration-500 space-y-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ScoreCard title="SEO" score={results.seo.score} icon={<Globe className="text-blue-400" />} />
            <ScoreCard title="Performa" score={results.performance.score} icon={<Zap className="text-yellow-400" />} />
            <ScoreCard title="Aksesibilitas" score={results.accessibility.score} icon={<Accessibility className="text-emerald-400" />} />
            <ScoreCard title="Keamanan" score={results.security.score} icon={<Shield className="text-red-400" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DetailSection title="Analisis SEO" data={results.seo.details} />
            <DetailSection title="Keamanan & Header" data={results.security.details} />
          </div>
        </section>
      )}

      {/* Feature Section */}
      {!results && !loading && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pb-20">
          <FeatureItem
            icon={<Zap className="text-yellow-400" />}
            title="Analisis Cepat"
            desc="Teknologi pemindaian terbaru kami memberikan hasil dalam waktu kurang dari 5 detik."
          />
          <FeatureItem
            icon={<Shield className="text-blue-400" />}
            title="Sesuai Standar"
            desc="Menggunakan standar industri dari Google Lighthouse dan OWASP untuk hasil akurat."
          />
          <FeatureItem
            icon={<CheckCircle2 className="text-emerald-400" />}
            title="Laporan Detail"
            desc="Dapatkan panduan langkah-demi-langkah untuk memperbaiki masalah di website Anda."
          />
        </section>
      )}
    </div>
  );
}

function ScoreCard({ title, score, icon }) {
  const getScoreColor = (s) => {
    if (s >= 90) return 'text-emerald-400';
    if (s >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBgColor = (s) => {
    if (s >= 90) return 'bg-emerald-400/10';
    if (s >= 70) return 'bg-yellow-400/10';
    return 'bg-red-400/10';
  };

  return (
    <div className="glass rounded-3xl p-8 flex flex-col items-center text-center card-hover">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${getBgColor(score)}`}>
        {icon}
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-widest">{title}</h3>
      <div className={`text-5xl font-black ${getScoreColor(score)}`}>{score}</div>
      <div className="w-full bg-slate-800 h-2 rounded-full mt-6 overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-out`} 
          style={{ 
            width: `${score}%`, 
            backgroundColor: score >= 90 ? '#10b981' : score >= 70 ? '#fbc02d' : '#ef4444' 
          }}
        ></div>
      </div>
    </div>
  );
}

function DetailSection({ title, data }) {
  return (
    <div className="glass rounded-3xl p-8 border-white/5">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
        {title}
      </h3>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors group">
            <div className={`mt-1 flex-shrink-0 ${item.status === 'success' ? 'text-emerald-500' : item.status === 'warning' ? 'text-yellow-500' : 'text-red-500'}`}>
              {item.status === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-slate-200 flex justify-between">
                {item.label}
                <span className="text-xs font-normal text-slate-500 group-hover:text-slate-300 transition-colors uppercase">Info</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <div className="glass rounded-3xl p-8 card-hover group">
      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  );
}
>>>>>>> 3f2e337acfe6c557c22c7fe856cf0926972b4328
