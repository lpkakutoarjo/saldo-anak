// Anda dapat mengganti link ini jika melakukan "New Deployment" pada Google Apps Script
const scriptUrl = "https://script.google.com/macros/s/AKfycbyTPMyqcLY4vMOaajbYeZix0D_Nwzr2G8L_92kNZC4RA9Zg5oxdyssmZpZiiAhqQg__/exec";

// Variabel Global untuk menyimpan semua data riwayat dari server
let globalHistoryData = [];

function formatRp(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
}

// Fungsi Utama untuk Merender Daftar Riwayat
function renderHistoryList(data) {
    const historyContainer = document.getElementById('resHistory');
    historyContainer.innerHTML = ""; 

    if (data && data.length > 0) {
        data.forEach(trx => {
            const isMasuk = trx.jenis === "Masuk";
            const itemClass = isMasuk ? "item-in" : "item-out";
            const iconClass = isMasuk ? "fa-arrow-down-left" : "fa-arrow-up-right";
            const amountSign = isMasuk ? "+" : "-";
            const keterangan = trx.keterangan && trx.keterangan !== "-" ? trx.keterangan : "Transaksi Tanpa Keterangan";

            historyContainer.innerHTML += `
                <div class="bank-history-card ${itemClass}">
                    <div class="bank-icon-wrapper">
                        <i class="fa-solid ${iconClass}"></i>
                    </div>
                    <div class="bank-info-wrapper">
                        <div class="bank-trx-title">${keterangan}</div>
                        <div class="bank-trx-subtitle">
                            <span class="bank-type-label">${trx.jenis}</span> • ${trx.tanggal}
                        </div>
                    </div>
                    <div class="bank-amount-wrapper ${isMasuk ? 'txt-in' : 'txt-out'}">
                        ${amountSign}${formatRp(trx.nominal)}
                    </div>
                </div>
            `;
        });
    } else {
        historyContainer.innerHTML = `<div class="no-history">Belum ada riwayat transaksi yang tercatat.</div>`;
    }
}

// Menampilkan semua riwayat dan memunculkan form pencarian
function showAllHistory() {
    document.getElementById('history-title').innerText = "Seluruh Riwayat Transaksi";
    document.getElementById('history-search-container').classList.remove('hidden');
    document.getElementById('btn-more-container').classList.add('hidden');
    renderHistoryList(globalHistoryData);
}

// Fungsi Pencarian/Filter Riwayat Terdahulu
function filterHistory() {
    const term = document.getElementById('searchHistory').value.toLowerCase();
    const filtered = globalHistoryData.filter(h => 
        h.jenis.toLowerCase().includes(term) || 
        h.tanggal.toLowerCase().includes(term) ||
        h.nominal.toString().includes(term) ||
        (h.keterangan && h.keterangan.toLowerCase().includes(term)) // Memungkinkan pencarian berdasarkan keterangan
    );
    renderHistoryList(filtered);
}
function searchData() {
    const searchInput = document.getElementById('searchName').value.trim();
    const resultArea = document.getElementById('resultArea');
    const loading = document.getElementById('loading');
    const btnSearch = document.getElementById('btnSearch');

    if (!searchInput) {
        alert("Peringatan: Harap masukkan Nama Lengkap atau Nama Panggilan Anak!");
        return;
    }

    loading.classList.remove('hidden'); 
    resultArea.classList.add('hidden'); 
    btnSearch.disabled = true;
    btnSearch.innerText = "Mencari...";

    fetch(`${scriptUrl}?nama=${encodeURIComponent(searchInput)}`, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow' 
    })
    .then(response => response.json()) 
    .then(data => {
        loading.classList.add('hidden'); 
        btnSearch.disabled = false;
        btnSearch.innerText = "Cari Data";
        
        if (data.status === "success") {
            document.getElementById('resNama').innerText = data.nama; 
            document.getElementById('resSaldo').innerText = formatRp(data.saldo); 
            
            // Simpan riwayat dari server ke variabel global
            globalHistoryData = data.history || [];
            
            // Reset state UI Riwayat (jika sebelumnya sudah diubah)
            document.getElementById('history-title').innerText = "3 Transaksi Terakhir";
            document.getElementById('history-search-container').classList.add('hidden');
            document.getElementById('searchHistory').value = "";

            // Jika riwayat lebih dari 3, tampilkan hanya 3 & munculkan tombol "Lihat Semua"
            if (globalHistoryData.length > 3) {
                document.getElementById('btn-more-container').classList.remove('hidden');
                renderHistoryList(globalHistoryData.slice(0, 3));
            } else {
                // Jika kurang dari 3, tampilkan semua & sembunyikan tombol
                document.getElementById('btn-more-container').classList.add('hidden');
                renderHistoryList(globalHistoryData);
            }

            resultArea.classList.remove('hidden'); 
        } else if (data.status === "not_found") {
            alert(`Pencarian gagal: Data dengan kata kunci "${searchInput}" tidak ditemukan. Silakan cek ejaan nama kembali.`);
        } else {
            alert("Error: " + data.message); 
        }
    })
    .catch(error => {
        loading.classList.add('hidden');
        btnSearch.disabled = false;
        btnSearch.innerText = "Cari Data";
        alert("Gagal terhubung ke database server. Pastikan koneksi internet Anda stabil.");
    });
}

function refreshPage() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => { location.reload(); }, 300);
}

document.getElementById('searchName').addEventListener("keypress", function(event) {
    if (event.key === "Enter") { event.preventDefault(); searchData(); }
});
