import { Button, Form, Input, notification, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ApplicationApi from "../api/applicationApi";

export default function Search() {
  const { Title } = Typography;
  const { form } = Form.useForm();
  const handleSubmit = (data) => {
    console.log("data", data);
    ApplicationApi.createApplication(data)
      .then((res) => {
        notification.open({
          message: "Tra cứu thành công",
        });
        form.resetFields();
      })
      .catch((err) => {
        notification.open({
          message: "Tra cứu thất bại",
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
            label="Mã đăng kí"
            name="id"
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
