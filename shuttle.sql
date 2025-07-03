

DROP DATABASE IF EXISTS `5SHUTTLE`;
CREATE DATABASE 5SHUTTLE CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE 5SHUTTLE;

CREATE TABLE ThuongHieu (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Ten NVARCHAR(255),
    TrangThai INT
);

CREATE TABLE MauSac (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Ten NVARCHAR(255),
    TrangThai INT
);

CREATE TABLE ChatLieu (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Ten NVARCHAR(255),
    TrangThai INT
);

CREATE TABLE TrongLuong (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Ten NVARCHAR(255),
    TrangThai INT
);

CREATE TABLE DiemCanBang (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Ten NVARCHAR(255),
    TrangThai INT
);

CREATE TABLE DoCung (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Ten NVARCHAR(255),
    TrangThai INT
);

CREATE TABLE KhuyenMai (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Ten NVARCHAR(255),
    TG_BatDau DATETIME,
    TG_KetThuc DATETIME,
    GiaTri INT,
    Loai BOOLEAN,
    TrangThai INT
);

CREATE TABLE Voucher (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Ma NVARCHAR(255),
    Ten NVARCHAR(255),
    GiaTri INT,
    GiaTriMax INT,
    DieuKienNhoNhat INT,
    Kieu INT,
    KieuGiaTri INT,
    SoLuong INT,
    NgayBatDau DATETIME,
    NgayKetThuc DATETIME,
    TrangThai INT
);

CREATE TABLE SanPham (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Ma NVARCHAR(255),
    Ten NVARCHAR(255),
    TrangThai INT
);

CREATE TABLE SanPhamCT (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdSanPham INT,
    IdThuongHieu INT,
    IdMauSac INT,
    IdChatLieu INT,
    IdTrongLuong INT,
    IdDiemCanBang INT,
    IdDoCung INT,
    Ma NVARCHAR(255),
    SoLuong INT,
    DonGia DECIMAL(10,2),
    MoTa NVARCHAR(255),
    TrangThai INT,
    FOREIGN KEY (IdSanPham) REFERENCES SanPham(Id),
    FOREIGN KEY (IdThuongHieu) REFERENCES ThuongHieu(Id),
    FOREIGN KEY (IdMauSac) REFERENCES MauSac(Id),
    FOREIGN KEY (IdChatLieu) REFERENCES ChatLieu(Id),
    FOREIGN KEY (IdTrongLuong) REFERENCES TrongLuong(Id),
    FOREIGN KEY (IdDiemCanBang) REFERENCES DiemCanBang(Id),
    FOREIGN KEY (IdDoCung) REFERENCES DoCung(Id)
);

CREATE TABLE HinhAnh (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdSanPhamCT INT,
    Link NVARCHAR(255),
    TrangThai INT,
    FOREIGN KEY (IdSanPhamCT) REFERENCES SanPhamCT(Id)
);

CREATE TABLE DiaChi (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdUser INT,
    Ten NVARCHAR(255),
    Sdt VARCHAR(255),
    IdTinh NVARCHAR(255),
    IdHuyen NVARCHAR(255),
    IdXa NVARCHAR(255),
    DiaChiCuThe NVARCHAR(255),
    FOREIGN KEY (IdUser) REFERENCES User(Id)
);

CREATE TABLE ThongBao (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdKhachHang INT,
    TieuDe NVARCHAR(255),
    NoiDung NVARCHAR(255),
    IdRedirect NVARCHAR(255),
    KieuThongBao NVARCHAR(255),
    TrangThai INT,
    FOREIGN KEY (IdKhachHang) REFERENCES User(Id)
);

CREATE TABLE GioHang (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdSanPhamCT INT,
    IdUser INT,
    SoLuong INT,
    NgayTao DATETIME,
    NgaySua DATETIME,
    FOREIGN KEY (IdSanPhamCT) REFERENCES SanPhamCT(Id),
    FOREIGN KEY (IdUser) REFERENCES User(Id)
);

