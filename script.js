:root {
    --primary-blue: #0A4275;
    --secondary-blue: #166BB5;
    --accent-blue: #E1F0FF;
    --success-green: #10b981;
    --danger-red: #ef4444;
    --text-dark: #1e293b;
    --text-light: #64748b;
    --white: #ffffff;
    --bg-gradient: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
    --card-bg: rgba(255, 255, 255, 0.95);
    --shadow: 0 15px 35px rgba(10, 66, 117, 0.1);
}

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }

body {
    background: var(--bg-gradient);
    min-height: 100vh;
    color: var(--text-dark);
    display: flex;
    justify-content: center;
    padding: 30px 20px;
    position: relative;
    overflow-x: hidden;
}

/* Dekorasi Background */
.background-shape {
    position: fixed; top: -100px; left: -100px; width: 400px; height: 400px;
    background: var(--secondary-blue); border-radius: 50%; opacity: 0.05; z-index: -1;
}
.background-shape.shape-2 {
    top: auto; left: auto; bottom: -150px; right: -150px; width: 500px; height: 500px; background: var(--primary-blue);
}

.container { width: 100%; max-width: 900px; position: relative; z-index: 10; }

/* Header & Logo */
.hero-section { text-align: center; margin-bottom: 40px; }
.logo-area { margin-bottom: 25px; }
.main-logo { 
    width: 110px; margin-bottom: 15px; 
    filter: drop-shadow(0 8px 16px rgba(10,66,117,0.15));
    animation: floatLogo 3s ease-in-out infinite;
}
.hero-title { font-size: 2.2rem; font-weight: 800; color: var(--primary-blue); margin-bottom: 5px; }
.hero-subtitle { font-size: 1.2rem; font-weight: 600; color: var(--secondary-blue); margin-bottom: 5px; }
.hero-desc { font-size: 0.95rem; font-weight: 500; color: var(--text-light); }

/* Pencarian */
.search-wrapper { margin-top: 25px; }
.search-box {
    background: var(--white);
    padding: 8px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    box-shadow: var(--shadow);
    max-width: 550px;
    margin: 0 auto;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}
.search-box:focus-within { border-color: var(--secondary-blue); box-shadow: 0 10px 25px rgba(22, 107, 181, 0.2); transform: translateY(-2px); }
.search-icon-left { padding: 0 15px; color: var(--text-light); font-size: 1.1rem; }
.search-box input {
    border: none; outline: none; flex: 1; padding: 12px 5px; font-size: 1rem; color: var(--text-dark); background: transparent;
}
.search-box button {
    background: var(--secondary-blue); color: white; border: none; padding: 12px 25px; border-radius: 40px; cursor: pointer; font-weight: 600; transition: 0.3s;
}
.search-box button:hover { background: var(--primary-blue); }

/* Status Bar */
#status-bar { display: inline-flex; align-items: center; background: #e0f2fe; color: var(--secondary-blue); padding: 6px 15px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; margin-top: 20px; }
.dot { height: 8px; width: 8px; background-color: var(--secondary-blue); border-radius: 50%; margin-right: 8px; animation: blink 1.5s infinite; }

/* Grid Dashboard - LANDSCAPE MODE */
.dashboard-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px; }

/* Kartu */
.card {
    background: var(--card-bg); border-radius: 20px; padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid rgba(255,255,255,0.6); position: relative; overflow: hidden; transition: 0.3s;
}
.card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.1); }

/* Teks dalam Kartu */
.card-tag { position: absolute; top: 18px; right: 20px; font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: var(--secondary-blue); background: var(--accent-blue); padding: 5px 12px; border-radius: 20px; }
.card-icon { font-size: 2.2rem; color: var(--secondary-blue); margin-bottom: 15px; }
.card-content h3 { font-size: 0.9rem; color: var(--text-light); margin-bottom: 5px; font-weight: 500; }
.highlight-text { font-size: 1.4rem; font-weight: 700; color: var(--primary-blue); margin-bottom: 15px; }
.balance-text { font-size: 2.2rem; font-weight: 800; color: var(--secondary-blue); margin-bottom: 10px; }

/* Lencana Kecil */
.status-badge { display: inline-block; background: #dcfce7; color: #166534; padding: 5px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; }
.update-ts { font-size: 0.8rem; color: #94a3b8; display: flex; align-items: center; gap: 5px; }

/* Kartu Riwayat (Memanjang 2 Kolom di PC) */
.card-history { grid-column: span 2; padding: 25px 30px; }
.card-header-history { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--accent-blue); padding-bottom: 15px; margin-bottom: 20px; }
.card-header-history div { display: flex; align-items: center; gap: 10px; color: var(--primary-blue); font-weight: 600; font-size: 1.1rem; }

/* --- Styling Cari Riwayat Terdahulu --- */
.history-search { position: relative; width: 220px; }
.history-search i { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-light); font-size: 0.85rem; }
.history-search input {
    width: 100%; padding: 8px 12px 8px 32px; border: 1px solid #cbd5e1; border-radius: 20px;
    font-size: 0.8rem; outline: none; transition: 0.3s; background: #f8fafc;
}
.history-search input:focus { border-color: var(--secondary-blue); box-shadow: 0 0 0 3px rgba(22, 107, 181, 0.1); background: white; }

/* --- List Riwayat Ala Mobile Banking --- */
.history-list { display: flex; flex-direction: column; gap: 12px; }

