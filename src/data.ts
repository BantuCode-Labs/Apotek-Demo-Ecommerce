import { Product, Order, Address } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Paracetamol 500 mg',
    brand: 'Panadol',
    category: 'Obat Bebas',
    description: 'Paracetamol digunakan untuk meredakan nyeri ringan hingga sedang seperti sakit kepala, sakit gigi, dan menurunkan demam. Aman digunakan sesuai dosis yang dianjurkan. Simpan di tempat sejuk dan kering, jauh dari jangkauan anak-anak. Baca aturan pakai sebelum digunakan.',
    price: 12500,
    originalPrice: 15000,
    unit: 'Strip (10 Tablet)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAECrQZEH4N4bURtDHWb2OlHuhWN5MOMAURdO0ND_MglAjkKf6S9yGG4z-dHhxjyJaPuFthdMcF8L47NZr2ALpjmgqTIZrhFKSzStltwVSxB2CsvsenEkEzlSXAzllce_zX2weCE6EFa7BCpj36K371FHYMqE8QaK1xai-hSKixlJKtScFIUkV4ph2Z10oE0OVh7HFAPWY4o_qibOO3OrfEE27TfA5WxrzHqvAjkGKgCK8tGN4slnsVycG_YcuUIzXad5GrcC2_qv8',
    stockStatus: 'available',
    rating: 4.9,
    ratingCount: 1234,
    discountBadge: '-17%'
  },
  {
    id: 'p2',
    name: 'Vitamin C 500 mg',
    brand: 'Enervon-C',
    category: 'Vitamin & Suplemen',
    description: 'Suplemen vitamin C untuk membantu menjaga daya tahan tubuh dan mempercepat pemulihan sariawan serta kelelahan fisik harian.',
    price: 45000,
    originalPrice: 50000,
    unit: 'Botol (30 Tablet)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMlSV_fAf9clwJGeX1Fofk9-8MW7lJsoevLPfVTrRcsmKPFnnaVysMNiA0r0WH8HkaUBuQ6sL_YCOGSH8Enx6JRB1kY2yFJtMmCopr7ITH7gZDUzn14eBV9xI3K9zYnqgagYgoLGlD8lglLpm3VQHqwOaXORAl08U0JNHCwDgIou3LsQ7jhCWTCKwoEg41e4K2oYG5-d6ID9kLFvx1d9IfbYCMcQUMcUg3s8CMWONWGVWYvwH-VeuTa481jISko2XSn7RJUKAbdOc',
    stockStatus: 'available',
    rating: 4.8,
    ratingCount: 840,
    discountBadge: '-10%'
  },
  {
    id: 'p3',
    name: 'Nasal Spray Reliever',
    brand: 'Steri-Nose',
    category: 'Alat Kesehatan',
    description: 'Nasal spray efektif meredakan hidung tersumbat karena flu, alergi, atau sinusitis. Bekerja cepat melegakan saluran pernafasan.',
    price: 78200,
    unit: 'Pcs (20 ml)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7E97Y_CnwG9HpHrPAvMjeYJ-EMc5Qy9wWgpK0UVNcUB4_mz8YqVUwBo1xw6w6ZkpaVmMK85XxZvIAoHQiQ7zlqOXo3TgX8vMKlgsdGpSI-bQ270r5GE4ik7jKofvwHaG2Jdso50uFaYy-BdTcvrWgHBaxDpmmJoIs4UEAg9IkQXW3UrJH14-QH8Wz9p7KGCcuQ1BYP7H4P7jv8W9dE4Jy2LPmB71W_EfgIGiqoCiZUO12Gcoj0azEXZBE3Id-lYZ1rzeBn9QV2ko',
    stockStatus: 'available',
    rating: 5.0,
    ratingCount: 120
  },
  {
    id: 'p4',
    name: "Woods' Peppermint Antitussive",
    brand: "Woods'",
    category: 'Obat Bebas',
    description: 'Sirup obat batuk tidak berdahak dengan kandungan peppermint segar yang melegakan tenggorokan gatal dan batuk terus menerus.',
    price: 28500,
    originalPrice: 31000,
    unit: '1 Botol (100 ml)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlWVREX9oiJP89XwYS1bmepwptYe__KaTcu0ktAuzt3gYXbgFFaqG40-pZmkePwclkZUYERXvcVplIdkXrvRbTa6tuUH7W7b0nCynocTt6VN65hJHRVLP9HQ11JY_3S_bvo684YTRmv_pQzZLDe4OSngdF-FcgqLJH-ptHSSJXOlJCh22kNgmJVazYUF2SyC6MPZvRcyRocckxuJsz8DMzxCmB_UZ0MCqB1ad9eZeu6QRus4jg5_YvqtKcyOGbqx6SDIzInOqzq1s',
    stockStatus: 'available',
    rating: 4.7,
    ratingCount: 312
  },
  {
    id: 'p5',
    name: 'Obat Batuk Sirup',
    brand: 'Generik',
    category: 'Obat Bebas',
    description: 'Formula sirup obat batuk berdahak untuk mengencerkan riak atau mukus di saluran napas agar mudah dikeluarkan.',
    price: 16500,
    unit: '100 ml',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRghxctp6POsspp41kSzNEqRL19-bJ03d4D3Js9ECN0tr2hS9gbgzSp-6E6XySTwBcbS7pIBSuqVF4x0Zw9IOCOQtjoGEndRkCqlr7nqOnCxSVy2uJJiDg2s40uaEnXeIn28jsZDMDwoPZUpMtVNSpt-MMNL55ZezIpmiqg9gQLsh0oZ3FLGhAC2dRkVtNBtpLrQSk11a7W7ePtX92OghHPEw1C4WfoIuv9ctp389L_SgzHm9Q415cfn8mPoO-ww4F0C-uviqwy-A',
    stockStatus: 'available',
    rating: 4.6,
    ratingCount: 450
  },
  {
    id: 'p6',
    name: 'Minyak Kayu Putih',
    brand: 'Cap Lang',
    category: 'Obat Bebas',
    description: 'Minyak hangat alami untuk meredakan kembung, mual, sakit perut, gatal gigitan serangga, serta melegakan hidung tersumbat.',
    price: 15000,
    unit: '60 ml',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyiO4yfi2K-nEV79WlWiqTjNdg66Be-36hy9KBVsGHpM1YoiZhmv53NGkBtSdX3v82fwvOmsihjsfMHAiKaVdLhdquEB95Gp4w75ToO9tsanrFy9EL2IrRrYRXURtREaMOhmb2TquCngarDqxGPCV0CzjWt3uVkJ4cRMVh3_jFhPRzAWPVOjBZp1ibebi_fM78BTXDP3tk1wJ2hDxDk2nogEhQDjgyYWL5aYv03dVqlbS3ATkPskn2pN5VV1eiZ0GOkeVA5wbaXEI',
    stockStatus: 'available',
    rating: 4.9,
    ratingCount: 1400
  },
  {
    id: 'p7',
    name: 'Omron Digital Thermometer MC-246',
    brand: 'Omron',
    category: 'Alat Kesehatan',
    description: 'Termometer digital presisi tinggi untuk mengukur suhu tubuh melalui mulut, ketiak, atau rektal. Aman, cepat, dan higienis.',
    price: 65000,
    unit: '1 Unit',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBylntIIoABilIVKnLRIhOg7sRlo2i3XjZqQ0fvnhgyFSdwiS1Z2Yt21e-G1qPhH2z3Jiet-McBJDfF9Oa-hgABeJcsFHq74by6aQJrl-J02tCTWNYZxmo86CBcvn-Nb9Wr6YF3nAzZ3z8uoS_IrKDbiNS5aa9INDTjTntU3JuFrGElhvdtHcrUSKGc9Rx7vMHEuSIhkK6ZW5GvDYYE6KUIbG6KIJc5yZfgxVb3SVlyafIG5iE3CezhBioHB4o2Q-fp2xQ-DDeRKRY',
    stockStatus: 'available',
    rating: 4.8,
    ratingCount: 380
  },
  {
    id: 'p8',
    name: 'Sanaflu Forte Kaplet',
    brand: 'Sanaflu',
    category: 'Obat Bebas',
    description: 'Sanaflu mengandung paracetamol dan dekstrometorfan hbr, sangat bagus dalam meredakan gejala flu dan bersin-bersin dengan caplet salut selaput.',
    price: 8200,
    unit: '1 Strip (4 Kaplet)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy4ZpQB9V47x87dWrVS97HiDyhRXVH0o4nWFw8tJWXXASfuHVtBp296HPU9i5qK3XfQLneMyKsBIBCz71cQNtGY2fUHVIvO7aONRBtlRelct4jJC3fJbWMonz-cv8VqG2BcvWNomNRPscfKl8u8YslJchlbtlUM2VmwehSq026VRA6wY5DTtT6_pu6iUXUh0_7EFwU2LAqOOhRAlrDAeyAf5hVBopPozE4H6QSEnQQM2OmE6ip_NDbYDK0XKOAN7Mx4wMrqovbsNE',
    stockStatus: 'out_of_stock',
    rating: 4.5,
    ratingCount: 95
  },
  {
    id: 'p9',
    name: 'Sensi Mask 3-Ply Earloop',
    brand: 'Sensi',
    category: 'Alat Kesehatan',
    description: 'Masker bedah 3 lapis penyaring partikel debu dan bakteri, sangat nyaman dengan pengait telinga yang lentur dan bebas lateks.',
    price: 42000,
    unit: '1 Box (50 Masker)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaeaH5_3plrIIA6JqnO6fDVOBdICOP5AQIjXSmZt0kXrl1Dpi1opdNWPP-FlJb6dFQU0mPbS3FCCdTryDQkvZqnNzO1ZK1qZSrX6Bbx4WY8gYxk1ONKzulSSvlZ6PYTd5ggU-PQDMnLS-P67hdn3PAZo8Us8kZCpXMu35DWTaiN8JA5ieNzCIP2ReizDERI9EfFvZzNVdfN5ThOr6YG3xKuSsGrCNrN2wC4H9m_FdHphNuOnPSBc94vkhsX0LMLSrohpgh47yNq84',
    stockStatus: 'available',
    rating: 4.9,
    ratingCount: 1845
  },
  {
    id: 'p10',
    name: 'Amoxicillin 500 mg',
    brand: 'Generik',
    category: 'Obat Keras',
    description: 'Antibiotik berspektrum luas untuk mengatasi berbagai jenis infeksi bakteri pada tenggorokan, telinga, kulit, atau saluran kemih.',
    price: 12000,
    unit: '10 Kapsul',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeq4BpWt0e5FwJf9rtD7HwZPPtS1fC-oKncUiRjjW2KudJIzVjKQPAZ6kRlaMd4NCkS5oo5UCyIiD-P9IR_gG44CBCF0YMgCnw3ExEnSAxvV2__3QKY5Azo13v_7ovRCSDs69XpDuHs8E7ova4vRXsG7mE1VIdByu_Sjhwq2m7rr3I25MK2rRAnggrgHnfzObbVlfDR5oi1hdm3R5NmS6abp5y9s8cBf8xTEeS20vSRACinCKGNJCpEjzTeHQcLO37PEpOJYuBdyo',
    stockStatus: 'available',
    rating: 4.7,
    ratingCount: 204
  },
  {
    id: 'p11',
    name: 'Ibuprofen 400 mg',
    brand: 'Generik',
    category: 'Obat Bebas Terbatas',
    description: 'Obat untuk meredakan nyeri pasca operasi, sakit kepala, migrain, nyeri otot, sakit gigi, serta bengkak radang sendi.',
    price: 8500,
    unit: '10 Tablet',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNlwzJ-MPVp5ZgQCet0iP2e1XNlB3KrXyLQUuxXoPB5aG0AbZiyV8El6Bs7LWiyO55Z-BJx1VzfqMmEC-YWMGclJRKY4KMoogTXLQKOtShpPHs2HPk-ftEc1ADbQ7GBKm_ls7ENCW62YEFhxp1qHv6CWjULYwpkQSjJb8m3hQnFPoH59_faIaZ25Uj8BKI4wwR9NXzUB38wTncWcLPm1s2zN53mzBXro-tcWSy5bY3epM5QKEzQso71aqPrkLgGIRGBjuy4zqaMZY',
    stockStatus: 'available',
    rating: 4.8,
    ratingCount: 198
  }
];

