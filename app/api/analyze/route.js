<<<<<<< HEAD
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req) {
  try {
    const { url } = await req.json();
    let targetUrl = url;
    if (!targetUrl.startsWith('http')) {
      targetUrl = 'https://' + targetUrl;
    }

    const startTime = Date.now();
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    const html = await response.text();
    const $ = cheerio.load(html);

    // SEO Analysis
    const title = $('title').text();
    const metaDescription = $('meta[name="description"]').attr('content');
    const h1Count = $('h1').length;
    const imagesCount = $('img').length;
    const imagesWithAlt = $('img[alt]').length;

    let seoScore = 0;
    const seoDetails = [];

    if (title.length > 20) { seoScore += 25; seoDetails.push({ label: 'Tag Judul', value: `"${title}" - Judul ditemukan dan memiliki panjang yang baik.`, status: 'success' }); }
    else { seoScore += 10; seoDetails.push({ label: 'Tag Judul', value: title ? `Judul "${title}" terlalu pendek.` : 'Judul tidak ditemukan.', status: title ? 'warning' : 'error' }); }

    if (metaDescription) { seoScore += 25; seoDetails.push({ label: 'Meta Deskripsi', value: 'Deskripsi meta ditemukan.', status: 'success' }); }
    else { seoDetails.push({ label: 'Meta Deskripsi', value: 'Mata deskripsi hilang! Penting untuk CTR di pencarian.', status: 'error' }); }

    if (h1Count === 1) { seoScore += 25; seoDetails.push({ label: 'Tag H1', value: 'Web menggunakan tepat satu tag H1.', status: 'success' }); }
    else { seoDetails.push({ label: 'Tag H1', value: h1Count > 1 ? `Ditemukan ${h1Count} tag H1, sebaiknya hanya satu.` : 'Tag H1 tidak ditemukan.', status: 'warning' }); }

    if (imagesCount > 0 && imagesWithAlt === imagesCount) { seoScore += 25; seoDetails.push({ label: 'Alt Image', value: 'Semua gambar memiliki tag alt.', status: 'success' }); }
    else if (imagesCount > 0) { seoScore += 10; seoDetails.push({ label: 'Alt Image', value: `${imagesCount - imagesWithAlt} dari ${imagesCount} gambar tidak memiliki tag alt.`, status: 'warning' }); }
    else { seoScore += 25; seoDetails.push({ label: 'Alt Image', value: 'Tidak ada gambar untuk dianalisa.', status: 'success' }); }

    // Security Analysis
    const isHttps = targetUrl.startsWith('https');
    const xFrameOptions = response.headers.get('x-frame-options');
    const xContentTypeOptions = response.headers.get('x-content-type-options');
    
    let securityScore = 0;
    const securityDetails = [];

    if (isHttps) { securityScore += 40; securityDetails.push({ label: 'Koneksi HTTPS', value: 'Website menggunakan koneksi aman.', status: 'success' }); }
    else { securityDetails.push({ label: 'Koneksi HTTPS', value: 'Website tidak menggunakan HTTPS!', status: 'error' }); }

    if (xFrameOptions) { securityScore += 30; securityDetails.push({ label: 'X-Frame-Options', value: `Ditemukan: ${xFrameOptions}. Melindungi dari clickjacking.`, status: 'success' }); }
    else { securityDetails.push({ label: 'X-Frame-Options', value: 'Header X-Frame-Options hilang.', status: 'warning' }); }

    if (xContentTypeOptions) { securityScore += 30; securityDetails.push({ label: 'X-Content-Type-Options', value: 'Header X-Content-Type-Options aktif.', status: 'success' }); }
    else { securityDetails.push({ label: 'X-Content-Type-Options', value: 'Header X-Content-Type-Options hilang.', status: 'warning' }); }

    // Performance (Simulation based on load time)
    let perfScore = Math.max(0, 100 - Math.floor(loadTime / 50));
    
    // Accessibility
    let accessScore = 85; // Base score, could be improved with more checks
    if ($('html').attr('lang')) accessScore += 15;
    else accessScore -= 10;

    return NextResponse.json({
      seo: { score: seoScore, details: seoDetails },
      security: { score: securityScore, details: securityDetails },
      performance: { score: perfScore, details: [{ label: 'Waktu Respon', value: `${loadTime}ms`, status: loadTime < 500 ? 'success' : 'warning' }] },
      accessibility: { score: Math.min(100, accessScore), details: [{ label: 'Bahasa Dokumen', value: $('html').attr('lang') || 'Tidak ditentukan', status: $('html').attr('lang') ? 'success' : 'warning' }] }
    });
  } catch (error) {
    console.error('Audit error:', error);
    return NextResponse.json({ error: 'Failed to analyze website' }, { status: 500 });
  }
}
=======
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req) {
  try {
    const { url } = await req.json();
    let targetUrl = url;
    if (!targetUrl.startsWith('http')) {
      targetUrl = 'https://' + targetUrl;
    }

    const startTime = Date.now();
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    const html = await response.text();
    const $ = cheerio.load(html);

    // SEO Analysis
    const title = $('title').text();
    const metaDescription = $('meta[name="description"]').attr('content');
    const h1Count = $('h1').length;
    const imagesCount = $('img').length;
    const imagesWithAlt = $('img[alt]').length;

    let seoScore = 0;
    const seoDetails = [];

    if (title.length > 20) { seoScore += 25; seoDetails.push({ label: 'Tag Judul', value: `"${title}" - Judul ditemukan dan memiliki panjang yang baik.`, status: 'success' }); }
    else { seoScore += 10; seoDetails.push({ label: 'Tag Judul', value: title ? `Judul "${title}" terlalu pendek.` : 'Judul tidak ditemukan.', status: title ? 'warning' : 'error' }); }

    if (metaDescription) { seoScore += 25; seoDetails.push({ label: 'Meta Deskripsi', value: 'Deskripsi meta ditemukan.', status: 'success' }); }
    else { seoDetails.push({ label: 'Meta Deskripsi', value: 'Mata deskripsi hilang! Penting untuk CTR di pencarian.', status: 'error' }); }

    if (h1Count === 1) { seoScore += 25; seoDetails.push({ label: 'Tag H1', value: 'Web menggunakan tepat satu tag H1.', status: 'success' }); }
    else { seoDetails.push({ label: 'Tag H1', value: h1Count > 1 ? `Ditemukan ${h1Count} tag H1, sebaiknya hanya satu.` : 'Tag H1 tidak ditemukan.', status: 'warning' }); }

    if (imagesCount > 0 && imagesWithAlt === imagesCount) { seoScore += 25; seoDetails.push({ label: 'Alt Image', value: 'Semua gambar memiliki tag alt.', status: 'success' }); }
    else if (imagesCount > 0) { seoScore += 10; seoDetails.push({ label: 'Alt Image', value: `${imagesCount - imagesWithAlt} dari ${imagesCount} gambar tidak memiliki tag alt.`, status: 'warning' }); }
    else { seoScore += 25; seoDetails.push({ label: 'Alt Image', value: 'Tidak ada gambar untuk dianalisa.', status: 'success' }); }

    // Security Analysis
    const isHttps = targetUrl.startsWith('https');
    const xFrameOptions = response.headers.get('x-frame-options');
    const xContentTypeOptions = response.headers.get('x-content-type-options');
    
    let securityScore = 0;
    const securityDetails = [];

    if (isHttps) { securityScore += 40; securityDetails.push({ label: 'Koneksi HTTPS', value: 'Website menggunakan koneksi aman.', status: 'success' }); }
    else { securityDetails.push({ label: 'Koneksi HTTPS', value: 'Website tidak menggunakan HTTPS!', status: 'error' }); }

    if (xFrameOptions) { securityScore += 30; securityDetails.push({ label: 'X-Frame-Options', value: `Ditemukan: ${xFrameOptions}. Melindungi dari clickjacking.`, status: 'success' }); }
    else { securityDetails.push({ label: 'X-Frame-Options', value: 'Header X-Frame-Options hilang.', status: 'warning' }); }

    if (xContentTypeOptions) { securityScore += 30; securityDetails.push({ label: 'X-Content-Type-Options', value: 'Header X-Content-Type-Options aktif.', status: 'success' }); }
    else { securityDetails.push({ label: 'X-Content-Type-Options', value: 'Header X-Content-Type-Options hilang.', status: 'warning' }); }

    // Performance (Simulation based on load time)
    let perfScore = Math.max(0, 100 - Math.floor(loadTime / 50));
    
    // Accessibility
    let accessScore = 85; // Base score, could be improved with more checks
    if ($('html').attr('lang')) accessScore += 15;
    else accessScore -= 10;

    return NextResponse.json({
      seo: { score: seoScore, details: seoDetails },
      security: { score: securityScore, details: securityDetails },
      performance: { score: perfScore, details: [{ label: 'Waktu Respon', value: `${loadTime}ms`, status: loadTime < 500 ? 'success' : 'warning' }] },
      accessibility: { score: Math.min(100, accessScore), details: [{ label: 'Bahasa Dokumen', value: $('html').attr('lang') || 'Tidak ditentukan', status: $('html').attr('lang') ? 'success' : 'warning' }] }
    });
  } catch (error) {
    console.error('Audit error:', error);
    return NextResponse.json({ error: 'Failed to analyze website' }, { status: 500 });
  }
}
>>>>>>> 3f2e337acfe6c557c22c7fe856cf0926972b4328
