# Web Analyst

Sebuah alat audit website modern yang dibangun dengan Next.js. Alat ini menganalisis SEO, Performa, Aksesibilitas, dan Keamanan sebuah website secara instan.

## Fitur

- **Audit SEO**: Mengecek Judul, Meta Deskripsi, Tag H1, dan Alt Image.
- **Keamanan**: Memeriksa penggunaan HTTPS dan header keamanan penting (X-Frame-Options, X-Content-Type-Options).
- **Performa**: Simulasi waktu muat server.
- **Aksesibilitas**: Pengecekan atribut bahasa HTML.
- **Desain Premium**: Antarmuka berbasis Glassmorphism dengan animasi halus.

## Cara Deploy ke Vercel

1. **Upload ke GitHub**: Buat repositori baru di GitHub dan unggah semua file di folder ini.
2. **Hubungkan ke Vercel**:
   - Masuk ke [Vercel](https://vercel.com).
   - Klik "Add New..." -> "Project".
   - Pilih repositori GitHub Anda.
3. **Deploy**: Klik "Deploy". Vercel akan secara otomatis mendeteksi Next.js dan melakukan build.

## Pengembangan Lokal

Jika Anda menginstal Node.js di masa depan:

```bash
npm install
npm run dev
```