CREATE TABLE HoaDon (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdUser INT,
    IdVoucher INT,
    Ma NVARCHAR(255),
    SoLuong INT,
    LoaiHoaDon NVARCHAR(255),
    PhuongThucThanhToan NVARCHAR(255),
    TenNguoiNhan NVARCHAR(255),
    SdtNguoiNhan NVARCHAR(255),
    EmailNguoiNhan NVARCHAR(255),
    DiaChiNguoiNhan NVARCHAR(255),
    PhiShip DECIMAL(10,2),
    TongTien DECIMAL(10,2),
    NgayTao DATETIME,
    NgaySua DATETIME,
    TrangThai INT,
    FOREIGN KEY (IdUser) REFERENCES User(Id),
    FOREIGN KEY (IdVoucher) REFERENCES Voucher(Id)
);

CREATE TABLE HoaDonCT (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdSanPhamCT INT,
    IdHoaDon INT,
    SoLuong INT,
    GiaBan DECIMAL(10,2),
    TrangThai INT,
    FOREIGN KEY (IdSanPhamCT) REFERENCES SanPhamCT(Id),
    FOREIGN KEY (IdHoaDon) REFERENCES HoaDon(Id)
);

CREATE TABLE SanPham_KhuyenMai (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdSanPhamCT INT,
    IdKhuyenMai INT,
    GiaKhuyenMai INT,
    FOREIGN KEY (IdSanPhamCT) REFERENCES SanPhamCT(Id),
    FOREIGN KEY (IdKhuyenMai) REFERENCES KhuyenMai(Id)
);

CREATE TABLE ThanhToan (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdUser INT,
    IdHoaDon INT,
    Ma NVARCHAR(255),
    TongTien DECIMAL(10,2),
    NgayTao DATETIME,
    PhuongThucThanhToan NVARCHAR(255),
    TrangThai INT,
    FOREIGN KEY (IdUser) REFERENCES User(Id),
    FOREIGN KEY (IdHoaDon) REFERENCES HoaDon(Id)
);

CREATE TABLE KhachHang_Voucher (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdKhachHang INT,
    IdVoucher INT,
    FOREIGN KEY (IdKhachHang) REFERENCES User(Id),
    FOREIGN KEY (IdVoucher) REFERENCES Voucher(Id)
);

CREATE TABLE LichSuDonHang (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdUser INT,
    IdHoaDon INT,
    MoTa NVARCHAR(255),
    NgayTao DATETIME,
    NgaySua DATETIME,
    TrangThai INT,
    FOREIGN KEY (IdUser) REFERENCES User(Id),
    FOREIGN KEY (IdHoaDon) REFERENCES HoaDon(Id)
);

CREATE TABLE User
(
    Id         INT AUTO_INCREMENT NOT NULL,
    Ma         VARCHAR(255)       NULL,
    HoTen      VARCHAR(255)       NULL,
    Email      VARCHAR(255)       NULL,
    MatKhau    VARCHAR(255)       NULL,
    Sdt        VARCHAR(255)       NULL,
    NgaySinh   DATE               NULL,
    GioiTinh   INT                NULL,
    Avatar     VARCHAR(255)       NULL,
    CCCD       VARCHAR(255)       NULL,
    TrangThai  INT                NULL,
    CONSTRAINT pk_user PRIMARY KEY (Id)
);

CREATE TABLE `Role`
(
    Id            INT AUTO_INCREMENT NOT NULL,
    Name          VARCHAR(255)       NULL,
    `Description` VARCHAR(255)       NULL,
    CONSTRAINT pk_role PRIMARY KEY (Id),
    CONSTRAINT uc_Role_Description UNIQUE (`Description`)
);

CREATE TABLE Permission
(
    Id            INT AUTO_INCREMENT NOT NULL,
    Name          VARCHAR(255)       NULL,
    `Description` VARCHAR(255)       NULL,
    CONSTRAINT pk_permission PRIMARY KEY (Id)
);

CREATE TABLE User_Roles
(
    IdUser  INT NOT NULL,
    IdRole  INT NOT NULL,
    CONSTRAINT pk_user_roles PRIMARY KEY (IdUser, IdRole),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (IdUser) REFERENCES User (Id),
    CONSTRAINT fk_user_roles_role FOREIGN KEY (IdRole) REFERENCES `Role` (Id)
);

