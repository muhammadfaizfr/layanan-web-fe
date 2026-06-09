<?php
?><!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Login Admin | Gunung Galunggung</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
    <script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "background": "#f9f9f7",
                    "surface-bright": "#f9f9f7",
                    "on-surface": "#1a1c1b",
                    "on-tertiary": "#ffffff",
                    "secondary-fixed": "#f1e1c4",
                    "on-secondary-fixed": "#221a09",
                    "secondary-fixed-dim": "#d4c5a9",
                    "surface": "#f9f9f7",
                    "inverse-primary": "#adcfb4",
                    "surface-container-high": "#e8e8e6",
                    "primary": "#163422",
                    "primary-fixed": "#c8ebd0",
                    "secondary": "#695d47",
                    "outline-variant": "#c2c8c0",
                    "on-primary-container": "#99baa1",
                    "tertiary-container": "#3e4641",
                    "surface-container-low": "#f4f4f2",
                    "primary-container": "#2d4b37",
                    "error": "#ba1a1a",
                    "on-tertiary-fixed": "#161d19",
                    "error-container": "#ffdad6",
                    "surface-container-lowest": "#ffffff",
                    "secondary-container": "#f1e1c4",
                    "primary-fixed-dim": "#adcfb4",
                    "inverse-on-surface": "#f1f1ef",
                    "on-background": "#1a1c1b",
                    "on-surface-variant": "#424843",
                    "surface-tint": "#466550",
                    "surface-container-highest": "#e2e3e1",
                    "outline": "#727972",
                    "on-secondary": "#ffffff",
                    "on-error": "#ffffff",
                    "on-secondary-container": "#6f634c",
                    "surface-dim": "#dadad8",
                    "on-tertiary-fixed-variant": "#414944",
                    "tertiary-fixed": "#dce4de",
                    "on-primary-fixed": "#022110",
                    "on-primary": "#ffffff",
                    "inverse-surface": "#2f3130",
                    "on-error-container": "#93000a",
                    "surface-variant": "#e2e3e1",
                    "tertiary-fixed-dim": "#c0c8c2",
                    "on-secondary-fixed-variant": "#504531",
                    "tertiary": "#28302b",
                    "surface-container": "#eeeeec",
                    "on-tertiary-container": "#acb4ad",
                    "on-primary-fixed-variant": "#2f4d39"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "1.5rem",
                    "full": "9999px"
            },
            "fontFamily": {
                    "headline": ["Plus Jakarta Sans"],
                    "display": ["Plus Jakarta Sans"],
                    "body": ["Inter"],
                    "label": ["Inter"]
            }
          },
        },
      }
    </script>
    <style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .inner-glow {
            box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
        }
    </style>
