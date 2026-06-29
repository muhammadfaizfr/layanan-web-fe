import React, { useState, useEffect } from "react";
import pengaturanService from "../services/pengaturanService";

function PesanTiket({ isOpen, onClose, ticketCount, incrementTicket, decrementTicket, formatRupiah, onProceed, order }) {
  if (isOpen === false) return null;

  const isRegularTicket = order && !order.route;

  const [name, setName] = useState(isRegularTicket ? (order.name || "") : "");
  const [date, setDate] = useState(isRegularTicket ? (order.date || new Date().toISOString().slice(0, 10)) : new Date().toISOString().slice(0, 10));

  const [localCount, setLocalCount] = useState(ticketCount ?? 1);
  const tc = ticketCount ?? localCount;
  const inc = incrementTicket ?? (() => setLocalCount((c) => c + 1));
  const dec = decrementTicket ?? (() => setLocalCount((c) => Math.max(1, c - 1)));

  const [hargaLokal, setHargaLokal] = useState(15000);
  const [hargaMancanegara, setHargaMancanegara] = useState(35000);
  const [visitorType, setVisitorType] = useState("lokal"); // 'lokal' | 'mancanegara'
  const [loadingHarga, setLoadingHarga] = useState(true);

  useEffect(() => {
    const fetchHarga = async () => {
      try {
        const res = await pengaturanService.get();
        if (res.data) {
          setHargaLokal(Number(res.data.harga_lokal) || 15000);
          setHargaMancanegara(Number(res.data.harga_mancanegara) || 35000);
        }
      } catch (err) {
        console.error("Gagal memuat harga tiket", err);
      } finally {
        setLoadingHarga(false);
      }
    };
    fetchHarga();
  }, []);

  const unitPrice = visitorType === "mancanegara" ? Number(hargaMancanegara) : Number(hargaLokal);
  const tcNumber = Number(tc) || 1;
  const computedTotal = tcNumber * unitPrice;
  const fmt = formatRupiah ?? ((n) => `IDR ${Number(n).toLocaleString("id-ID")}`);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(22,52,34,0.35)", backdropFilter: "blur(8px)" }}
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* MODAL WRAPPER */}
      <div className="relative w-full max-w-[460px] animate-fade-in-up">
        
        {/* MODAL CARD */}
        <div
          className="bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
          style={{ maxHeight: "92vh" }}
        >
          {/* TOMBOL X */}
          <button
            onClick={onClose}
            type="button"
            aria-label="Tutup"
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition-colors z-10"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>close</span>
          </button>

          {/* HEADER */}
          <div className="px-8 pt-8 pb-4 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1.5px] bg-[#a8a192]"></span>
              <span className="text-[#a8a192] font-label text-[10px] uppercase tracking-[0.15em] font-bold">Reservasi Digital</span>
            </div>
            <h2 className="text-[26px] font-extrabold text-[#1a1c1b] tracking-tight leading-tight">Pesan Tiket Kunjungan</h2>
            <p className="text-[#695d47] mt-2 text-[13.5px] leading-relaxed pr-6">Lengkapi data untuk akses eksklusif ke kawah Galunggung.</p>
          </div>

          {/* FORM BODY */}
          {loadingHarga ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20">
              <span className="material-symbols-outlined animate-spin text-primary text-4xl mb-4">progress_activity</span>
              <p className="text-secondary font-medium text-sm">Menyiapkan data pemesanan...</p>
            </div>
          ) : (
          <form
            className="px-8 pb-8 pt-2 overflow-y-auto"
            onSubmit={(e) => {
              e.preventDefault();
              const jenisTiket = visitorType === "mancanegara" ? "Mancanegara" : "Wisatawan Lokal";
              const orderData = { name, date, qty: tcNumber, unitPrice, total: computedTotal, jenisTiket };
              if (typeof onProceed === "function") {
                onProceed(orderData);
              } else {
                alert(`Pesanan:\nNama: ${name || "-"}\nTanggal: ${date || "-"}\nJenis: ${jenisTiket}\nJumlah: ${tc}\nTotal: ${fmt(computedTotal)}`);
              }
            }}
          >
            <div className="space-y-5">
              {/* Nama */}
              <div>
                <label className="block text-[11px] font-bold text-[#695d47] uppercase tracking-widest mb-2">Nama Lengkap</label>
                <input
                  className="w-full px-4 py-3.5 bg-[#f5f5f5] rounded-xl text-[#1a1c1b] font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/20"
                  placeholder="Nama lengkap pengunjung"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Jenis Pengunjung */}
              <div>
                <label className="block text-[11px] font-bold text-[#695d47] uppercase tracking-widest mb-2">Jenis Pengunjung</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setVisitorType("lokal")}
                    className={`relative flex flex-col items-start px-4 py-3.5 rounded-xl border-2 transition-all text-left ${
                      visitorType === "lokal"
                        ? "border-[#163422] bg-[#163422]/5"
                        : "border-gray-200 bg-[#f5f5f5] hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        visitorType === "lokal" ? "border-[#163422]" : "border-gray-400"
                      }`}>
                        {visitorType === "lokal" && <span className="w-2 h-2 rounded-full bg-[#163422]"></span>}
                      </span>
                      <span className={`text-[13px] font-bold ${visitorType === "lokal" ? "text-[#163422]" : "text-gray-600"}`}>
                        🇮🇩 Lokal
                      </span>
                    </div>
                    <span className={`text-[12px] font-black ml-6 ${visitorType === "lokal" ? "text-[#163422]" : "text-gray-500"}`}>
                      {fmt(hargaLokal)}/orang
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitorType("mancanegara")}
                    className={`relative flex flex-col items-start px-4 py-3.5 rounded-xl border-2 transition-all text-left ${
                      visitorType === "mancanegara"
                        ? "border-[#163422] bg-[#163422]/5"
                        : "border-gray-200 bg-[#f5f5f5] hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        visitorType === "mancanegara" ? "border-[#163422]" : "border-gray-400"
                      }`}>
                        {visitorType === "mancanegara" && <span className="w-2 h-2 rounded-full bg-[#163422]"></span>}
                      </span>
                      <span className={`text-[13px] font-bold ${visitorType === "mancanegara" ? "text-[#163422]" : "text-gray-600"}`}>
                        🌍 Mancanegara
                      </span>
                    </div>
                    <span className={`text-[12px] font-black ml-6 ${visitorType === "mancanegara" ? "text-[#163422]" : "text-gray-500"}`}>
                      {fmt(hargaMancanegara)}/orang
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Tanggal */}
                <div>
                  <label className="block text-[11px] font-bold text-[#695d47] uppercase tracking-widest mb-2">Tanggal Kunjungan</label>
                  <input
                    className="w-full px-4 py-3.5 bg-[#f5f5f5] rounded-xl text-[#1a1c1b] font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/20 [color-scheme:light]"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                {/* Jumlah Tiket */}
                <div>
                  <label className="block text-[11px] font-bold text-[#695d47] uppercase tracking-widest mb-2">Jumlah Tiket</label>
                  <div className="flex items-center bg-[#f5f5f5] rounded-xl h-[52px] px-1 border border-transparent focus-within:border-primary/20 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <button
                      onClick={dec}
                      type="button"
                      className="w-10 h-full flex items-center justify-center text-[#1a1c1b] hover:bg-black/5 rounded-lg transition-colors font-black text-xl"
                    >−</button>
                    <span className="flex-1 text-center font-bold text-[#1a1c1b] text-sm">{tcNumber}</span>
                    <button
                      onClick={inc}
                      type="button"
                      className="w-10 h-full flex items-center justify-center text-[#1a1c1b] hover:bg-black/5 rounded-lg transition-colors font-black text-xl"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="bg-[#f5f5f5] rounded-2xl p-5 mt-6 mb-6 border border-gray-100/50 shadow-sm">
              <div className="flex justify-between items-end pb-3 mb-3 border-b border-gray-200/60">
                <div>
                  <span className="text-[11px] font-bold text-[#695d47] block mb-1">Harga Satuan</span>
                  <span className="text-[13px] font-black text-[#1a1c1b]">{fmt(unitPrice)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#695d47] block mb-1">Subtotal</span>
                  <span className="text-[13px] font-black text-[#1a1c1b]">{tcNumber} × {fmt(unitPrice)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-[13px] font-bold text-[#1a1c1b]">Total Pembayaran</span>
                <span className="text-lg font-black text-[#1a1c1b] tracking-tight">{fmt(computedTotal)}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-14 bg-[#163422] text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#1f4a31] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all"
            >
              Lanjutkan Pembayaran
              <span className="material-symbols-outlined text-[20px]" style={{ fontWeight: 600 }}>arrow_forward</span>
            </button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default PesanTiket;