# Meme Ho Design

Situs HTML, CSS dan JavaScript statis, siap dibuka langsung atau diunggah ke GitHub Pages.

## Buka lokal
Klik dua kali `index.html`. Tidak perlu Node.js, instalasi paket, atau proses build.

## GitHub Pages
1. Buat repository GitHub dan unggah **isi** folder ini ke root repository. Pastikan `index.html`, `style.css`, `script.js`, `.nojekyll`, dan folder `assets` ikut terunggah.
2. Buka **Settings → Pages**.
3. Pilih **Deploy from a branch**, branch `main`, folder `/ (root)` dan simpan.
4. GitHub akan menampilkan alamat situs setelah deployment selesai.

Semua alamat aset bersifat relatif, sehingga cocok dengan alamat repository GitHub Pages.

## Isi dan interaksi
- Hero mengikuti susunan dan urutan masuk referensi video, dengan identitas Meme Ho.
- Pilihan depan/belakang menggunakan PNG transparan yang dikompresi ke WebP, tanpa menghilangkan transparansi.
- Navigasi ponsel dapat ditutup dengan Escape.
- Tab grafis mendukung tombol panah, Home, End dan keyboard.
- Tombol ukuran penuh membuka dialog asli browser; Escape menutupnya.
- Mockup desain asli ditampilkan langsung pada bagian Studio.
- Gerakan mengikuti pengaturan reduced motion. Konten tetap tersedia tanpa JavaScript.

## Aset
`front-art.png`, `back-art.png` dan mockup `shirt` berasal dari referensi pengguna. Foto model dan still life adalah visual kampanye yang dibuat dengan AI dari desain tersebut. Grafis asli tetap digunakan pada detail untuk mempertahankan akurasi desain. WebP digunakan untuk foto di halaman agar lebih ringan; Grafis asli tetap disimpan sebagai PNG.

## Mengubah situs
- Teks dan susunan: `index.html`.
- Warna, ukuran, breakpoint dan animasi pembuka: `style.css`.
- Navigasi, pergantian gambar, tab dan dialog: `script.js`.

Situs ini adalah portfolio/presentasi desain. Tidak menyertakan checkout atau pengiriman formulir ke server.

## Grafis belakang HD
`back-art-hd.svg` adalah rekonstruksi vektor transparan dari grafis belakang, digunakan di halaman dan tampilan penuh. `back-art-hd.png` adalah ekspor transparan 3459 × 4092 piksel. PNG asli `back-art.png` dipertahankan sebagai sumber.
