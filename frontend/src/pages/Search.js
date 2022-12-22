import { Button, Form, Input, notification, Space, Typography } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";


export default function Search() {
  const { Title } = Typography;
  const { form } = Form.useForm();
  const handleSubmit = (code) => {
    console.log("data", code);
    axios
      .get("http://localhost:8000/register/", {
        headers: {
          passcode: code.passcode,
        },
      })
      .then(function(res) {
        const kq = res?.data;
        console.log("qqqq",kq[0][10]);
        if(kq[0][12] === null ) {
          alert(kq[0][10] );
          const mess = kq[0][10] + "/" +kq[0][11]
          alert(mess );

        }
        else{
          const mes = kq[0][10] + "/" +kq[0][12]
          alert(mes );
        }
        console.log("rưe", res)
      })
      .catch((err) => {
        console.log(err)
        notification.open({
          message: 'Tra cứu thất bại',
        })
      })
  };



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
      <div className="form">
        <Title level={4}>Tra cứu thông tin gia hạn</Title>
        <Form
          style={{
            width: "300px",
          }}
          layout="vertical"
          id="form"
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label="Mã hộ chiếu"
            name="passcode"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã đăng kí",
              },
            ]}
          >
            <Input className="Nhập mã đăng kí" />
          </Form.Item>
        </Form>
        <Button form="form" htmlType="submit">
          Tra cứu
        </Button>
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
