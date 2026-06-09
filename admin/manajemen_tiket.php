<?php
?>

<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f9f9f7;
        }
        .font-headline { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
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
                        "xl": "1.5rem",
                        "full": "9999px"
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-background text-on-surface">
<!-- SideNavBar Shell -->
<aside class="h-screen w-72 fixed left-0 top-0 bg-[#f4f4f2] dark:bg-[#1a1c1b] flex flex-col py-8 px-6 gap-2 z-40">
<div class="mb-8 px-2">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
<span class="material-symbols-outlined text-surface" style="font-variation-settings: 'FILL' 1;">landscape</span>
</div>
<div>
<h1 class="font-['Plus_Jakarta_Sans'] font-extrabold tracking-tighter text-[#163422] dark:text-[#f9f9f7] text-xl leading-tight">Galunggung</h1>
<p class="font-['Inter'] font-medium text-xs text-[#695d47] dark:text-[#a1a1a1]">Tourism Authority</p>
</div>
</div>
</div>
<nav class="flex-grow space-y-1">
<a class="flex items-center gap-3 px-4 py-3 text-[#695d47] hover:bg-[#e8e8e6] transition-all rounded-xl font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined">dashboard</span>
                Overview
            </a>
<a class="flex items-center gap-3 px-4 py-3 bg-[#163422] text-[#f9f9f7] rounded-xl shadow-lg shadow-[#163422]/10 font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">confirmation_number</span>
                Ticket Management
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-[#695d47] hover:bg-[#e8e8e6] transition-all rounded-xl font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined">landscape</span>
                Hiking Schedule
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-[#695d47] hover:bg-[#e8e8e6] transition-all rounded-xl font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined">group</span>
                User Management
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-[#695d47] hover:bg-[#e8e8e6] transition-all rounded-xl font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined">analytics</span>
                Reports
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-[#695d47] hover:bg-[#e8e8e6] transition-all rounded-xl font-['Inter'] font-medium text-sm" href="#">
<span class="material-symbols-outlined">settings</span>
                Settings
            </a>
</nav>
<div class="mt-auto space-y-4">
<button class="w-full bg-primary text-on-primary py-3 rounded-full font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/10 active:scale-95 transition-transform">
<span class="material-symbols-outlined text-sm">add</span>
                New Entry
            </button>
<a class="flex items-center gap-3 px-4 py-3 text-[#695d47] hover:bg-[#e8e8e6] transition-all rounded-xl font-['Inter'] font-medium text-sm border-t border-outline-variant/10 pt-4" href="#">
<span class="material-symbols-outlined">help</span>
                Help Center
            </a>
</div>
</aside>
<!-- Main Content Area -->
<main class="ml-72 min-h-screen flex flex-col">
<!-- TopNavBar Shell -->
<header class="w-full h-16 bg-[#f9f9f7] dark:bg-[#1a1c1b] flex justify-between items-center px-8 sticky top-0 z-50 shadow-sm opacity-95 backdrop-blur-md">
<div class="flex items-center flex-1">
<div class="relative w-96 group">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
<input class="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm font-['Plus_Jakarta_Sans'] focus:ring-2 focus:ring-primary/20 placeholder:text-outline/60" placeholder="Search ticket ID or visitor..." type="text"/>
</div>
</div>
<div class="flex items-center gap-6">
<button class="material-symbols-outlined text-on-surface-variant hover:bg-[#f4f4f2] p-2 rounded-full transition-colors cursor-pointer active:scale-95 duration-200">notifications</button>
<button class="material-symbols-outlined text-on-surface-variant hover:bg-[#f4f4f2] p-2 rounded-full transition-colors cursor-pointer active:scale-95 duration-200">settings</button>
<div class="h-8 w-[1px] bg-outline-variant/30"></div>
<div class="flex items-center gap-3">
<img alt="Administrator profile" class="w-8 h-8 rounded-full bg-surface-container-high" data-alt="A professional close-up headshot of a park administrator in a modern office, characterized by soft natural lighting from a nearby window. The background is a blurred view of lush Indonesian forest greens and volcanic textures. The overall aesthetic is clean, professional, and sophisticated, mirroring the Gunung Galunggung brand's high-end editorial feel." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMvhEE7I7ULuvnrFWDA-DSj3Um7d5H73abEJnmEa-8i9WX1NGmlDi-OJy_9x49_ZawSSFr5nOsIckaga4kQXNAO7QpFXtdUov2HpENov7o5-zPoVJ8m4Z2jobTb44KOc7afiUbGh9bpYu1I0Z1Yvot3uNgJoK_ycxOO17DN1FnhVLjEmpt0FRv0TheL7txitcO9215_WfVQdnG-geGeqLCLjDYfZ-AKl-Xx-BmS14eUef5NcdJxHqng5krbQAoNeOc42aW6H6Gvg"/>
<span class="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#163422]">Admin User</span>
</div>
</div>
</header>
<!-- Page Canvas -->
<div class="p-10 flex-grow">
<!-- Header Section -->
<div class="flex justify-between items-end mb-10">
<div class="max-w-2xl">
<h2 class="text-4xl font-display font-extrabold text-primary tracking-tight mb-2">Ticket Management</h2>
<p class="text-secondary font-body leading-relaxed">Oversee access to the Gunung Galunggung crater and hiking trails. Monitor real-time status updates and visitor documentation.</p>
</div>
<div class="flex gap-3">
<button class="px-6 py-2.5 rounded-full bg-surface-container-lowest text-primary font-medium text-sm border border-outline-variant/15 flex items-center gap-2 hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-[18px]">ios_share</span>
                        Export Data
                    </button>
<button class="px-6 py-2.5 rounded-full bg-primary text-on-primary font-medium text-sm flex items-center gap-2 shadow-lg shadow-primary/10 active:scale-98 transition-transform">
<span class="material-symbols-outlined text-[18px]">confirmation_number</span>
                        Issue Ticket
                    </button>
</div>
</div>
<!-- Bento Filter Bar -->
<div class="grid grid-cols-12 gap-4 mb-8">
<div class="col-span-4 bg-surface-container-low p-4 rounded-xl flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
<span class="material-symbols-outlined">filter_list</span>
</div>
<div class="flex-grow">
<label class="block text-[10px] font-label font-bold tracking-widest uppercase text-secondary mb-1">Status Filter</label>
<select class="w-full bg-transparent border-none p-0 text-sm font-medium focus:ring-0 text-on-surface">
<option>All Statuses</option>
<option>Paid</option>
<option>Pending</option>
<option>Checked-in</option>
</select>
</div>
</div>
<div class="col-span-4 bg-surface-container-low p-4 rounded-xl flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
<span class="material-symbols-outlined">calendar_today</span>
</div>
<div class="flex-grow">
<label class="block text-[10px] font-label font-bold tracking-widest uppercase text-secondary mb-1">Date Range</label>
<input class="w-full bg-transparent border-none p-0 text-sm font-medium focus:ring-0 text-on-surface" type="text" value="Oct 24, 2023 - Oct 31, 2023"/>
</div>
</div>
<div class="col-span-4 bg-surface-container-low p-4 rounded-xl flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
<span class="material-symbols-outlined">hiking</span>
</div>
<div class="flex-grow">
<label class="block text-[10px] font-label font-bold tracking-widest uppercase text-secondary mb-1">Activity Type</label>
<select class="w-full bg-transparent border-none p-0 text-sm font-medium focus:ring-0 text-on-surface">
<option>All Activities</option>
<option>Summit Hike</option>
<option>Crater View</option>
<option>Hot Springs</option>
</select>
</div>
</div>
</div>
<!-- Enhanced Data Table -->
<div class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low/50">
<th class="px-6 py-5 text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant">Ticket ID</th>
<th class="px-6 py-5 text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant">Visitor Name</th>
<th class="px-6 py-5 text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant">Ticket Type</th>
<th class="px-6 py-5 text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant">Date</th>
<th class="px-6 py-5 text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant">Status</th>
<th class="px-6 py-5 text-[10px] font-label font-bold tracking-widest uppercase text-on-surface-variant text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/10">
<tr class="hover:bg-surface-container-low/30 transition-colors group">
<td class="px-6 py-4 font-label text-sm text-primary font-semibold">GAL-2023-8841</td>
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-xs">AS</div>
<span class="text-sm font-medium text-on-surface">Aditya Surya</span>
</div>
</td>
<td class="px-6 py-4 text-sm text-secondary">Summit Hike (VIP)</td>
<td class="px-6 py-4 text-sm text-on-surface-variant">Oct 28, 2023</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span> Checked-in
                                </span>
</td>
<td class="px-6 py-4 text-right">
<button class="material-symbols-outlined text-outline hover:text-primary transition-colors">more_vert</button>
</td>
</tr>
<tr class="hover:bg-surface-container-low/30 transition-colors group">
<td class="px-6 py-4 font-label text-sm text-primary font-semibold">GAL-2023-8842</td>
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs">EN</div>
<span class="text-sm font-medium text-on-surface">Elena Novak</span>
</div>
</td>
<td class="px-6 py-4 text-sm text-secondary">Crater Explorer</td>
<td class="px-6 py-4 text-sm text-on-surface-variant">Oct 28, 2023</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
<span class="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span> Paid
                                </span>
</td>
<td class="px-6 py-4 text-right">
<button class="material-symbols-outlined text-outline hover:text-primary transition-colors">more_vert</button>
</td>
</tr>
<tr class="hover:bg-surface-container-low/30 transition-colors group">
<td class="px-6 py-4 font-label text-sm text-primary font-semibold">GAL-2023-8843</td>
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold text-xs">RM</div>
<span class="text-sm font-medium text-on-surface">Rizky Mahendra</span>
</div>
</td>
<td class="px-6 py-4 text-sm text-secondary">Standard Pass</td>
<td class="px-6 py-4 text-sm text-on-surface-variant">Oct 29, 2023</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
<span class="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></span> Pending
                                </span>
</td>
<td class="px-6 py-4 text-right">
<button class="material-symbols-outlined text-outline hover:text-primary transition-colors">more_vert</button>
</td>
</tr>
<tr class="hover:bg-surface-container-low/30 transition-colors group">
<td class="px-6 py-4 font-label text-sm text-primary font-semibold">GAL-2023-8844</td>
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<img class="w-8 h-8 rounded-full" data-alt="A portrait of a male tourist with a backpack, smiling against a backdrop of a misty volcanic crater lake. The lighting is diffused and atmospheric, with a color palette dominated by deep greens and slate grays. This image captures the authentic spirit of exploration at Gunung Galunggung." src="https://lh3.googleusercontent.com/aida-public/AB6AXuASjdeb7JMA_bOHM8uA7723aRyeGa4NLWdED53V7XF5wYZc-Rt1KUy_9YniMmRxUgweFgBZPxrgYKqEGNNFnYCBrrGVWHBfL6NDxYlx0tgKphRIlAiL3mHyMz1bEYcqlRK4XcagY99Ky5E0_WVa_n7GZaJlTEMX8nZS5REaYqaQzoN1DopKe8Nyr62YaBFhkUl8m6Ibzu8kqkcuMVWpr00nh3amEJCirMal7JKTQvqQj-UGKHvkJjzsQPsfbkxgnM7RWILDzcxC7w"/>
<span class="text-sm font-medium text-on-surface">James Dalton</span>
</div>
</td>
<td class="px-6 py-4 text-sm text-secondary">Summit Hike</td>
<td class="px-6 py-4 text-sm text-on-surface-variant">Oct 30, 2023</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span> Checked-in
                                </span>
</td>
<td class="px-6 py-4 text-right">
<button class="material-symbols-outlined text-outline hover:text-primary transition-colors">more_vert</button>
</td>
</tr>
<tr class="hover:bg-surface-container-low/30 transition-colors group">
<td class="px-6 py-4 font-label text-sm text-primary font-semibold">GAL-2023-8845</td>
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container font-bold text-xs">LH</div>
<span class="text-sm font-medium text-on-surface">Linh Hoang</span>
</div>
</td>
<td class="px-6 py-4 text-sm text-secondary">Crater Explorer</td>
<td class="px-6 py-4 text-sm text-on-surface-variant">Oct 31, 2023</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
<span class="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span> Paid
                                </span>
</td>
<td class="px-6 py-4 text-right">
<button class="material-symbols-outlined text-outline hover:text-primary transition-colors">more_vert</button>
</td>
</tr>
</tbody>
</table>
<!-- Pagination -->
<div class="px-6 py-5 bg-surface-container-lowest flex justify-between items-center border-t border-outline-variant/10">
<span class="text-sm text-on-surface-variant font-body">Showing 1 to 5 of 128 results</span>
<div class="flex gap-2">
<button class="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button class="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-on-primary font-medium text-sm">1</button>
<button class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-sm">2</button>
<button class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-sm">3</button>
<button class="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
<!-- Footer Stats Overlap Layout -->
<div class="mt-12 flex gap-8">
<div class="flex-1 bg-primary p-8 rounded-xl relative overflow-hidden group">
<div class="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>
<div class="relative z-10">
<h3 class="text-on-primary/60 font-label font-bold tracking-widest uppercase text-xs mb-4">Daily Revenue</h3>
<p class="text-on-primary text-3xl font-display font-extrabold mb-2">$4,280.00</p>
<div class="flex items-center gap-2 text-on-primary/80 text-sm">
<span class="material-symbols-outlined text-sm">trending_up</span>
<span>12% from yesterday</span>
</div>
</div>
</div>
<div class="flex-1 bg-secondary p-8 rounded-xl relative overflow-hidden group">
<div class="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>
<div class="relative z-10">
<h3 class="text-on-secondary/60 font-label font-bold tracking-widest uppercase text-xs mb-4">Tickets Checked-In</h3>
<p class="text-on-secondary text-3xl font-display font-extrabold mb-2">342</p>
<div class="flex items-center gap-2 text-on-secondary/80 text-sm">
<span class="material-symbols-outlined text-sm">group</span>
<span>85% capacity reached</span>
</div>
</div>
</div>
<div class="flex-1 bg-surface-container-high p-8 rounded-xl relative overflow-hidden group">
<div class="relative z-10">
<h3 class="text-on-surface-variant font-label font-bold tracking-widest uppercase text-xs mb-4">Pending Requests</h3>
<p class="text-primary text-3xl font-display font-extrabold mb-2">18</p>
<div class="flex items-center gap-2 text-on-surface-variant text-sm">
<span class="material-symbols-outlined text-sm">pending_actions</span>
<span>Requires attention</span>
</div>
</div>
</div>
</div>
</div>
</main>
</body></html>