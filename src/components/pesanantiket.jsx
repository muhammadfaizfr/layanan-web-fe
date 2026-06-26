import React, { useState, useEffect } from "react";
import pengaturanService from "../services/pengaturanService";

function PesanTiket({ isOpen, onClose, ticketCount, incrementTicket, decrementTicket, totalPrice, formatRupiah, onProceed, order }) {
  if (isOpen === false) return null;

  const isRegularTicket = order && !order.route;

  const [name, setName] = useState(isRegularTicket ? (order.name || "") : "");
  const [date, setDate] = useState(isRegularTicket ? (order.date || new Date().toISOString().slice(0, 10)) : new Date().toISOString().slice(0, 10));
  const [keterangan, setKeterangan] = useState(isRegularTicket ? (order.keterangan || "") : "");
  const [noIdentitas, setNoIdentitas] = useState(isRegularTicket ? (order.noIdentitas || "") : "");
  const [email, setEmail] = useState(isRegularTicket ? (order.email || "") : "");
  const [jenisTiket, setJenisTiket] = useState(isRegularTicket ? (order.jenisTiket || "Wisatawan Lokal") : "Wisatawan Lokal");
  const [noHp, setNoHp] = useState(isRegularTicket ? (order.noHp || "") : "");

  const [localCount, setLocalCount] = useState(ticketCount ?? 1);
  const tc = ticketCount ?? localCount;
  const inc = incrementTicket ?? (() => setLocalCount((c) => c + 1));
  const dec = decrementTicket ?? (() => setLocalCount((c) => Math.max(1, c - 1)));

  const [hargaLokal, setHargaLokal] = useState(15000);
  const [hargaMancanegara, setHargaMancanegara] = useState(35000);

  useEffect(() => {
    const fetchHarga = async () => {
      try {
        const res = await pengaturanService.get();
        if (res.data) {
          setHargaLokal(res.data.harga_lokal || 15000);
          setHargaMancanegara(res.data.harga_mancanegara || 35000);
        }
      } catch (err) {
        console.error("Gagal memuat harga tiket", err);
      }
    };
    fetchHarga();
  }, []);

  const unitPrice = jenisTiket === "Wisatawan Mancanegara" ? hargaMancanegara : hargaLokal;
  const computedTotal = totalPrice ?? tc * unitPrice;
  const fmt = formatRupiah ?? ((n) => `Rp ${n.toLocaleString("id-ID")}`);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(22,52,34,0.35)", backdropFilter: "blur(8px)" }}
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* MODAL WRAPPER — relative so X button can anchor to it */}
      <div className="relative w-full max-w-md" style={{ maxHeight: "90vh" }}>

        {/* ===== TOMBOL X — DI LUAR modal card, selalu terlihat ===== */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Tutup"
          style={{
            position: "absolute",
            top: "-14px",
            right: "-14px",
            zIndex: 9999,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#163422",
            color: "#fff",
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            fontSize: "18px",
            fontWeight: "bold",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* MODAL CARD */}
        <div
          className="bg-white rounded-2xl shadow-2xl flex flex-col"
          style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          {/* HEADER */}
          <div className="px-6 pt-6 pb-5 border-b border-gray-100 flex-shrink-0">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-secondary"></span>
              <span className="text-secondary font-label text-[10px] uppercase tracking-[0.2em] font-semibold">Reservasi Digital</span>
            </div>
            <h2 className="text-3xl font-extrabold text-primary tracking-tighter">Pesan Tiket Kunjungan</h2>
            <p className="text-on-surface-variant mt-1 text-sm">Lengkapi data untuk akses eksklusif ke kawah Galunggung.</p>
          </div>

          {/* FORM BODY */}
          <form
            className="p-6 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const orderData = { name, date, keterangan, qty: tc, unitPrice, total: computedTotal, noIdentitas, email, jenisTiket, noHp };
              if (typeof onProceed === "function") {
                onProceed(orderData);
              } else {
                alert(`Pesanan:\nNama: ${name || "-"}\nTanggal: ${date || "-"}\nJumlah: ${tc}\nTotal: ${fmt(computedTotal)}`);
              }
            }}
          >
            {/* Nama */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 uppercase tracking-wider mb-2">Nama Lengkap</label>
              <input
                className="w-full px-4 py-3 bg-gray-50 rounded-lg text-on-surface placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/30 transition"
                placeholder="Sesuai kartu identitas"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* No. Identitas */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 uppercase tracking-wider mb-2">No. Identitas (KTP/Paspor)</label>
              <input
                className="w-full px-4 py-3 bg-gray-50 rounded-lg text-on-surface placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/30 transition"
                placeholder="Masukkan nomor KTP atau Paspor"
                type="text"
                value={noIdentitas}
                onChange={(e) => setNoIdentitas(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-primary/60 uppercase tracking-wider mb-2">Email</label>
                <input
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-on-surface placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/30 transition"
                  placeholder="email@contoh.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* No. HP */}
              <div>
                <label className="block text-xs font-semibold text-primary/60 uppercase tracking-wider mb-2">No. HP</label>
                <input
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-on-surface placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/30 transition"
                  placeholder="08xxxxxxxxx"
                  type="tel"
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Jenis Tiket */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 uppercase tracking-wider mb-2">Jenis Tiket</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setJenisTiket("Wisatawan Lokal")}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                    jenisTiket === "Wisatawan Lokal"
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  🇮🇩 Wisatawan Lokal
                </button>
                <button
                  type="button"
                  onClick={() => setJenisTiket("Wisatawan Mancanegara")}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                    jenisTiket === "Wisatawan Mancanegara"
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  🌍 Mancanegara
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Tanggal */}
              <div>
                <label className="block text-xs font-semibold text-primary/60 uppercase tracking-wider mb-2">Tanggal Kunjungan</label>
                <input
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-on-surface outline-none focus:ring-2 focus:ring-primary/30 transition"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              {/* Jumlah Tiket */}
              <div>
                <label className="block text-xs font-semibold text-primary/60 uppercase tracking-wider mb-2">Jumlah Tiket</label>
                <div className="flex items-center bg-gray-50 rounded-lg px-2 py-1 gap-2">
                  <button
                    onClick={dec}
                    type="button"
                    className="w-10 h-10 flex items-center justify-center text-primary hover:bg-gray-200 rounded-md transition font-bold text-xl"
                  >−</button>
                  <span className="flex-1 text-center font-bold text-on-surface text-lg">{tc}</span>
                  <button
                    onClick={inc}
                    type="button"
                    className="w-10 h-10 flex items-center justify-center text-primary hover:bg-gray-200 rounded-md transition font-bold text-xl"
                  >+</button>
                </div>
              </div>
            </div>

            {/* Keterangan */}
            <div>
              <label className="block text-xs font-semibold text-primary/60 uppercase tracking-wider mb-2">Keterangan</label>
              <textarea
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                placeholder="Catatan tambahan (opsional)"
                rows={2}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg text-on-surface placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/30 resize-none transition"
              />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-200">
                <div>
                  <span className="text-xs text-gray-500 block">Jenis Tiket</span>
                  <span className="text-sm font-semibold text-on-surface">{jenisTiket}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Harga Satuan</span>
                  <span className="text-sm font-semibold text-on-surface">IDR {unitPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary">Total Pembayaran ({tc}x)</span>
                <span className="text-xl font-extrabold text-primary">{fmt(computedTotal)}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:bg-primary/90 active:scale-[0.98] transition-all"
            >
              Lanjutkan Pembayaran
              <span style={{ fontSize: "20px" }}>→</span>
            </button>

            <p className="text-center text-[11px] text-gray-400 px-4">
              Dengan melanjutkan, Anda menyetujui <a className="underline font-semibold hover:text-primary" href="#">Syarat &amp; Ketentuan</a> kami.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PesanTiket;