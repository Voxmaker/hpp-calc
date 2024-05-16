let bahanBaku = [];

document.getElementById('addBahan').addEventListener('click', () => {
    const namaBahan = document.getElementById('bahan').value;
    const biaya = parseFloat(document.getElementById('biaya').value);
    const jumlah = parseFloat(document.getElementById('jumlah').value);
    const satuan = document.getElementById('satuan').value;

    if (namaBahan && biaya && jumlah) {
        bahanBaku.push({ namaBahan, biaya, jumlah, satuan });
        displayBahanBaku();
        document.getElementById('bahan').value = '';
        document.getElementById('biaya').value = '';
        document.getElementById('jumlah').value = '';
        document.getElementById('satuan').value = 'ml';
    } else {
        alert('Harap isi semua field');
    }
});

function displayBahanBaku() {
    const bahanList = document.getElementById('bahanList');
    bahanList.innerHTML = '';
    bahanBaku.forEach((bahan, index) => {
        const bahanItem = document.createElement('div');
        bahanItem.classList.add('bahan-item');
        bahanItem.innerHTML = `
            <span>${bahan.namaBahan}: Rp ${bahan.biaya} per ${bahan.jumlah} ${bahan.satuan}</span>
            <button class="delete-button" onclick="deleteBahan(${index})">Hapus</button>
        `;
        bahanList.appendChild(bahanItem);
    });
}

function deleteBahan(index) {
    bahanBaku.splice(index, 1);
    displayBahanBaku();
}

document.getElementById('addResep').addEventListener('click', () => {
    const newResep = document.createElement('div');
    newResep.classList.add('input-group', 'resep-group');
    newResep.innerHTML = `
        <label for="resepBahan">Nama Bahan:</label>
        <input type="text" class="resepBahan" placeholder="Misal: Kopi">
        <label for="resepJumlah">Jumlah:</label>
        <input type="number" class="resepJumlah" placeholder="Misal: 10">
        <select class="resepSatuan">
            <option value="ml">ml</option>
            <option value="gram">gram</option>
            <option value="pieces">pieces</option>
        </select>
    `;
    document.getElementById('resepContainer').appendChild(newResep);
});

document.getElementById('calculate').addEventListener('click', () => {
    const namaProduk = document.getElementById('produk').value;
    const resepElements = document.querySelectorAll('.resep-group');
    let totalHPP = 0;

    resepElements.forEach(group => {
        const resepBahan = group.querySelector('.resepBahan').value;
        const resepJumlah = parseFloat(group.querySelector('.resepJumlah').value);
        const resepSatuan = group.querySelector('.resepSatuan').value;

        const bahan = bahanBaku.find(b => b.namaBahan === resepBahan && b.satuan === resepSatuan);
        if (bahan) {
            const biayaPerSatuan = bahan.biaya / bahan.jumlah;
            const biayaUntukResep = biayaPerSatuan * resepJumlah;
            totalHPP += biayaUntukResep;
        }
    });

    document.getElementById('hasil').innerText = `Harga Pokok Penjualan untuk ${namaProduk} adalah Rp ${totalHPP.toFixed(2)}`;
});
