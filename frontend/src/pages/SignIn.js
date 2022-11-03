import { Form, Input, notification, Typography } from "antd";
import React from "react";
import "../styles/SignIn.css";
import ApplicationApi from "../api/applicationApi";

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
  };
  return (
    <div className="p-signIn">
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
          name="userName"
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
    </div>
  );
}
