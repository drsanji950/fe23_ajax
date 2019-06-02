$(document).ready(function () {
    var danhSachNguoiDung = new DanhSachNguoiDung();

    layDanhSachNguoiDung();
    function layDanhSachNguoiDung() {
        danhSachNguoiDung.layDanhSachNguoiDung()
            .done(function (data) {
                localStorage.setItem("DanhSachNguoiDung",JSON.stringify(data));
                taoBang(data);
            }).fail(function (error) {
                console.log(error);
            });

    }
    // tạo bảng
    function taoBang(dsnd) {
        var tblBody = $("#tblDanhSachNguoiDung");
        var content = ``;

        dsnd.map(function (item, index) {
            content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.TaiKhoan}</td>
                <td>${item.MatKhau}</td>
                <td>${item.HoTen}</td>
                <td>${item.Email}</td>
                <td>${item.SoDT}</td>
                <td>${item.TenLoaiNguoiDung}</td>
                <td>
                    <button class="btn btn-primary btnSua" data-toggle="modal" data-target="#myModal" data-taikhoan="${item.TaiKhoan}">Sửa</button>
                    <button class="btn btn-danger btnXoa" data-taikhoan="${item.TaiKhoan}">Xóa</button>
                </td>
            </tr>
            `;
        })
        tblBody.html(content);
    }

    $("#btnThemNguoiDung").click(function () {
        resetBtn("Thêm Người Dùng", "btnThem", "Thêm")
        $("#TaiKhoan").removeAttr('disabled',false);
        $("#TaiKhoan").val("");
        $("#HoTen").val("");
        $("#MatKhau").val("");
        $("#Email").val("");
        $("#SoDienThoai").val("");
        $("#loaiNguoiDung").val("GV");

    })

    $("body").delegate('.btnThem', 'click', function () {
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var sdt = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, sdt, loaiNguoiDung);
        danhSachNguoiDung.themNguoiDung(nguoiDung);
    })

    $("body").delegate('.btnXoa', 'click', function(){
        var key = $(this).data("taikhoan");
        danhSachNguoiDung.xoaNguoiDung(key);
        
    })

    $("body").delegate('.btnSua', 'click', function(){
        resetBtn("Sửa Thông Tin Người Dùng", "btnCapNhat","Cập nhật");
        var key = $(this).data("taikhoan");
        var nguoiDung = danhSachNguoiDung.thongTinNguoiDung(key);

        $("#TaiKhoan").val(nguoiDung.TaiKhoan);
        $("#TaiKhoan").attr('disabled',true);
        $("#HoTen").val(nguoiDung.HoTen);
        $("#MatKhau").val(nguoiDung.MatKhau);
        $("#Email").val(nguoiDung.Email);
        $("#SoDienThoai").val(nguoiDung.SoDT);
        $("#loaiNguoiDung").val(nguoiDung.MaLoaiNguoiDung);
    })
    // cập nhật người dùng
    $("body").delegate('.btnCapNhat', 'click', function(){
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var sdt = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, sdt, loaiNguoiDung);
        danhSachNguoiDung.capNhatThongTinNguoiDung(nguoiDung);

    })

});

function resetBtn(title, btn, btnName) {
    // Title modal
    $(".modal-title").html(title);

    // Footer modal
    var footer = `
        <button type='button' class='btn btn-success ${btn}'>${btnName}</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
    `;
    $(".modal-footer").html(footer);

}