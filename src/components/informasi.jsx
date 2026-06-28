import React, { useState, useEffect } from "react";
import pengaturanService from "../services/pengaturanService";

function Informasi({ openModal }) {
  const [hargaLokal, setHargaLokal] = useState(15000);
  const [hargaMancanegara, setHargaMancanegara] = useState(35000);
  const [jamBukaSenin, setJamBukaSenin] = useState('07:00');
  const [jamTutupJumat, setJamTutupJumat] = useState('21:00');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHarga = async () => {
      try {
        const res = await pengaturanService.get();
        if (res.data) {
          setHargaLokal(res.data.harga_lokal || 15000);
          setHargaMancanegara(res.data.harga_mancanegara || 35000);
          if (res.data.jam_buka) setJamBukaSenin(res.data.jam_buka);
          if (res.data.jam_tutup) setJamTutupJumat(res.data.jam_tutup);
        }
      } catch (err) {
        console.error("Gagal memuat harga tiket", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHarga();
  }, []);
  return (
    <>
      <header className="max-w-7xl mx-auto px-8 mb-20">
        <span className="font-label text-[10px] tracking-[0.2em] uppercase text-secondary mb-4 block">Panduan Pengunjung</span>
        <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-primary text-editorial mb-6 max-w-2xl leading-tight">
          Informasi &amp; Kesiapan Perjalanan.
        </h1>
        <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
          Segala hal yang perlu Anda ketahui sebelum menapakkan kaki di keajaiban vulkanik Tasikmalaya. Rencanakan perjalanan Anda dengan tepat.
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {/* Jam Operasional */}
        <div className="md:row-span-2 bg-surface-container-low p-10 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="material-symbols-outlined text-primary text-4xl mb-8">schedule</span>
            <h2 className="font-headline text-2xl font-bold text-primary mb-6">Jam Operasional</h2>
            <ul className="space-y-6">
              <li className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                <span className="text-on-surface-variant font-medium">Senin — Jumat</span>
                <span className="text-primary font-bold">{loading ? '...' : `${jamBukaSenin} — ${jamTutupJumat}`}</span>
              </li>
              <li className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                <span className="text-on-surface-variant font-medium">Sabtu — Minggu</span>
                <span className="text-primary font-bold">07:00 — 23:00</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-on-surface-variant font-medium">Libur Nasional</span>
                <span className="text-primary font-bold">Buka</span>
              </li>
            </ul>
          </div>
          <div className="mt-12 p-6 bg-primary-container/10 rounded-xl">
            <p className="text-sm text-primary leading-relaxed">
              *Catatan: Area Kawah ditutup sementara jika aktivitas vulkanik meningkat atau cuaca ekstrem.
            </p>
          </div>
        </div>

        {/* Harga Tiket */}
        <div className="md:col-span-2 bg-primary text-on-primary p-10 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="material-symbols-outlined text-primary-fixed text-4xl mb-6">payments</span>
            <h2 className="font-headline text-2xl font-bold mb-8">Retribusi Tiket Masuk</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-primary-fixed font-label text-xs uppercase tracking-widest">Domestik / Lokal</h3>
                <div className="flex justify-between items-end border-b border-primary-container pb-2">
                  <span className="text-lg">Wisatawan Lokal</span>
                  <span className="text-2xl font-bold">{loading ? '...' : `Rp ${hargaLokal.toLocaleString('id-ID')}`}</span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-primary-fixed font-label text-xs uppercase tracking-widest">Mancanegara</h3>
                <div className="flex justify-between items-end border-b border-primary-container pb-2">
                  <span className="text-lg">International Visitor</span>
                  <span className="text-2xl font-bold">{loading ? '...' : `Rp ${hargaMancanegara.toLocaleString('id-ID')}`}</span>
                </div>
                <div className="flex justify-between items-end border-b border-primary-container pb-2">
                  <span className="text-lg">Parking (Motor/Mobil)</span>
                  <span className="text-2xl font-bold">Rp 5k - 15k</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-l from-on-primary-container to-transparent"></div>
          </div>
        </div>

        {/* Akses Jalan */}
        <div className="md:col-span-2 bg-surface-container-highest p-10 rounded-2xl flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/2">
            <span className="material-symbols-outlined text-secondary text-4xl mb-6">route</span>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">Aksesibilitas &amp; Jalan</h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Terletak 17km dari pusat kota Tasikmalaya. Jalan utama sudah teraspal dengan baik namun memiliki tanjakan yang cukup curam. Pastikan kendaraan dalam kondisi prima.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-surface px-4 py-2 rounded-full text-xs font-semibold text-secondary flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">directions_car</span> Akses Mobil
              </span>
              <span className="bg-surface px-4 py-2 rounded-full text-xs font-semibold text-secondary flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">two_wheeler</span> Akses Motor
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-64 rounded-xl overflow-hidden shadow-sm">
            <img className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700" alt="winding road" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2nwsY_327B-K__jgnsGhaOFil0SfkCbMHCTCV2uCHUKcscg9pUT_N8s8JXpn19T1dhouZ3v5RGobHgXJuUGHWOh7CFsspPB4troCm2N5NYVcFkP4FbJ2aNfid1w08ZRyJErQHle_YTJ4ii3np1IQCkF0HO5YpvaiG7sdAQooYbxkwKNhfQAWd8_OA2HCCDDkyoUHKDPl6f5yZJFk4Z00hPBqRHXft4iK9mmcXNQI8a5Th4xj0POFcq722dYgVRPE6V5ybZaR4gQ" />
          </div>
        </div>
      </section>

      {/* Fasilitas */}
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="font-label text-[10px] tracking-[0.2em] uppercase text-secondary mb-4 block">Fasilitas Publik</span>
            <h2 className="font-headline text-4xl font-bold text-primary text-editorial">Kenyamanan Di Atas Ketinggian</h2>
          </div>
          <p className="text-on-surface-variant max-w-sm text-sm">Kami menyediakan fasilitas penunjang untuk memastikan pengalaman wisata Anda tetap nyaman dan aman di tengah alam liar.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/20 rounded-2xl overflow-hidden">
          {/* 8 facility items – singkat saja, bisa lihat dari kode sebelumnya */}
          <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6"><span className="material-symbols-outlined text-primary text-3xl">local_parking</span></div>
            <h3 className="font-headline font-bold text-primary mb-2">Area Parkir</h3>
            <p className="text-xs text-on-surface-variant">Lahan luas untuk bus, mobil, dan motor di area bawah.</p>
          </div>
          <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6"><span className="material-symbols-outlined text-primary text-3xl">mosque</span></div>
            <h3 className="font-headline font-bold text-primary mb-2">Mushola</h3>
            <p className="text-xs text-on-surface-variant">Tempat ibadah yang bersih dan tenang di beberapa titik.</p>
          </div>
          <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6"><span className="material-symbols-outlined text-primary text-3xl">restaurant</span></div>
            <h3 className="font-headline font-bold text-primary mb-2">Warung Wisata</h3>
            <p className="text-xs text-on-surface-variant">Pusat kuliner lokal yang menyajikan makanan hangat.</p>
          </div>
          <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6"><span className="material-symbols-outlined text-primary text-3xl">wc</span></div>
            <h3 className="font-headline font-bold text-primary mb-2">Toilet Umum</h3>
            <p className="text-xs text-on-surface-variant">Fasilitas sanitasi yang tersebar di area parkir dan kawah.</p>
          </div>
          <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6"><span className="material-symbols-outlined text-primary text-3xl">hot_tub</span></div>
            <h3 className="font-headline font-bold text-primary mb-2">Kolam Air Panas</h3>
            <p className="text-xs text-on-surface-variant">Area berendam air belerang alami untuk relaksasi.</p>
          </div>
          <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6"><span className="material-symbols-outlined text-primary text-3xl">stairs</span></div>
            <h3 className="font-headline font-bold text-primary mb-2">622 Anak Tangga</h3>
            <p className="text-xs text-on-surface-variant">Tangga ikonik menuju puncak kawah dengan pemandangan epik.</p>
          </div>
          <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6"><span className="material-symbols-outlined text-primary text-3xl">camping</span></div>
            <h3 className="font-headline font-bold text-primary mb-2">Camping Ground</h3>
            <p className="text-xs text-on-surface-variant">Area berkemah dengan pemandangan kota Tasikmalaya.</p>
          </div>
          <div className="bg-surface-container-low p-8 flex flex-col items-center text-center hover:bg-surface-container transition-colors">
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-6"><span className="material-symbols-outlined text-primary text-3xl">medical_services</span></div>
            <h3 className="font-headline font-bold text-primary mb-2">Pos Kesehatan</h3>
            <p className="text-xs text-on-surface-variant">Layanan pertolongan pertama untuk keadaan darurat.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="bg-secondary-container rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="relative z-10 max-w-lg">
            <h2 className="font-headline text-3xl font-bold text-on-secondary-container mb-4">Sudah Siap Berpetualang?</h2>
            <p className="text-on-secondary-fixed-variant leading-relaxed">Dapatkan tiket masuk Anda secara online untuk menghindari antrean panjang di gerbang masuk, terutama saat akhir pekan.</p>
          </div>
          <div className="relative z-10 flex gap-4">
            <button onClick={openModal} className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all">Pesan Tiket Sekarang</button>
            <button className="bg-surface-container-lowest text-primary px-8 py-4 rounded-full font-bold hover:bg-surface transition-all">Hubungi Kami</button>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </section>
    </>
  );
}

export default Informasi;