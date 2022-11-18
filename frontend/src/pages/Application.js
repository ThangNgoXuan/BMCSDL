import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ApplicationApi from "../api/applicationApi";
import "../styles/Application.css";

export default function Application() {
  const { Title } = Typography;
  const { form } = Form.useForm();
  const { Option } = Select;

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
        <Title level={4}>Đăng kí gia hạn hộ chiếu</Title>
        <Form
          layout="vertical"
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
          <Row>
            <Col span={11}>
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
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                  },
                ]}
              >
                <Input className="Nhập Số điện thoại" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Quận"
            name="pants"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn quận",
              },
            ]}
          >
            <Select>
              <Option>qq</Option>
            </Select>
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
                  <Radio value="male">Nam</Radio>
                  <Radio value="female">Nữ</Radio>
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
                <Input placeholder="Nhập số hộ chiếu" />
              </Form.Item>
            </Col>
            <Col span={2} />
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
                <Input placeholder="Nhập số CMND/CCCD" />
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
                <Input placeholder="Nhập số hộ khẩu" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button size="large" htmlType="submit" form="form" color="#276e44">
          Đăng kí
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