</head>
<body class="bg-background font-body text-on-surface min-h-screen selection:bg-primary/10 selection:text-primary">
<main class="flex min-h-screen overflow-hidden">
    <!-- Left Section: Atmospheric Visual -->
    <section class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
        <img alt="Gunung Galunggung" class="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80" data-alt="A cinematic, high-resolution aerial view of a dormant volcanic crater nestled within a lush, emerald green Indonesian jungle. Dense mist and morning fog roll softly over the dark volcanic slopes, creating a profound sense of 'The Curated Descent' atmosphere. The lighting is diffused and moody, with deep forest greens and desaturated earthy tones dominating the frame, evoking a premium, editorial feel that aligns with a sophisticated nature-centric brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVemIpoKC5NpztVvzMgQheRcXItUW_-yLhJa-UkT2YZxE00PPCaYOyFPMEFfULZmX5OA-IPGzQ7tszt78FUxUb7YkH8M4p653xsS_mSzgoTjtCG-aCEBF50_utSeBcP-TjLbVilGz9hYOq5ZHRQPvVzFhp5-T2mQOZTNXOokNagxXsiFpeREr5VKV8jFdF9uB3i6Hdu-aCInYHbDkiQu9pnvWGaRhXtYYkzgKTCyKfE7pQbzLPSAVWleMhPIsaJTEv-CrXRqAwEg"/>
        <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
        <div class="relative z-10 flex flex-col justify-end p-20 w-full">
            <div class="max-w-md">
                <span class="font-label text-primary-fixed text-xs uppercase tracking-[0.2em] mb-4 block">Koordinat 7.2583° S, 108.0583° E</span>
                <h1 class="font-display text-surface-bright text-5xl font-bold leading-tight tracking-tight mb-6">
                    Menjaga Keaslian <br/>Alam Galunggung.
                </h1>
                <p class="text-on-primary-container text-lg leading-relaxed font-light opacity-90">
                    Masuk ke sistem manajemen pusat untuk mengelola ekosistem pariwisata yang berkelanjutan dan terkurasi.
                </p>
            </div>
        </div>
        <!-- Asymmetric Accent -->
        <div class="absolute top-12 left-12 w-24 h-24 rounded-full border border-primary-fixed/20 blur-xl"></div>
    </section>

    <!-- Right Section: Login Area -->
    <section class="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 bg-surface">
        <div class="w-full max-w-sm space-y-10">
            <!-- Brand Anchor -->
            <header class="flex flex-col items-center lg:items-start space-y-4">
                <div class="flex items-center space-x-3 group">
                    <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                        <span class="material-symbols-outlined text-surface-bright" style="font-variation-settings: 'FILL' 1;">landscape</span>
                    </div>
                    <span class="font-headline font-bold text-2xl tracking-tighter text-primary">Gunung Galunggung Admin</span>
                </div>
                <div class="text-center lg:text-left">
                    <h2 class="font-display text-2xl font-semibold text-on-surface">Selamat Datang Kembali</h2>
                    <p class="text-on-surface-variant font-light mt-1">Sistem Manajemen Pariwisata Terintegrasi</p>
                </div>
            </header>

            <!-- Form -->
            <form class="space-y-6" method="post">
                <div class="space-y-4">
                    <!-- Email Input -->
                    <div class="space-y-2">
                        <label class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1" for="email">Alamat Email</label>
                        <div class="relative group">
                            <input class="w-full px-5 py-4 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary-container/20 focus:bg-surface-bright transition-all text-on-surface placeholder:text-outline/40 shadow-sm" id="email" name="email" placeholder="nama@galunggung.id" required="" type="email"/>
                            <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 group-focus-within:text-primary transition-colors">mail</span>
                        </div>
                    </div>
                    <!-- Password Input -->
                    <div class="space-y-2">
                        <div class="flex justify-between items-end px-1">
                            <label class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant" for="password">Kata Sandi</label>
                            <a class="text-xs font-medium text-primary hover:underline underline-offset-4 transition-all" href="#">Lupa Kata Sandi?</a>
                        </div>
                        <div class="relative group">
                            <input class="w-full px-5 py-4 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary-container/20 focus:bg-surface-bright transition-all text-on-surface placeholder:text-outline/40 shadow-sm" id="password" name="password" placeholder="••••••••" required="" type="password"/>
                            <button class="absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 hover:text-primary transition-colors flex items-center gap-1" type="button">
                                <span class="material-symbols-outlined text-lg">visibility</span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- CTA -->
                <button class="w-full bg-primary text-on-primary font-headline font-semibold py-4 rounded-full inner-glow flex items-center justify-center space-x-2 active:scale-[0.98] transition-all hover:bg-primary/95 shadow-lg shadow-primary/10" type="submit">
                    <span>Masuk ke Panel Kontrol</span>
                    <span class="material-symbols-outlined text-xl">arrow_right_alt</span>
                </button>
            </form>

            <!-- Security Footer -->
            <footer class="pt-8 border-t border-outline-variant/10 flex flex-col items-center lg:items-start gap-4">
                <div class="flex items-center space-x-2 text-on-surface-variant/60">
                    <span class="material-symbols-outlined text-sm">verified_user</span>
                    <p class="text-[11px] font-label uppercase tracking-widest">Hanya untuk personil resmi</p>
                </div>
                <div class="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-[10px] text-outline font-medium uppercase tracking-tighter">
                    <a class="hover:text-primary transition-colors" href="#">Kebijakan Privasi</a>
                    <a class="hover:text-primary transition-colors" href="#">Syarat Penggunaan</a>
                    <a class="hover:text-primary transition-colors" href="#">Pusat Bantuan</a>
                </div>
            </footer>
        </div>
        <!-- Background Decorative Element -->
        <div class="absolute bottom-0 right-0 w-64 h-64 bg-surface-container-low rounded-tl-[100px] -z-10 opacity-50"></div>
    </section>
</main>

<!-- Global Layout Shell Footer -->
<footer class="fixed bottom-0 left-0 w-full z-10 px-12 py-8 pointer-events-none hidden lg:block">
    <div class="flex justify-between items-center opacity-30 text-on-surface text-[10px] font-label uppercase tracking-widest">
        <div>© 2024 Gunung Galunggung Tourism Management.</div>
        <div class="pointer-events-auto">The Curated Descent.</div>
    </div>
</footer>
</body>
</html>