export const MAIN_ADDRESS: Address = {
  name: 'Budi Santoso',
  phone: '(+62) 812 3456 7890',
  street: 'Jl. Kesehatan No. 123, Kel. Merdeka, Kec. Sejahtera, Kota Jakarta Pusat, DKI Jakarta, 10110.',
  isMain: true
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SSA-20240801',
    date: '12 Agustus 2024',
    status: 'Diproses',
    totalPrice: 145000,
    shippingCost: 10000,
    discount: 15000,
    shippingAddress: MAIN_ADDRESS,
    shippingMethod: 'Reguler',
    paymentMethod: 'BCA Transfer',
    items: [
      {
        id: 'p2',
        name: 'Vitamin C High Potency 1000mg',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsQkV02AytCZYMa3v7Q5dYdav_AYMbtPQdMX-Svr62WtioA1mY62hdhjiiU3Q-feo6MVFysoALb4ShpmcVEZEtd5ORUJIJcqw0CKR3PXxXJ0x1Ypqy_pJC-ugPU9wm4XmDacT2oN7vyefGmZUaMPcH46Ce9xm97NRZDff2G5uy9-98dZ3WiqhIx61QWpTJYG3JzPnKKdlCZpIvQXHMgzKrHB_QRC15QROY-GhMlGPJcrzqtDzfjZ0t8sTNJjBauxiWhflmEKoSWuM',
        quantity: 1,
        price: 145000,
        unit: '1 Unit • 30 Tablet',
        extraCount: 1
      }
    ]
  },
  {
    id: 'SSA-20240788',
    date: '10 Agustus 2024',
    status: 'Dikirim',
    totalPrice: 88500,
    shippingCost: 12000,
    discount: 5000,
    shippingAddress: MAIN_ADDRESS,
    shippingMethod: 'Kilat (1 Hari)',
    paymentMethod: 'GoPay',
    items: [
      {
        id: 'p9_order',
        name: 'Masker Medis 3-Ply Earloop',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnhk4O9ErW5hXfqts-eGpukXT4oElC1R_jJfn9czzqj2dmX0C8cv2orQ6lDQdTpUFN3FxBDAIbCHI2NtusF6RQrAHXKka_iI3HCtEcA6ZPs6Y3DHybSzIbaiIpTq2hFTAjqgOPzLBx2jvt8fHQHSNXphUND2HhU3GxNpAHfjwJvh6u0EbuX7ssBzGSHG4X7CvKPjSwm28Fp-cIeDMD7M3Ky2SJCeEwToAxOEKZSP1fD56ZrXHrGHq8n0-U39-ftkA663stQoaXjXc',
        quantity: 2,
        price: 88500,
        unit: '2 Kotak • 50 Pcs/Kotak'
      }
    ]
  },
  {
    id: 'SSA-20240541',
    date: '05 Agustus 2024',
    status: 'Selesai',
    totalPrice: 52000,
    shippingCost: 10000,
    discount: 0,
    shippingAddress: MAIN_ADDRESS,
    shippingMethod: 'Reguler',
    paymentMethod: 'OVO',
    items: [
      {
        id: 'flu_paket',
        name: 'Paket Obat Flu & Batuk',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACskffCt6J0XQVjIxzBIpsfOW5s6ljv8VvT35YvvpPFhkXTz7g68ceSso0NB7y1fw6G9LZ4CMrIHc4bVZfTizr6LiFkVU25m7EImk-UdNmbSUB5WIrJmMrPexdPhDYgVQedZWV3d5X1uUsJRnaZCHzvIAs9EnC-hSXk38IL-58zvNnoNWycC6mR_RcbGCHJBmjunecNW5ITd5h7Tf_9YtFYq7rdpgCWMgYnyrZCD5OJWQAWvXE6vKuVG31MfhG3nBXRauo6AV12iU',
        quantity: 1,
        price: 52000,
        unit: '1 Paket • Berbagai Merk'
      }
    ]
  }
];