CREATE TABLE Role_Permissions
(
    IdRole        INT NOT NULL,
    IdPermission  INT NOT NULL,
    CONSTRAINT pk_role_permissions PRIMARY KEY (IdRole, IdPermission),
    CONSTRAINT fk_role_permissions_role FOREIGN KEY (IdRole) REFERENCES `Role` (Id),
    CONSTRAINT fk_role_permissions_permission FOREIGN KEY (IdPermission) REFERENCES Permission (Id)
);

-- Bảng Role
INSERT INTO `Role` (Name, `Description`)
VALUES ('Customer', 'Vai trò mặc định cho người dùng thông thường'),
		('Admin', 'Admin'),
		('Staff', 'Staff');

-- Bảng ThuongHieu
INSERT INTO ThuongHieu (Ten, TrangThai) VALUES (N'Yonex', 1);
INSERT INTO ThuongHieu (Ten, TrangThai) VALUES (N'Lining', 1);
INSERT INTO ThuongHieu (Ten, TrangThai) VALUES (N'Victor', 1);
INSERT INTO ThuongHieu (Ten, TrangThai) VALUES (N'Apacs', 1);
INSERT INTO ThuongHieu (Ten, TrangThai) VALUES (N'Kumpoo', 0);

-- Bảng MauSac
INSERT INTO MauSac (Ten, TrangThai) VALUES (N'Đỏ', 1);
INSERT INTO MauSac (Ten, TrangThai) VALUES (N'Xanh', 1);
INSERT INTO MauSac (Ten, TrangThai) VALUES (N'Vàng', 0);
INSERT INTO MauSac (Ten, TrangThai) VALUES (N'Trắng', 1);
INSERT INTO MauSac (Ten, TrangThai) VALUES (N'Đen', 1);

-- Bảng ChatLieu
INSERT INTO ChatLieu (Ten, TrangThai) VALUES (N'Carbon', 1);
INSERT INTO ChatLieu (Ten, TrangThai) VALUES (N'Graphite', 1);
INSERT INTO ChatLieu (Ten, TrangThai) VALUES (N'Titanium', 0);
INSERT INTO ChatLieu (Ten, TrangThai) VALUES (N'Aluminum', 0);
INSERT INTO ChatLieu (Ten, TrangThai) VALUES (N'Steel', 0);

-- Bảng TrongLuong
INSERT INTO TrongLuong (Ten, TrangThai) VALUES (N'4U', 0);
INSERT INTO TrongLuong (Ten, TrangThai) VALUES (N'3U', 0);
INSERT INTO TrongLuong (Ten, TrangThai) VALUES (N'2U', 0);
INSERT INTO TrongLuong (Ten, TrangThai) VALUES (N'5U', 1);
INSERT INTO TrongLuong (Ten, TrangThai) VALUES (N'6U', 1);

-- Bảng DiemCanBang
INSERT INTO DiemCanBang (Ten, TrangThai) VALUES (N'Head Light', 1);
INSERT INTO DiemCanBang (Ten, TrangThai) VALUES (N'Even Balance', 0);
INSERT INTO DiemCanBang (Ten, TrangThai) VALUES (N'Head Heavy', 0);
INSERT INTO DiemCanBang (Ten, TrangThai) VALUES (N'Super Head Heavy', 1);
INSERT INTO DiemCanBang (Ten, TrangThai) VALUES (N'Neutral', 0);

-- Bảng DoCung
INSERT INTO DoCung (Ten, TrangThai) VALUES (N'Flexible', 1);
INSERT INTO DoCung (Ten, TrangThai) VALUES (N'Medium', 1);
INSERT INTO DoCung (Ten, TrangThai) VALUES (N'Stiff', 0);
INSERT INTO DoCung (Ten, TrangThai) VALUES (N'Extra Stiff', 1);
INSERT INTO DoCung (Ten, TrangThai) VALUES (N'Very Flexible', 0);


