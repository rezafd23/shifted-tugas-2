var data = [];
function getValue() {
    var getNama = document.getElementById('nama').value;
    var getEmail = document.getElementById('email').value;
    var dataTable = document.getElementById('dataTable');
    var dataRegister = {
        'nama' : getNama,
        'email' : getEmail,
    }
    data.push(dataRegister);
    showValue();
}

function showValue() {
    var dataTable = document.getElementById('dataTable');
    dataTable.innerHTML = "";
    dataTable.innerHTML += `
        <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Menu</th>
        </tr>
    `;
    for (let i = 0; i < data.length; i++) {
        dataTable.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${data[i].nama}</td>
                <td>${data[i].email}</td>
                <td class="text-center">
                <button type="button" class="btn btn-primary btn-sm" onclick="edit(${i})">Edit</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="hapus(${i})">Hapus</button>
                </td>
            </tr>
        `
    }
}

function edit(i) {
    var nama = document.getElementById('nama').value;
    var email = document.getElementById('email').value;
    data[i].nama = nama;
    data[i].email = email;
    showValue();
}

function hapus(i) {
    data.splice(i, 1);
    showValue();
}
