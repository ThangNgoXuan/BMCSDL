import { Button, Col, DatePicker, Form, Input, notification, Radio, Row, Typography } from "antd";
import React from "react";
import ApplicationApi from "../api/applicationApi";
import "../styles/Application.css";

export default function Application() {
  const { Title } = Typography;
  const {form} = Form.useForm();

  const handleSubmit = (data) => {
    console.log("data",data);
    ApplicationApi.createApplication(data)
    .then((res) => {
        notification.open({
            message: "Đăng kí thành công"
        })
        form.resetFields();
    })
    .catch((err) => {
        notification.open({
            message: "Đăng kí thất bại"
        })
    })
  }
  return (

    <div className="p-application">
      <Title level={4}>Đăng kí gia hạn hộ chiếu</Title>
      <Form layout="vertical"
        id="form"
        onFinish={handleSubmit}
        form={form}
        initialValues={{
            sex: "male",
        }}
      >
        <Form.Item
          label="Họ và Tên"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Họ và tên",
            },
          ]}
        >
          <Input className="Nhập Họ và Tên" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Email",
            },
          ]}
        >
          <Input className="Nhập Email" />
        </Form.Item>
        <Form.Item
          label="Địa chỉ thường trú"
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ",
            },
          ]}
        >
          <Input className="Nhập địa chỉ" />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Ngày sinh"
              name="dayofbirth"
              rules={[
                {
                  required: true,
                  message: "Vui lòng ngày sinh",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giới tính"
              name="sex"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn giới tính",
                },
              ]}
            >
              <Radio.Group>
                <Radio value='male'>Nam</Radio>
                <Radio value='female'>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <Form.Item
              label="Số hộ chiếu"
              name="idPassport"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số hộ chiếu",
                },
              ]}
            >
              <Input placeholder="Nhập số hộ chiếu"/>
            </Form.Item>
          </Col>
          <Col span={2}/>
          <Col span={11}>
            <Form.Item
              label="Số CMND/CCCD"
              name="idPerson"
              rules={[
                {
                  required: true,
                  message: "Vui lòng số CMND/CCCD",
                },
              ]}
            >
              <Input placeholder="Nhập số CMND/CCCD"/>
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Số hộ khẩu"
              name="idHousehold"
              rules={[
                {
                  required: true,
                  message: "Vui lòng số hộ khẩu",
                },
              ]}
            >
              <Input placeholder="Nhập số hộ khẩu"/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Button size="large" htmlType="submit" form="form">Đăng kí</Button>
    </div>
  );
}