.bank-history-card {
    display: flex;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #f1f5f9;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}
.bank-history-card:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border-color: var(--accent-blue);
}

/* Icon Styling */
.bank-icon-wrapper {
    width: 45px;
    height: 45px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    margin-right: 15px;
}
.item-in .bank-icon-wrapper { background: #ecfdf5; color: #10b981; }
.item-out .bank-icon-wrapper { background: #fef2f2; color: #ef4444; }

/* Info Styling */
.bank-info-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
}
.bank-trx-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-dark);
    line-height: 1.3;
    margin-bottom: 4px;
    text-transform: capitalize;
}
.bank-trx-subtitle {
    font-size: 0.75rem;
    color: var(--text-light);
}
.bank-type-label {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Amount Styling */
.bank-amount-wrapper {
    font-size: 1rem;
    font-weight: 700;
    text-align: right;
    white-space: nowrap;
    margin-left: 10px;
}
.txt-in { color: #059669; }
.txt-out { color: #dc2626; }

.no-history { text-align: center; font-size: 0.9rem; color: var(--text-light); padding: 20px 0; font-style: italic; }

/* Tombol Aksi */
.mt-3 { margin-top: 20px; }
.text-center { text-align: center; }

.btn-more-history {
    background: #f8fafc; border: 1px solid #e2e8f0; color: var(--secondary-blue);
    width: 100%; padding: 12px; border-radius: 12px; font-size: 0.9rem; font-weight: 600;
    cursor: pointer; transition: 0.3s; margin-top: 10px;
}
.btn-more-history:hover { background: var(--accent-blue); }

.action-bottom { text-align: center; margin-top: 30px; }
.btn-refresh-bottom { background: var(--white); color: var(--text-dark); border: 1px solid #cbd5e1; padding: 12px 25px; border-radius: 40px; cursor: pointer; font-weight: 600; transition: 0.3s; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
.btn-refresh-bottom:hover { background: #f1f5f9; transform: translateY(-2px); }

/* Utilities & Footer */
.hidden { display: none !important; }
#loading { text-align: center; margin: 40px 0; color: var(--primary-blue); font-weight: 600; }
.spinner { width: 45px; height: 45px; border: 4px solid var(--accent-blue); border-top: 4px solid var(--secondary-blue); border-radius: 50%; margin: 0 auto 15px auto; animation: spin 1s linear infinite; }

footer { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid #cbd5e1; }
.footer-links { margin-bottom: 15px; }
.web-link { display: inline-flex; align-items: center; gap: 8px; background: var(--white); color: var(--primary-blue); padding: 8px 16px; border-radius: 30px; text-decoration: none; font-size: 0.85rem; font-weight: 600; transition: 0.3s; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.web-link:hover { background: var(--primary-blue); color: var(--white); transform: translateY(-3px); }
.main-copyright { color: var(--text-light); font-size: 0.8rem; line-height: 1.5; margin-bottom: 15px; }
.magang-badge { display: inline-block; font-size: 0.75rem; color: #64748b; padding: 6px 15px; background: rgba(255,255,255,0.5); border-radius: 8px; }

/* Animasi */
@keyframes blink { 0% {opacity: 1;} 50% {opacity: 0.3;} 100% {opacity: 1;} }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes floatLogo { 0% { transform: translateY(0px); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0px); } }
.fade-in { animation: fadeIn 0.8s ease; }
.slide-in-left { animation: slideLeft 0.6s ease-out forwards; opacity: 0; }
.slide-in-right { animation: slideRight 0.6s ease-out forwards; opacity: 0; }
.slide-in-bottom { animation: slideBottom 0.6s ease-out forwards; opacity: 0; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes slideRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes slideBottom { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

/* Responsif (HP & Layar Kecil) */
@media (max-width: 768px) {
    body { padding: 20px 15px; }
    .dashboard-grid { grid-template-columns: 1fr; } /* Otomatis Vertikal di HP */
    .card-history { grid-column: span 1; padding: 20px; }
    .hero-title { font-size: 1.8rem; }
    .hero-subtitle { font-size: 1rem; }
    
    /* Penyesuaian Pencarian Mobile */
    .search-box { flex-direction: column; padding: 0; background: transparent; box-shadow: none; border: none; }
    .search-box:focus-within { transform: none; box-shadow: none; border-color: transparent; }
    .search-box input { 
        width: 100%; background: var(--white); border-radius: 12px; padding: 15px 20px; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 12px; 
        border: 2px solid transparent; box-sizing: border-box; 
    }
    .search-box input:focus { border-color: var(--secondary-blue); box-shadow: 0 0 0 4px rgba(22, 107, 181, 0.15); }
    .search-icon-left { display: none; }
    .search-box button { width: 100%; padding: 15px; border-radius: 12px; box-sizing: border-box; }

    /* Responsif untuk Header Kartu Riwayat */
    .card-header-history { flex-direction: column; align-items: flex-start; gap: 15px; }
    .history-search { width: 100%; }
}

/* Responsif Spesifik untuk Kartu Bank (Layar Sangat Kecil) */
@media (max-width: 480px) {
    .bank-history-card { padding: 12px; }
    .bank-trx-title { font-size: 0.85rem; }
    .bank-amount-wrapper { font-size: 0.9rem; margin-left: 5px; }
    .bank-icon-wrapper { width: 38px; height: 38px; font-size: 1rem; margin-right: 10px; }
}
