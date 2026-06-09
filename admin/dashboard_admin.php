<?php

?><!DOCTYPE html>
<html class="light" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
    <script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-error": "#ffffff",
                    "on-tertiary": "#ffffff",
                    "error-container": "#ffdad6",
                    "inverse-surface": "#2f3130",
                    "surface-container-highest": "#e2e3e1",
                    "error": "#ba1a1a",
                    "secondary-fixed": "#f1e1c4",
                    "tertiary-fixed": "#dce4de",
                    "on-surface-variant": "#424843",
                    "surface-bright": "#f9f9f7",
                    "surface-variant": "#e2e3e1",
                    "primary-container": "#2d4b37",
                    "on-error-container": "#93000a",
                    "tertiary": "#28302b",
                    "surface-container": "#eeeeec",
                    "on-surface": "#1a1c1b",
                    "on-tertiary-container": "#acb4ad",
                    "primary-fixed": "#c8ebd0",
                    "on-primary-fixed-variant": "#2f4d39",
                    "secondary": "#695d47",
                    "on-primary": "#ffffff",
                    "background": "#f9f9f7",
                    "on-primary-container": "#99baa1",
                    "surface-tint": "#466550",
                    "inverse-primary": "#adcfb4",
                    "primary-fixed-dim": "#adcfb4",
                    "on-secondary-fixed-variant": "#504531",
                    "surface-container-low": "#f4f4f2",
                    "outline-variant": "#c2c8c0",
                    "surface": "#f9f9f7",
                    "tertiary-fixed-dim": "#c0c8c2",
                    "on-secondary-fixed": "#221a09",
                    "surface-container-high": "#e8e8e6",
                    "tertiary-container": "#3e4641",
                    "on-primary-fixed": "#022110",
                    "surface-container-lowest": "#ffffff",
                    "outline": "#727972",
                    "surface-dim": "#dadad8",
                    "on-secondary-container": "#6f634c",
                    "secondary-container": "#f1e1c4",
                    "on-tertiary-fixed-variant": "#414944",
                    "on-background": "#1a1c1b",
                    "on-secondary": "#ffffff",
                    "inverse-on-surface": "#f1f1ef",
                    "secondary-fixed-dim": "#d4c5a9",
                    "on-tertiary-fixed": "#161d19",
                    "primary": "#163422"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "2xl": "1.5rem",
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
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-surface text-on-surface font-body antialiased flex min-h-screen">
<!-- SideNavBar -->
<aside class="h-screen w-72 fixed left-0 top-0 bg-[#f4f4f2] dark:bg-[#1a1c1b] flex flex-col py-8 px-6 gap-2 z-[60] border-r border-outline-variant/10">
    <!-- Logo Header -->
    <div class="flex items-center gap-4 px-2 mb-8">
        <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span class="material-symbols-outlined text-on-primary" style="font-variation-settings: 'FILL' 1;">landscape</span>
        </div>
        <div>
            <h1 class="font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter text-[#163422] dark:text-[#f9f9f7] text-xl leading-none">Galunggung</h1>
            <p class="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary mt-1">Tourism Authority</p>
        </div>
    </div>
    <!-- Navigation Tabs -->
    <nav class="flex-1 space-y-1">
        <!-- Active: Overview -->
        <a class="bg-[#163422] text-[#f9f9f7] rounded-xl shadow-lg shadow-[#163422]/10 flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-transform scale-100 active:scale-98" href="#">
            <span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span>Overview</span>
        </a>
        <a class="text-[#695d47] dark:text-[#a1a1a1] hover:bg-[#e8e8e6] dark:hover:bg-[#2d2f2e] rounded-xl flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all scale-100 active:scale-98" href="#">
            <span class="material-symbols-outlined" data-icon="confirmation_number">confirmation_number</span>
            <span>Ticket Management</span>
        </a>
        <a class="text-[#695d47] dark:text-[#a1a1a1] hover:bg-[#e8e8e6] dark:hover:bg-[#2d2f2e] rounded-xl flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all scale-100 active:scale-98" href="#">
            <span class="material-symbols-outlined" data-icon="landscape">landscape</span>
            <span>Hiking Schedule</span>
        </a>
        <a class="text-[#695d47] dark:text-[#a1a1a1] hover:bg-[#e8e8e6] dark:hover:bg-[#2d2f2e] rounded-xl flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all scale-100 active:scale-98" href="#">
            <span class="material-symbols-outlined" data-icon="group">group</span>
            <span>User Management</span>
        </a>
        <a class="text-[#695d47] dark:text-[#a1a1a1] hover:bg-[#e8e8e6] dark:hover:bg-[#2d2f2e] rounded-xl flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all scale-100 active:scale-98" href="#">
            <span class="material-symbols-outlined" data-icon="analytics">analytics</span>
            <span>Reports</span>
        </a>
        <a class="text-[#695d47] dark:text-[#a1a1a1] hover:bg-[#e8e8e6] dark:hover:bg-[#2d2f2e] rounded-xl flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all scale-100 active:scale-98" href="#">
            <span class="material-symbols-outlined" data-icon="settings">settings</span>
            <span>Settings</span>
        </a>
    </nav>
    <!-- CTA and Footer -->
    <div class="mt-auto space-y-4">
        <button class="w-full bg-primary-container text-on-primary-container py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <span class="material-symbols-outlined text-sm">add</span>
            New Entry
        </button>
        <div class="pt-4 border-t border-outline-variant/20">
            <a class="text-[#695d47] dark:text-[#a1a1a1] hover:bg-[#e8e8e6] dark:hover:bg-[#2d2f2e] rounded-xl flex items-center gap-3 py-3.5 px-4 font-['Inter'] font-medium text-sm transition-all" href="#">
                <span class="material-symbols-outlined" data-icon="help">help</span>
                <span>Help Center</span>
            </a>
        </div>
    </div>
