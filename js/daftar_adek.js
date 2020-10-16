function tampilData(){
    // var nama = document.querySelector("#nama");
    var email = document.querySelector("#email");
    var password = document.querySelector("#password");
    var birthday = document.querySelector("#birthday");
    var gender = document.querySelector("#gender");
    var showTable = document.querySelector("#show_table");

    var table = document.createElement("table");
    table.innerHTML = `
        <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
        </tr>
    `
}