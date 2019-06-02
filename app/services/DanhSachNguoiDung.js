function DanhSachNguoiDung() {
    this.layDanhSachNguoiDung = function () {
        return $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung`,
            type: "GET",
        // trả về 2 trường hợp thành công hoặc thất bại
        });   
    }

    this.themNguoiDung = function(nguoiDung) {
        // console.log(nguoiDung);
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung`,
            type: "POST",
            data: nguoiDung
        }).done(function(data){
            if (data === "tai khoan da ton tai !"){
                alert(data)
            } else {
                location.reload();
            }
        }).fail(function(error){
            console.log(error);
        });
    }

    this.xoaNguoiDung = function(nguoiDung) {
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${nguoiDung}`,
            type: "DELETE",
        }).done(function(data){
            console.log(data);
            location.reload();
        }).fail(function(error){
            console.log(error);
        });
    }

    this.thongTinNguoiDung = function(taiKhoan) {
        var mangNguoiDung = JSON.parse(localStorage.getItem("DanhSachNguoiDung"));
        return mangNguoiDung.find(function(item){
            return item.TaiKhoan === taiKhoan;
        })
    }

    this.capNhatThongTinNguoiDung = function(nguoiDung) {
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
            type: "PUT",
            data: JSON.stringify(nguoiDung),
            contentType: "application/json",
            dataType: "json"
        }).done(function(data){
            location.reload();
        }).fail(function(error){
            console.log(error);
        });
    }
}
