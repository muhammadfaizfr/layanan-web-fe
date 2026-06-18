// src/components/Galeri.jsx
function Galeri() {
  return (
    <>
      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-secondary label-md tracking-[0.2em] uppercase text-[11px] font-bold mb-4 block">Archive Visual</span>
            <h1 className="text-6xl md:text-7xl font-headline font-bold text-primary tracking-tighter leading-[0.95] mb-6">
              Simfoni <br/>Dalam Lensa
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed font-body">
              Menelusuri keheningan kawah, kabut pagi yang menyelimuti puncak, hingga detail terkecil dari flora endemik yang tumbuh di tanah vulkanik Galunggung.
            </p>
          </div>
          <div className="flex gap-4 pb-2">
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-all">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </div>
      </header>

      {/* Atmo-Gallery: Asymmetrical Masonry */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Large Vertical Bleed */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] aspect-[16/10]">
            <img 
              alt="View over the volcanic crater" 
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsk33XnvcL3B2KClH1PvDxKS0AGsgJSAQA64Zd9b1K7yVY8aFBmp2GzMjrS0XGMydqNZxUvaxS2eYvXeux8y2cJYTjugJsYBL1lJ8XtiGFWhpatIAGBo1fV0WvXckKNwaaPYpT887sgXrMM7MzE-pzWVNX3-ZvltUMJNjWgDX9rjsMJPcP4bY9SV69jV0Rtyny8Y65AGmhgVlxsQcqu1WFdnSf6foMey7Kkd-dnCv_M6UHN6Qy_wQbrfSXcBLh3--rX2gRHevkkQ" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span className="text-surface/80 text-[10px] tracking-widest uppercase mb-1">07° 15' 0" S, 108° 4' 0" E</span>
              <h3 className="text-surface text-2xl font-headline font-bold">Puncak Utama</h3>
            </div>
          </div>

          {/* Vertical Offset */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-tr-[3rem] rounded-bl-[1.5rem] aspect-[3/4] md:mt-12">
            <img 
              alt="Misty forest detail" 
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdY0BiHgergKuEdSfNjVKhNCyppaBCSKJVeMJ4j3wpdOg9rwrR6AorKGiOr4Fhu3b33PQ09l9JzmtxJgq1045ycOSGNKggjsNJQm-21hazQ1eNAOelqblP-xw94eCOzVBJ1_-slvbnBuM1u2ay556tlHm3150uB8LmUKbDd6DR7G-bHlWiiTQRMsW1qMiYtNDu6HsFu8C2g7ju3TxCafAxyj-K6-PsIu1CJVsRy1pQTBacEVsHdmrPA25KNGSGtpuaNt7_6CklRQ" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <h3 className="text-surface text-xl font-headline font-bold">Flora Endemik</h3>
            </div>
          </div>

          {/* Horizontal Secondary */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-xl aspect-square">
            <img 
              alt="Stairs to crater" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCauOVfEhjlxlN-cSuQGRarrS5j4GSVXYg54E1rrHkRsQ6Ni05rFw5u5nvPCRovRZfrV4eLcRpyCVH-iv47YSY0pf35Az9l5oxC-fJvdybRUFKwXd3d5si-KJYQLxgMNq7aCbohFxS5eUYvRp5YrV8Op4L1z1sJDvtNpKZrH5SG_TPMzqVbaXNW92PI4Q4fHI19nCP6zAB8kWLTUbvBXHLwpvCFk5DN5J8qyB0zG09T9rQIJQ3b2ZAETw1Uvk2X7tjQqGh4NoTR8A" 
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-surface font-headline font-medium tracking-tight">Tangga 620</p>
            </div>
          </div>

          {/* Large Landscape */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] aspect-[21/9]">
            <img 
              alt="Sunset horizon" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX9nlkFiNc_t-lu0GJ2hwlpFSZtZ2M0iHcvAaa7SxTzdgp83kYPLx3Igg4TL0V4ldu6TvebCrDYOYqB6wC_g1dEIv0cgYo2yomCvybUUTcB4OrS2IQVwGl1u84lc4lr8mSkZHclce-xUZSSgnWztQjwq_NWCpp9mykzp8y6Va12bXwHaMf1lA50L9trOCK-7D87nWKFA4KZgXzxEvP_2lIEDUIbqAjmylvOqKf1kvdqJ1yYnOUnHNB18YGX44--YBeuIaRgeu11Q" 
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="w-16 h-16 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center text-surface">
                <span className="material-symbols-outlined">fullscreen</span>
              </span>
            </div>
          </div>

          {/* Third Row Layout */}
          <div className="md:col-span-5 group relative overflow-hidden rounded-3xl aspect-[4/3]">
            <img 
              alt="Lake reflection" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBZJBecDVUKPpr5baawcVrmifQwrwt6Ion1-cA7qPIi3EJrORPNGT0BXTN95i3oI5FHwhucfWWWxOk56sMwx1g05HfZerYRvLNNXsiT10JPbqjNoc9pAvFKZymuQE0SdPar6_K8Fd9EaKQJH7Eqy0CdbV4U5POhD28DKqc5UuD6tIonIXzXQK2VTwv7uNxzriX1KfSOBiRwZnsy2-SCy7EdQqNd73Kq4JccxcjQnAfHegRrEcuM_Vskz8kg5cFxC3EZrIr9aGW3w" 
            />
          </div>
          <div className="md:col-span-7 group relative overflow-hidden rounded-tl-[1.5rem] rounded-br-[4rem] aspect-[16/9]">
            <img 
              alt="Forest layers" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeDo7qUutuLAYngPckJLuGFEWzUpyLv4gfDieSMzPtJoGaSuwbKnhNsd5WVtJPo-1m-PpUgux1UEnRqyyvakhZWDQou3xnqv3w43UiDS15rjAR1RUlQJ2czCu0jQbKb3W4RuC4hCf5l8u7V2bjZX0t5xoudjNeaj9fEwvyHlzycl5s29pR04SMnSm2-Vh2wE2on7HbaRLo-eu2cAib_eGFqcmjsUPTJlLlJOjOoC-Od4OHsPrlY7B_5lp7rbUVqxR3n7B4tNYuXw" 
            />
            <div className="absolute top-8 right-8">
              <span className="bg-surface/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Editorial Pick</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Quote/Intermission */}
      <section className="max-w-4xl mx-auto px-8 py-32 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8 tracking-tight">
          "Setiap sudut Galunggung menyimpan rahasia purba yang hanya bisa dipahami oleh mereka yang mau berhenti sejenak dan melihat."
        </h2>
        <div className="w-12 h-px bg-primary/20 mx-auto"></div>
      </section>

      {/* Additional Grid */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square overflow-hidden rounded-2xl group">
            <img 
              alt="Detail 1" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-clkYPE2XykqI9TLfHSHFsv3HkdtmDihYpvteTR2_S4C0j27VUhJ9MsHJ3ZpdR5aZSvxH71HlKOUG4IlbSDvJ8HESKTfc4HTg6Y8r4GypggeN0xSAnasymUipMI6jG9ECBI4Y8MIEDes61Wqn9jcZAqrs66YZ-id-zIJ1KwMIzr-P7fMJeljBV9Hj5tzABDp_P99cIGTuMZ2mq7XHL5WdXVrb68RMBQJ2MJzKvXMhEOnJdp7AQ50eIVNweR70bOGJclXxa_XktA" 
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-2xl group">
            <img 
              alt="Detail 2" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3iouJojNb90OMi8N1YDbi72-sqxJGpVxGmUBDq73cmxB0EUCm_14DYsn0tZ2z-L4Cbh451PzabOegQsGewBmYkmOHSY8-uK4Nxbu3_hDROq1QuzuEMDmlRGYA3T5HK2D6WFyzQtMqx-GGHkEy6YVbjBQ5i3WXOvCnj6Jy0Eba_-5nDOto8alh3igyNGy-fZdXN7UOw-Zk1H2I-6718Ga_KARlit88gGmtwq6-TLSqqvtYRfVW9TpcomgCueW988wq7h_icl37aw" 
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-2xl group">
            <img 
              alt="Detail 3" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRN4Z6nO55X2SVLIR6YkBYFwcAADq1hNeeZgXeKdDQv2ItYwjmqhAN9SW75ePFPyeQfpSxAcYLYL_fHKaWdh79l11QUYrI_cp9CfD8s-CTot0mwx5Z6QM4myJezH1fElJV-xKZWP7YcAZjGODpXWU7qjxFJg_-GAWCPVfdYOC1ZWWn1inZFRipNwQS4A8pb9jcxSINaAjnqUVNQ74OdutktrQXB8wiGHwrkbt_IqHWOiojVr_UXJcEuJ2t0yqWSR5js-drBivkZg" 
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-2xl group">
            <img 
              alt="Detail 4" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0MCz2pe9aCqk4rNxwtvw86WJSKcw5baaj3cnWvb8Jn3ZhS1CTWFeCuxvNKQAXbL58ok1oNtr1v6rY9UdHS4jOifTvXsTtG3kzMZZnbf7ACDF5zPoGw8S9t_Wx8IHaK_QHoiILraSXf3RX5rBFkCEBJ5eSalsy2Xl9XPRYtR5X1rAtZ4J9fyBTNElL7fjvs7A-H97Ii-Lx2qCLNj13gWZwQf8LDUaCAqyT2PA1SDGyhfQLopp25-TubpQHrQ9mLp_OP-2eh6Fi8g" 
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Galeri