// BT1:
document.getElementById('tax').onclick = function (e) {
    e.preventDefault(); //click nút trong form sẽ ko bị F5 lại trang web
    let name = document.getElementById("name").value;
    let income = +document.getElementById("income").value;
    let dependent = document.getElementById("dependent").value;

    let tax = 0;

    let grossIncome = 0;

    grossIncome = income - 4 - dependent * 1.6;

    if (!name) {
        alert("Vui lòng nhập họ và tên");
        return;
    }

    if (grossIncome <= 60) {
        tax = grossIncome * 0.05
    } else if (grossIncome <= 120) {
        tax = (60 * 0.05) + (grossIncome - 60) * 0.1;
    } else if (grossIncome <= 210) {
        tax = (60 * 0.05) + (60 * 0.1) + (grossIncome - 120) * 0.15;
    } else if (grossIncome <= 384) {
        tax = (60 * 0.05) + (60 * 0.1) + (90 * 0.15) + (grossIncome - 210) * 0.2;
    } else if (grossIncome <= 624) {
        tax = (60 * 0.05) + (60 * 0.1) + (90 * 0.15) + (174 * 0.2) + (grossIncome - 384) * 0.25;
    } else if (grossIncome <= 960) {
        tax = (60 * 0.05) + (60 * 0.1) + (90 * 0.15) + (174 * 0.2) + (240 * 0.25) + (grossIncome - 624) * 0.3;
    } else {
        tax = (60 * 0.05) + (60 * 0.1) + (90 * 0.15) + (174 * 0.2) + (240 * 0.25) + (336 * 0.3) + (grossIncome - 960) * 0.35;
    }

    document.getElementById("showTax").innerHTML = name + " - " + tax.toLocaleString() + " TRIỆU";
}

//BT2: 
document.getElementById('type').onchange = function (e) {
    // console.log(e.target.value); //lấy giá trị sau khi mình chọn select

    // thuộc tính className sẽ gán giá trị trực tiếp vào class html (mất hết tất cả các class ban đầu)
    // thuộc tính classList.add sẽ thêm nối đuôi class vào ...
    if (e.target.value === "business") {
        document.getElementById('connection').className = "d-block";
    } else {
        document.getElementById('connection').className = "d-none";
    }
}
document.getElementById('payment').onclick = function () {
    let code = document.getElementById('code').value;
    let premium = +document.getElementById('premium').value;
    let connection = +document.getElementById('connection').value;
    let type = document.getElementById('type').value;
    let serviceFeeBusiness = 0;
    let payment = 0;
    const HANDLE_FEE_HOUSE = 4.5;
    const HANDLE_FEE_BUSINESS = 15;
    const SERVICE_FEE_HOUSE = 20.5;
    const STOLEN_HOUSE = 7.5;
    const STOLEN_BUSINESS = 50;

    if (!code) {
        alert("Vui lòng nhập mã khách hàng");
        return;
    }
    if (!type) {
        alert("Vui lòng chọn loại khách hàng");
        return;
    }

    if (type === "business" && (connection <= 0 || isNaN(connection))) {
        alert("Số kết nối không hợp lệ!");
        return;
    }

    if (premium <= 0 || isNaN(premium)) {
        alert("Số kênh cao cấp không hợp lệ!");
        return;
    }

    if (type === "house") {
        payment = HANDLE_FEE_HOUSE + SERVICE_FEE_HOUSE + (STOLEN_HOUSE * premium);
    } else {
        if (connection <= 10) {
            serviceFeeBusiness = 75;
        } else {
            serviceFeeBusiness = 75 + (connection - 10) * 5;
        }
        payment = HANDLE_FEE_BUSINESS + serviceFeeBusiness + (STOLEN_BUSINESS * premium);
    }
    document.getElementById('showPayment').innerHTML = "Mã số: " + code + " - " + payment + " $";
}