</aside>

<!-- Main Content Canvas -->
<main class="ml-72 flex-1 min-h-screen flex flex-col relative overflow-hidden">
    <!-- TopNavBar -->
    <header class="w-full h-16 bg-[#f9f9f7] dark:bg-[#1a1c1b] shadow-sm opacity-95 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center px-8 font-['Plus_Jakarta_Sans'] text-sm tracking-tight border-b border-outline-variant/10">
        <div class="flex items-center gap-8 w-1/3">
            <div class="relative w-full max-w-sm">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
                <input class="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary-container/20 placeholder:text-outline-variant" placeholder="Search analytics, schedules, or hikers..." type="text"/>
            </div>
        </div>
        <div class="flex items-center gap-6">
            <div class="flex items-center gap-4 border-r border-outline-variant/20 pr-6">
                <button class="p-2 rounded-full hover:bg-surface-container transition-colors relative">
                    <span class="material-symbols-outlined text-primary">notifications</span>
                    <span class="absolute top-2 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
                </button>
                <button class="p-2 rounded-full hover:bg-surface-container transition-colors">
                    <span class="material-symbols-outlined text-primary">settings</span>
                </button>
            </div>
            <div class="flex items-center gap-3 cursor-pointer active:scale-95 duration-200">
                <div class="text-right hidden xl:block">
                    <p class="font-bold text-primary leading-none">Admin Galunggung</p>
                    <p class="text-[10px] text-secondary mt-1">Super Administrator</p>
                </div>
                <div class="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
                    <img alt="Administrator profile" class="w-full h-full object-cover" data-alt="A professional portrait of a senior park administrator in his late 40s with a warm, authoritative expression. He is wearing a minimalist dark green utility shirt that aligns with the forest conservation theme. The background is softly blurred showing a glimpse of a high-tech office with natural wooden textures. The lighting is bright and airy, typical of a modern light-mode administrative dashboard environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP9kHefTuNYQnLdctRKENaSisXtamaIBxslPvK0m4yNQn31vIg34PQcZnSnY4PYnyrpptNh_2oNZuDiMXVDzcUseE6sHhuxfwgublcdO3lgYfPUAkD0eas6mMJBociC8Wp4s2J_v4jcVWlXw10p9-ovOlY6lp2CDjjivJDzQz8zOST_Qo9Z_qYjYSn3xA_wKyJBzMnMu8nnLzz_wQNXK-Pt6T4jr3oHYwHcfs_RWNrKMU8s2QqHJHFgm1IkA_HvzaJyZz6Dnur7g"/>
                </div>
            </div>
        </div>
    </header>

    <!-- Content Area -->
    <div class="p-10 space-y-10">
        <!-- Header Section -->
        <section class="flex justify-between items-end">
            <div>
                <h2 class="text-4xl font-display font-extrabold text-primary tracking-tight">Dashboard Overview</h2>
                <p class="text-secondary body-lg mt-2 font-medium">Monitoring the mist over Gunung Galunggung today.</p>
            </div>
            <div class="flex gap-3">
                <button class="px-6 py-2.5 rounded-full bg-surface-container-high text-on-surface font-semibold text-sm hover:bg-surface-container-highest transition-colors">Export Report</button>
                <button class="px-6 py-2.5 rounded-full bg-primary text-on-primary font-semibold text-sm hover:opacity-95 transition-opacity flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">calendar_today</span>
                    Aug 24, 2024
                </button>
            </div>
        </section>

        <!-- KPI Cards Bento Grid -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Total Visitors -->
            <div class="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_40px_40px_-20px_rgba(22,52,34,0.04)] border border-outline-variant/10 relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span class="material-symbols-outlined text-6xl text-primary" style="font-variation-settings: 'FILL' 1;">person_add</span>
                </div>
                <p class="text-label-md uppercase tracking-widest text-secondary font-bold mb-4">Total Visitors</p>
                <div class="flex items-end gap-3">
                    <h3 class="text-4xl font-display font-extrabold text-primary leading-none">12,482</h3>
                    <span class="text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded-full flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-xs">trending_up</span> +14%
                    </span>
                </div>
                <p class="text-xs text-outline mt-6">vs. previous 30 days</p>
            </div>
            <!-- Tickets Sold -->
            <div class="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_40px_40px_-20px_rgba(22,52,34,0.04)] border border-outline-variant/10 relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span class="material-symbols-outlined text-6xl text-secondary" style="font-variation-settings: 'FILL' 1;">confirmation_number</span>
                </div>
                <p class="text-label-md uppercase tracking-widest text-secondary font-bold mb-4">Tickets Sold</p>
                <div class="flex items-end gap-3">
                    <h3 class="text-4xl font-display font-extrabold text-primary leading-none">8,920</h3>
                    <span class="text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded-full flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-xs">trending_up</span> +8.2%
                    </span>
                </div>
                <p class="text-xs text-outline mt-6">Active bookings today</p>
            </div>
            <!-- Active Hikers -->
            <div class="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_40px_40px_-20px_rgba(22,52,34,0.04)] border border-outline-variant/10 relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span class="material-symbols-outlined text-6xl text-primary-container" style="font-variation-settings: 'FILL' 1;">hiking</span>
                </div>
                <p class="text-label-md uppercase tracking-widest text-secondary font-bold mb-4">Active Hikers</p>
                <div class="flex items-end gap-3">
                    <h3 class="text-4xl font-display font-extrabold text-primary leading-none">154</h3>
                    <span class="text-xs font-bold text-on-error-container bg-error-container px-2 py-1 rounded-full flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-xs">warning</span> Peak
                    </span>
                </div>
                <p class="text-xs text-outline mt-6">Currently on trails</p>
            </div>
            <!-- Revenue -->
            <div class="bg-primary text-on-primary p-8 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden group">
                <div class="absolute -right-4 -bottom-4 w-32 h-32 bg-primary-container/30 rounded-full blur-3xl"></div>
                <p class="text-label-md uppercase tracking-widest text-primary-fixed/60 font-bold mb-4">Revenue (USD)</p>
                <div class="flex items-end gap-3">
                    <h3 class="text-4xl font-display font-extrabold text-white leading-none">$42.1k</h3>
                    <span class="text-xs font-bold text-on-primary bg-primary-container px-2 py-1 rounded-full flex items-center gap-1 mb-1">
                        <span class="material-symbols-outlined text-xs">bolt</span> High
                    </span>
                </div>
                <p class="text-xs text-primary-fixed/40 mt-6">Monthly growth +22%</p>
            </div>
        </section>

        <!-- Main Layout: Table and Featured Item -->
        <section class="flex flex-col xl:flex-row gap-10">
            <!-- Recent Activity Table -->
            <div class="flex-[2] bg-surface-container-low p-8 rounded-2xl">
                <div class="flex justify-between items-center mb-8">
                    <h4 class="text-xl font-headline font-bold text-primary">Recent Visitor Log</h4>
                    <button class="text-primary text-sm font-semibold hover:underline">View All Entries</button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full border-separate border-spacing-y-3">
                        <thead>
                            <tr class="text-left text-label-md text-secondary uppercase tracking-widest">
                                <th class="pb-4 font-bold pl-4">Hiker Name</th>
                                <th class="pb-4 font-bold">Ticket ID</th>
                                <th class="pb-4 font-bold">Trail Status</th>
                                <th class="pb-4 font-bold text-right pr-4">Entry Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Row 1 -->
                            <tr class="bg-surface-container-lowest group hover:bg-surface-container-high transition-colors">
                                <td class="py-4 pl-4 rounded-l-xl">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center font-bold text-secondary text-xs">AS</div>
                                        <span class="font-semibold text-primary">Andi Saputra</span>
                                    </div>
                                </td>
                                <td class="py-4 font-medium text-secondary">#GNG-2024-001</td>
                                <td class="py-4">
                                    <span class="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-tight">On Trail</span>
                                </td>
                                <td class="py-4 text-right pr-4 text-outline text-sm tabular-nums">06:45 AM</td>
                            </tr>
                            <!-- Row 2 -->
                            <tr class="bg-surface-container-lowest group hover:bg-surface-container-high transition-colors">
                                <td class="py-4 pl-4 rounded-l-xl">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center font-bold text-tertiary text-xs">ML</div>
                                        <span class="font-semibold text-primary">Maria L.</span>
                                    </div>
                                </td>
                                <td class="py-4 font-medium text-secondary">#GNG-2024-002</td>
                                <td class="py-4">
                                    <span class="px-3 py-1 rounded-full bg-secondary-container text-secondary text-[10px] font-extrabold uppercase tracking-tight">Finished</span>
                                </td>
                                <td class="py-4 text-right pr-4 text-outline text-sm tabular-nums">07:12 AM</td>
                            </tr>
                            <!-- Row 3 -->
                            <tr class="bg-surface-container-lowest group hover:bg-surface-container-high transition-colors">
                                <td class="py-4 pl-4 rounded-l-xl">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary text-xs">RK</div>
                                        <span class="font-semibold text-primary">Rizky Kurniawan</span>
                                    </div>
                                </td>
                                <td class="py-4 font-medium text-secondary">#GNG-2024-003</td>
                                <td class="py-4">
                                    <span class="px-3 py-1 rounded-full bg-error-container text-on-error-container text-[10px] font-extrabold uppercase tracking-tight">Checked In</span>
                                </td>
                                <td class="py-4 text-right pr-4 text-outline text-sm tabular-nums">08:00 AM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Right Column: Atmo-Gallery Featured Content -->
            <div class="flex-1 space-y-6">
                <div class="bg-surface-container-high rounded-2xl overflow-hidden relative min-h-[400px] flex items-end p-8 group">
                    <img alt="Volcanic landscape" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A breathtaking, cinematic shot of the Gunung Galunggung volcanic crater filled with lush green forest. The morning mist is swirling around the ridges, partially obscuring the deep caldera lake below. The lighting is soft, diffused through clouds, creating a moody and atmospheric deep green color palette. The image is framed with intentional asymmetry to create an editorial, high-end feel suitable for a premium tourism admin dashboard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD65VD0702nrAEhkieeaPJe7S5p5wYuW27KfrWkDG8MDWifuJjhyOOiBHQ0PIxdYSWResh5eUPlnh7KwECua2-GmDSAch7b7_ypulMh0-RS5ZQXB45OkuriAg_mJ5Bof-7y3O7uAZQJq2WdTQpKDAZTf6_KSjFZDOcIhRiWrV4-CUOMRMAvv2X0RUGFow1OxbPDR_lkXIujlkCayo0zdK969C-Z9BzUfuH3yQ9k6KEnu3jWtkU4yryt8qoUxlgdaboZOauz3yxYKg"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
                    <div class="relative z-10 text-on-primary">
                        <span class="text-xs font-bold uppercase tracking-[0.2em] opacity-80">Live Crater View</span>
                        <h4 class="text-2xl font-display font-extrabold mt-2 leading-tight">Atmospheric Conditions: Optimal</h4>
                        <p class="text-sm mt-4 text-primary-fixed/80 line-height-relaxed">The summit is currently experiencing clear visibility with a soft morning fog. Ideal conditions for the planned 10:00 AM guided group.</p>
                        <button class="mt-6 flex items-center gap-2 font-bold text-sm bg-surface text-primary px-6 py-2.5 rounded-full hover:bg-primary-fixed transition-colors">
                            <span class="material-symbols-outlined text-sm">videocam</span> View Live Stream
                        </button>
                    </div>
                </div>
                <!-- Small Technical Field Note Card -->
                <div class="bg-surface-container-low p-6 rounded-2xl flex items-center gap-6">
                    <div class="w-16 h-16 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                        <span class="material-symbols-outlined text-3xl text-secondary">thermostat</span>
                    </div>
                    <div>
                        <p class="text-[10px] uppercase tracking-widest text-secondary font-bold">Summit Weather</p>
                        <p class="text-xl font-bold text-primary">18°C · Humidity 82%</p>
                        <p class="text-xs text-outline mt-1">Updated 5 mins ago</p>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- Background Decorative Element (Asymmetric Bleed) -->
    <div class="absolute -right-20 top-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
</main>
</body>
</html>