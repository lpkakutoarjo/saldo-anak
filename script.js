function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const clockElement = document.querySelector('#clock span');
    if (clockElement) {
        clockElement.innerText = now.toLocaleDateString('id-ID', options);
    }
}

setInterval(updateClock, 1000);
updateClock();

function searchData() {
    // Menambahkan .trim() untuk menghapus spasi berlebih di awal/akhir ketikan
    const searchInput = document.getElementById('searchName').value.trim();
    const resultArea = document.getElementById('resultArea');
    const loading = document.getElementById('loading');

    // Validasi input disesuaikan untuk nama panggilan
    if (!searchInput) {
        alert("Harap masukkan Nama Lengkap atau Nama Panggilan Anak!");
        return;
    }

    loading.classList.remove('hidden');
    resultArea.classList.add('hidden');

    const scriptUrl = "https://script.google.com/macros/s/AKfycbwv4xaZPzJPPPwtFhbGEJ6-j0bdJa1i_OkHcv6EZfJ1FuXt_61n63Ube2oHYW-OKYlGaw/exec";

    fetch(`${scriptUrl}?nama=${encodeURIComponent(searchInput)}`, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow' 
    })
    .then(response => response.json())
    .then(data => {
        loading.classList.add('hidden');
        if (data.status === "success") {
            // Menampilkan nama asli dari database, meskipun yang dicari nama panggilan
            document.getElementById('resNama').innerText = data.nama;
            
            const formattedSaldo = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(data.saldo);
            
            document.getElementById('resSaldo').innerText = formattedSaldo;
            resultArea.classList.remove('hidden');
        } else if (data.status === "not_found") {
            alert(`Data dengan kata kunci "${searchInput}" tidak ditemukan. Coba gunakan ejaan atau nama panggilan lain.`);
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => {
        loading.classList.add('hidden');
        alert("Gagal terhubung ke database. Pastikan koneksi internet stabil.");
        console.error("Detail Error:", error);
    });
}

function refreshPage() {
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
