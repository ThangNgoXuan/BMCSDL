import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-application">
      <div className="header">
        <Link to="/">
          <Button>Trang chủ</Button>
        </Link>
        <Link to="/login">
          <Button>Đăng Nhập</Button>
        </Link>
      </div>
      <div className="container">
        <Link to="/application" className="link">
            <p className="text">Đăng kí thông tin gia hạn hộ chiếu</p>
        </Link>
        <Link to="/search" className="link">
            <p className="text">Tra cứu thông tin phiếu gia hạn</p>
        </Link>
      </div>
      <div className="footer">
        <p>Bản quyền © 2017 Cục Quản lý xuất nhập cảnh - Bộ Công an</p>
        <p>
          Địa chỉ: Số 44-46 Trần Phú, Ba Đình, Hà Nội. ĐT: 02438257941, Fax:
          02438243287, Email: contact@immigration.gov.vn
        </p>
      </div>
    </div>
  );
}