INSERT INTO User (Ma, HoTen, Sdt, Email, MatKhau, GioiTinh, VaiTro, Avatar, NgaySinh, CCCD, TrangThai) VALUES
('TK001', N'Nguyễn Văn A', '0909123456', 'a@example.com', '123456', 1, N'USER', '', '1995-05-10', '001122334455', 1),
('TK002', N'Trần Thị B', '0909234567', 'b@example.com', '123456', 0, N'USER', '', '1998-07-22', '002233445566', 1),
('TK003', N'Phạm Văn C', '0909345678', 'c@example.com', '123456', 1, N'USER', '', '1990-12-03', '003344556677', 1),
('TK004', N'Lê Thị D', '0909456789', 'd@example.com', '123456', 0, N'USER', '', '1985-03-18', '004455667788', 1),
('TK005', N'Hồ Văn E', '0909567890', 'e@example.com', '123456', 1, N'USER', '', '2000-10-30', '005566778899', 1);

INSERT INTO SanPham (Ma, Ten, TrangThai) VALUES
('SP001', N'Vợt cầu lông Yonex 1', 1),
('SP002', N'Vợt cầu lông Lining 2', 1),
('SP003', N'Vợt cầu lông Victor 3', 1),
('SP004', N'Vợt cầu lông Apacs 4', 1),
('SP005', N'Vợt cầu lông Kumpoo 5', 1);

INSERT INTO Voucher (Ma, Ten, GiaTri, GiaTriMax, DieuKienNhoNhat, Kieu, KieuGiaTri, SoLuong, NgayBatDau, NgayKetThuc, TrangThai) VALUES
('VC001', N'Voucher 1', 10, 100000, 50000, 0, 0, 20, NOW(), DATE_ADD(NOW(), INTERVAL 10 DAY), 1),
('VC002', N'Voucher 2', 15, 120000, 60000, 0, 1, 25, NOW(), DATE_ADD(NOW(), INTERVAL 10 DAY), 1),
('VC003', N'Voucher 3', 20, 150000, 70000, 1, 0, 30, NOW(), DATE_ADD(NOW(), INTERVAL 10 DAY), 1),
('VC004', N'Voucher 4', 25, 200000, 80000, 1, 1, 15, NOW(), DATE_ADD(NOW(), INTERVAL 10 DAY), 1),
('VC005', N'Voucher 5', 30, 250000, 90000, 0, 0, 10, NOW(), DATE_ADD(NOW(), INTERVAL 10 DAY), 1);

INSERT INTO SanPhamCT (IdSanPham, IdThuongHieu, IdMauSac, IdChatLieu, IdTrongLuong, IdDiemCanBang, IdDoCung, Ma, SoLuong, DonGia, MoTa, TrangThai) VALUES
(1,1,1,1,1,1,1,'SPCT001', 20, 700.00, N'Mô tả sản phẩm 1', 1),
(2,2,2,2,2,2,2,'SPCT002', 30, 800.00, N'Mô tả sản phẩm 2', 1),
(3,3,3,3,3,3,3,'SPCT003', 40, 600.00, N'Mô tả sản phẩm 3', 1),
(4,4,4,4,4,4,4,'SPCT004', 50, 900.00, N'Mô tả sản phẩm 4', 1),
(5,5,5,5,5,5,5,'SPCT005', 60, 1000.00, N'Mô tả sản phẩm 5', 1);

INSERT INTO DiaChi (IdUser, Ten, Sdt, IdTinh, IdHuyen, IdXa, DiaChiCuThe) VALUES
(1, N'Địa chỉ 1', '0909100000', '01', '001', '0001', N'123 đường A, Q1'),
(2, N'Địa chỉ 2', '0909200000', '02', '002', '0002', N'456 đường B, Q2'),
(3, N'Địa chỉ 3', '0909300000', '03', '003', '0003', N'789 đường C, Q3'),
(4, N'Địa chỉ 4', '0909400000', '04', '004', '0004', N'111 đường D, Q4'),
(5, N'Địa chỉ 5', '0909500000', '05', '005', '0005', N'222 đường E, Q5');

INSERT INTO GioHang (IdSanPhamCT, IdUser, SoLuong, NgayTao, NgaySua) VALUES
(1,1,2,NOW(),NOW()),
(2,2,1,NOW(),NOW()),
(3,3,3,NOW(),NOW()),
(4,4,2,NOW(),NOW()),
(5,5,1,NOW(),NOW());

