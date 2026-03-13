function updateClock() {
    // Fungsi untuk memperbarui jam setiap detik
    const now = new Date(); // Mengambil data waktu sekarang
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    // Format tampilan waktu dalam Bahasa Indonesia
    const clockElement = document.querySelector('#clock span');
    if (clockElement) {
        clockElement.innerText = now.toLocaleDateString('id-ID', options);
        // Memasukkan teks waktu ke elemen HTML
    }
}

setInterval(updateClock, 1000); // Menjalankan updateClock setiap 1000ms (1 detik)
updateClock(); // Menjalankan fungsi sekali saat halaman dimuat

function searchData() {
    // Fungsi utama untuk mencari data saldo
    const searchInput = document.getElementById('searchName').value.trim();
    // Mengambil nilai input dan menghapus spasi di awal/akhir
    const resultArea = document.getElementById('resultArea');
    const loading = document.getElementById('loading');

    if (!searchInput) {
        alert("Harap masukkan Nama Lengkap atau Nama Panggilan Anak!");
        // Validasi jika input kosong
        return;
    }

    loading.classList.remove('hidden'); // Menampilkan animasi loading
    resultArea.classList.add('hidden'); // Menyembunyikan hasil sebelumnya

    const scriptUrl = "https://script.google.com/macros/s/AKfycbwv4xaZPzJPPPwtFhbGEJ6-j0bdJa1i_OkHcv6EZfJ1FuXt_61n63Ube2oHYW-OKYlGaw/exec";
    // URL Web App Google Apps Script sebagai backend database

    fetch(`${scriptUrl}?nama=${encodeURIComponent(searchInput)}`, {
        // Mengirim permintaan ke server dengan parameter nama
        method: 'GET',
        mode: 'cors',
        redirect: 'follow' 
    })
    .then(response => response.json()) // Mengubah respon server menjadi format JSON
    .then(data => {
        loading.classList.add('hidden'); // Menyembunyikan loading setelah data diterima
        if (data.status === "success") {
            // Jika data ditemukan
            document.getElementById('resNama').innerText = data.nama; // Menampilkan nama dari database
            
            const formattedSaldo = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(data.saldo);
            // Memformat angka menjadi mata uang Rupiah
            
            document.getElementById('resSaldo').innerText = formattedSaldo; // Menampilkan saldo terformat
            resultArea.classList.remove('hidden'); // Menampilkan area hasil
        } else if (data.status === "not_found") {
            // Jika data tidak ada di database
            alert(`Data dengan kata kunci "${searchInput}" tidak ditemukan. Coba gunakan ejaan atau nama panggilan lain.`);
        } else {
            alert("Error: " + data.message); // Menampilkan pesan error dari server
        }
    })
    .catch(error => {
        // Menangani jika gagal terhubung ke server
        loading.classList.add('hidden');
        alert("Gagal terhubung ke database. Pastikan koneksi internet stabil.");
        console.error("Detail Error:", error);
    });
}

function refreshPage() {
    // Fungsi untuk memuat ulang halaman secara halus
    setTimeout(() => {
        location.reload();
    }, 200);
}

document.getElementById('searchName').addEventListener("keypress", function(event) {
    // Menjalankan pencarian otomatis saat tombol "Enter" ditekan
    if (event.key === "Enter") {
        event.preventDefault();
        searchData();
    }
});
