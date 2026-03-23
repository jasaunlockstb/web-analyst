import './globals.css';

export const metadata = {
  title: 'WebAnalyst - Comprehensive Website Audit Tool',
  description: 'Analyze your website SEO, performance, accessibility, and security in seconds.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900"></div>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
        
        <header className="fixed top-0 left-0 right-0 z-50 p-6 glass border-b-white/5">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-extrabold tracking-tight">
              <span className="gradient-text">Web</span>Analyst
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Fitur</a>
              <a href="#" className="hover:text-white transition-colors">Metodologi</a>
              <a href="#" className="hover:text-white transition-colors">Bantuan</a>
            </div>
          </nav>
        </header>

        <main className="pt-24 min-h-screen">
          {children}
        </main>

        <footer className="p-12 border-t border-white/5 bg-slate-950 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="text-xl font-bold mb-4">WebAnalyst</div>
              <p className="text-slate-400 text-sm max-w-xs">
                Memberikan wawasan mendalam tentang kesehatan website Anda dengan standar industri terbaru.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Akses Cepat</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-400">Analisis SEO</a></li>
                <li><a href="#" className="hover:text-blue-400">Cek Performa</a></li>
                <li><a href="#" className="hover:text-blue-400">Laporan Keamanan</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Sosial</h4>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors">T</div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors">G</div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors">L</div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs text-slate-600">
            &copy; 2026 WebAnalyst. Seluruh hak cipta dilindungi.
          </div>
        </footer>
      </body>
    </html>
  );
}