INSERT INTO HoaDon (IdUser, IdVoucher, Ma, SoLuong, LoaiHoaDon, PhuongThucThanhToan, TenNguoiNhan, SdtNguoiNhan, EmailNguoiNhan, DiaChiNguoiNhan, PhiShip, TongTien, NgayTao, NgaySua, TrangThai) VALUES
(1,1,'HD001',2,N'Online',N'Chuyển khoản',N'Khách 1','0909000111','khach1@mail.com',N'Địa chỉ giao hàng 1',20000,150000,NOW(),NOW(),6),
(2,2,'HD002',1,N'Online',N'COD',N'Khách 2','0909000222','khach2@mail.com',N'Địa chỉ giao hàng 2',20000,160000,NOW(),NOW(),6),
(3,3,'HD003',3,N'Offline',N'Tiền mặt',N'Khách 3','0909000333','khach3@mail.com',N'Địa chỉ giao hàng 3',20000,140000,NOW(),NOW(),7),
(4,4,'HD004',1,N'Online',N'Chuyển khoản',N'Khách 4','0909000444','khach4@mail.com',N'Địa chỉ giao hàng 4',20000,180000,NOW(),NOW(),8),
(5,5,'HD005',2,N'Offline',N'COD',N'Khách 5','0909000555','khach5@mail.com',N'Địa chỉ giao hàng 5',20000,170000,NOW(),NOW(),8);

INSERT INTO HoaDonCT (IdSanPhamCT, IdHoaDon, SoLuong, GiaBan, TrangThai) VALUES
(1,1,1,700.00,1),
(2,2,2,800.00,1),
(3,3,1,600.00,1),
(4,4,2,900.00,1),
(5,5,1,1000.00,1);

INSERT INTO LichSuDonHang (IdUser, IdHoaDon, MoTa, NgayTao, NgaySua, TrangThai) VALUES
(1,1,N'Đặt hàng lần 1',NOW(),NOW(),1),
(2,2,N'Đặt hàng lần 2',NOW(),NOW(),1),
(3,3,N'Đặt hàng lần 3',NOW(),NOW(),1),
(4,4,N'Đặt hàng lần 4',NOW(),NOW(),1),
(5,5,N'Đặt hàng lần 5',NOW(),NOW(),1);

-- Tuần này
INSERT INTO HoaDon (IdUser, IdVoucher, Ma, SoLuong, LoaiHoaDon, PhuongThucThanhToan, TenNguoiNhan, SdtNguoiNhan, EmailNguoiNhan, DiaChiNguoiNhan, PhiShip, TongTien, NgayTao, NgaySua, TrangThai) VALUES
(1,1,'HD006',1,N'Online',N'Chuyển khoản',N'Khách 6','0911000111','khach6@mail.com',N'Địa chỉ giao hàng 6',20000,200000,'2025-06-23','2025-06-23',6),
(2,2,'HD007',2,N'Offline',N'Tiền mặt',N'Khách 7','0911000222','khach7@mail.com',N'Địa chỉ giao hàng 7',20000,180000,'2025-06-22','2025-06-22',7),
(3,3,'HD008',3,N'Online',N'COD',N'Khách 8','0911000333','khach8@mail.com',N'Địa chỉ giao hàng 8',20000,220000,'2025-06-21','2025-06-21',6),
(4,4,'HD009',1,N'Online',N'Tiền mặt',N'Khách 9','0911000444','khach9@mail.com',N'Địa chỉ giao hàng 9',20000,230000,'2025-06-20','2025-06-20',8),
(5,5,'HD010',2,N'Offline',N'Chuyển khoản',N'Khách 10','0911000555','khach10@mail.com',N'Địa chỉ giao hàng 10',20000,190000,'2025-06-19','2025-06-19',7),
(1,1,'HD011',2,N'Online',N'COD',N'Khách 11','0911000666','khach11@mail.com',N'Địa chỉ giao hàng 11',20000,170000,'2025-06-10','2025-06-10',6),
(2,2,'HD012',1,N'Offline',N'Tiền mặt',N'Khách 12','0911000777','khach12@mail.com',N'Địa chỉ giao hàng 12',20000,180000,'2025-06-05','2025-06-05',7),
(3,3,'HD013',2,N'Online',N'Chuyển khoản',N'Khách 13','0911000888','khach13@mail.com',N'Địa chỉ giao hàng 13',20000,190000,'2025-06-03','2025-06-03',8),
(4,4,'HD014',1,N'Offline',N'COD',N'Khách 14','0911000999','khach14@mail.com',N'Địa chỉ giao hàng 14',20000,160000,'2025-06-01','2025-06-01',6),
(5,5,'HD015',3,N'Online',N'Tiền mặt',N'Khách 15','0911010000','khach15@mail.com',N'Địa chỉ giao hàng 15',20000,200000,'2025-06-02','2025-06-02',7),
(1,1,'HD016',2,N'Offline',N'COD',N'Khách 16','0911011111','khach16@mail.com',N'Địa chỉ giao hàng 16',20000,210000,'2025-05-15','2025-05-15',6),
(2,2,'HD017',1,N'Online',N'Chuyển khoản',N'Khách 17','0911012222','khach17@mail.com',N'Địa chỉ giao hàng 17',20000,180000,'2025-04-10','2025-04-10',7),
(3,3,'HD018',2,N'Offline',N'Tiền mặt',N'Khách 18','0911013333','khach18@mail.com',N'Địa chỉ giao hàng 18',20000,220000,'2025-03-05','2025-03-05',6),
(4,4,'HD019',1,N'Online',N'COD',N'Khách 19','0911014444','khach19@mail.com',N'Địa chỉ giao hàng 19',20000,230000,'2025-02-20','2025-02-20',8),
(5,5,'HD020',3,N'Offline',N'Tiền mặt',N'Khách 20','0911015555','khach20@mail.com',N'Địa chỉ giao hàng 20',20000,240000,'2025-01-10','2025-01-10',6);



