function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    // Mengubah cara penulisan jam agar tidak menimpa ikon FontAwesome
    const clockElement = document.querySelector('#clock span');
    if (clockElement) {
        clockElement.innerText = now.toLocaleDateString('id-ID', options);
    }
}

setInterval(updateClock, 1000);
updateClock();

function searchData() {
    // Mengambil value berdasarkan ID baru
    const searchName = document.getElementById('searchName').value;
    const resultArea = document.getElementById('resultArea');
    const loading = document.getElementById('loading');

    if (!searchName) {
        alert("Harap masukkan Nama Anak!");
        return;
    }

    loading.classList.remove('hidden');
    resultArea.classList.add('hidden');

    const scriptUrl = "https://script.google.com/macros/s/AKfycbyHLQbqCHF6xchQWGEPuw9H9YeYCDcPvkZSrKUOpL02oGUv9tQ2CxObrTC-0fAIcAu4UQ/exec";

    // Parameter diubah menjadi ?nama=...
    fetch(`${scriptUrl}?nama=${encodeURIComponent(searchName)}`, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow' 
    })
    .then(response => response.json())
    .then(data => {
        loading.classList.add('hidden');
        if (data.status === "success") {
            document.getElementById('resNama').innerText = data.nama;
            
            const formattedSaldo = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(data.saldo);
            
            document.getElementById('resSaldo').innerText = formattedSaldo;
            resultArea.classList.remove('hidden');
        } else if (data.status === "not_found") {
            alert("Data Nama tersebut tidak ditemukan. Pastikan ejaan benar.");
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => {
        loading.classList.add('hidden');
        alert("Gagal terhubung ke database.");
        console.error("Detail Error:", error);
    });
}

function refreshPage() {
    // Memberikan efek klik sebentar sebelum refresh
    setTimeout(() => {
        location.reload();
    }, 200);
}

// Fitur tambahan: Tekan "Enter" pada keyboard untuk mencari
document.getElementById('searchName').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchData();
    }
});

