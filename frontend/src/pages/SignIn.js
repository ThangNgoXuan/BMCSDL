import { Button, Form, Input, notification, Typography } from "antd";
import React from "react";
import "../styles/SignIn.css";
import ApplicationApi from "../api/applicationApi";
import { Link } from "react-router-dom";

export default function SignIn() {
  const { Title } = Typography;
  const { form } = Form.useForm();
  const handleSubmit = (data) => {
    console.log("data", data);
    ApplicationApi.createApplication(data)
      .then((res) => {
        notification.open({
          message: "Đăng kí thành công",
        });
        form.resetFields();
      })
      .catch((err) => {
        notification.open({
          message: "Đăng kí thất bại",
        });
      });
    form.resetFields();
  };
  return (
    <div className="p-application">
      <div className="header">
        <Link to="/">
          <Button>Trang chủ</Button>
        </Link>
      </div>
      <div className="form">
        <Title level={4}>Đăng nhập</Title>
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
            label="Tên đăng nhập"
            name="userName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập",
              },
            ]}
          >
            <Input className="Nhập tên đăng nhập" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
            ]}
          >
            <Input.Password className="Nhập mật khẩu" />
          </Form.Item>
        </Form>
        <Button form="form" htmlType="submit">
          Đăng Nhập
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