INSERT INTO HoaDonCT (IdSanPhamCT, IdHoaDon, SoLuong, GiaBan, TrangThai) VALUES
(1,26,1,1000.00,1),
(2,27,2,900.00,1),
(3,28,1,1100.00,1),
(4,29,2,950.00,1),
(5,30,1,1050.00,1),
(1,31,1,800.00,1),
(2,32,2,850.00,1),
(3,33,1,900.00,1),
(4,34,2,870.00,1),
(5,35,3,750.00,1),
(1,36,1,950.00,1),
(2,37,2,980.00,1),
(3,38,1,1020.00,1),
(4,39,2,990.00,1),
(5,40,3,970.00,1);


        SELECT SUM(h.TongTien)
        FROM 5SHUTTLE.HoaDon h
        WHERE DATE(h.NgayTao) >= CURDATE()
          AND DATE(h.NgayTao) < CURDATE() + INTERVAL 1 DAY
          AND h.TrangThai = 6;
          
		SELECT SUM(h.TongTien)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.NgayTao >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
          AND h.NgayTao < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY);
          
                  SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 6 AND h.NgayTao >= CURDATE() AND h.NgayTao < CURDATE() + INTERVAL 1 DAY;

        SELECT SUM(hdct.SoLuong)
        FROM 5SHUTTLE.HoaDonCT hdct
        JOIN 5SHUTTLE.HoaDon hd ON hdct.IdHoaDon = hd.Id
        WHERE hd.NgayTao >= CURDATE() AND hd.NgayTao < CURDATE() + INTERVAL 1 DAY;

		SELECT COUNT(h.Id)
		FROM 5SHUTTLE.HoaDon h
		WHERE h.TrangThai = 6
		AND DATE(h.NgayTao) = '2025-06-23';
  
		SELECT SUM(hdct.SoLuong)
        FROM 5SHUTTLE.HoaDonCT hdct
        JOIN 5SHUTTLE.HoaDon hd ON hdct.IdHoaDon = hd.Id
        WHERE DATE(hd.NgayTao) >= '2025-06-22' AND DATE(hd.NgayTao) <= '2025-06-23';
        
                SELECT COUNT(h.Id)
        FROM 5SHUTTLE.HoaDon h
        WHERE h.TrangThai = 7 AND DATE(h.NgayTao) >= '2025-06-22' AND DATE(h.NgayTao) <= '2025-06-23';







