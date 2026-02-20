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
    const regNo = document.getElementById('regNo').value;
    const resultArea = document.getElementById('resultArea');
    const loading = document.getElementById('loading');

    if (!regNo) {
        alert("Harap masukkan Nomor Registrasi Anak!");
        return;
    }

    // Tampilkan loading, sembunyikan hasil sebelumnya
    loading.classList.remove('hidden');
    resultArea.classList.add('hidden');

    // Link Web App Google Script Anda
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyF7jrXtHaH5rqJANvVmRt9RtXKAi2nbT86u-tCeieTaNbqMvPNP-Uz_cDjFy-YH2-U0w/exec";

    // Fetch API dengan parameter redirect follow
    fetch(`${scriptUrl}?regNo=${encodeURIComponent(regNo)}`, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow' 
    })
    .then(response => response.json())
    .then(data => {
        loading.classList.add('hidden');
        if (data.status === "success") {
            document.getElementById('resReg').innerText = data.noReg;
            document.getElementById('resNama').innerText = data.nama;
            
            // Format angka menjadi Rupiah (Rp)
            const formattedSaldo = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(data.saldo);
            
            document.getElementById('resSaldo').innerText = formattedSaldo;
            
            // Tampilkan hasil dengan animasi
            resultArea.classList.remove('hidden');
        } else if (data.status === "not_found") {
            alert("Data Anak tidak ditemukan. Silakan cek kembali Nomor Registrasi.");
        } else {
            alert("Error dari server: " + data.message);
        }
    })
    .catch(error => {
        loading.classList.add('hidden');
        alert("Gagal terhubung ke database. Pastikan koneksi internet aktif atau buka menggunakan Live Server.");
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
document.getElementById('regNo').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchData();
    }
});