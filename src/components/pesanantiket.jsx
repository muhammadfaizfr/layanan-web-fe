// src/components/PesanTiket.jsx
import React, { useState } from "react";

function PesanTiket({ isOpen, onClose, ticketCount, incrementTicket, decrementTicket, totalPrice, formatRupiah, onProceed }) {
  // if parent explicitly passes isOpen=false, hide. If undefined, render (for backward compatibility)
  if (isOpen === false) return null

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [keterangan, setKeterangan] = useState("");

  // internal ticket state/fallbacks if parent doesn't control it
  const [localCount, setLocalCount] = useState(ticketCount ?? 1);
  const tc = ticketCount ?? localCount;
  const inc = incrementTicket ?? (() => setLocalCount((c) => c + 1));
  const dec = decrementTicket ?? (() => setLocalCount((c) => Math.max(1, c - 1)));

  const unitPrice = 25000;
  const computedTotal = totalPrice ?? tc * unitPrice;
  const fmt = formatRupiah ?? ((n) => `IDR ${n.toLocaleString("id-ID")}`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/20 backdrop-blur-md">
      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-[0_40px_80px_rgba(22,52,34,0.12)] overflow-hidden">
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-container transition-colors group"
        >
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface">close</span>
        </button>

        {/* MODAL HEADER */}
        <div className="px-6 pt-6 pb-6 border-b border-outline-variant/10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-secondary"></span>
            <span className="text-secondary font-label text-[10px] uppercase tracking-[0.2em] font-semibold">Reservasi Digital</span>
          </div>
          <h2 className="text-3xl font-extrabold text-primary tracking-tighter">Pesan Tiket Kunjungan</h2>
          <p className="text-on-surface-variant mt-2 body-md">Lengkapi data untuk akses eksklusif ke kawah Galunggung.</p>
        </div>

        {/* MODAL BODY / FORM */}
        <form
          className="p-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            const order = {
              name,
              date,
              keterangan,
              qty: tc,
              unitPrice,
              total: computedTotal,
            }
            console.log('order', order)
            if (typeof onProceed === 'function') {
              onProceed(order)
            } else {
              alert(`Pesanan:\nNama: ${name || "-"}\nTanggal: ${date || "-"}\nJumlah: ${tc}\nKeterangan: ${keterangan || "-"}\nTotal: ${fmt(computedTotal)}`)
            }
          }}
        >
          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-primary/60 uppercase tracking-wider ml-1">Nama Lengkap</label>
            <div className="relative">
              <input
                className="w-full mt-2 px-4 py-3 bg-surface-container-low placeholder:text-on-surface-variant/40 rounded-lg text-on-surface"
                placeholder="Sesuai kartu identitas"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Picker Mockup */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-primary/60 uppercase tracking-wider ml-1">Tanggal Kunjungan</label>
              <div className="relative">
                <input
                  className="w-full mt-2 px-4 py-3 bg-white rounded-lg text-on-surface appearance-none"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">calendar_month</span>
              </div>
            </div>

            {/* Stepper */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-primary/60 uppercase tracking-wider ml-1">Jumlah Tiket</label>
              <div className="flex items-center bg-surface-container-low rounded-lg p-1">
                <button
                  onClick={dec}
                  className="w-12 h-12 flex items-center justify-center text-primary hover:bg-surface-container-high rounded-md transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="flex-1 text-center font-bold text-on-surface">{tc}</span>
                <button
                  onClick={inc}
                  className="w-12 h-12 flex items-center justify-center text-primary hover:bg-surface-container-high rounded-md transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Keterangan */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-primary/60 uppercase tracking-wider ml-1">Keterangan</label>
            <textarea
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Catatan tambahan (opsional)"
              rows={3}
              className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg placeholder:text-on-surface-variant/40 text-on-surface font-medium resize-none"
            />
          </div>

          {/* Summary Card */}
          <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-outline-variant/10">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-on-surface-variant">Harga Satuan</span>
                <span className="text-sm font-semibold text-on-surface">IDR {unitPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium text-on-surface-variant">Subtotal</span>
                <div className="text-sm font-semibold text-on-surface">{tc} × IDR {unitPrice.toLocaleString('id-ID')}</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-primary font-bold">Total Pembayaran</span>
              <span className="text-xl font-extrabold text-primary tracking-tight">{fmt(computedTotal)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            className="w-full py-5 bg-primary text-on-primary rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(22,52,34,0.15)] hover:bg-primary/95 active:scale-[0.98] transition-all group" 
            type="submit"
          >
            Lanjutkan Pembayaran
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
          <p className="text-center text-[11px] text-on-surface-variant px-4">
            Dengan melanjutkan, Anda menyetujui <a className="underline font-semibold hover:text-primary" href="#">Syarat &amp; Ketentuan</a> serta kebijakan privasi pendakian Galunggung.
          </p>
        </form>
      </div>
    </div>
  );
}

export default PesanTiket;