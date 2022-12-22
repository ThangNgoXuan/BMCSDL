import { Button, Form, Input, notification, Typography } from "antd";
import React from "react";
import "../styles/SignIn.css";
import ApplicationApi from "../api/applicationApi";
import userApi from "../api/userApi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../slices/authSlice";

export default function SignIn() {
  const { Title } = Typography;
  const { form } = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = (data) => {
    console.log("data", data);
    // userApi.postLogin(data)
    //   .then((res) => {
    //     notification.open({
    //       message: "Đăng nhập thành công",
    //     });
    //     form.resetFields();
    //   })
    //   .catch((res) => {
    //     notification.open({
    //       message: "Đăng nhập thất bại",
    //     });
    //     form.resetFields();
    //   })
    // let params = {
    //   user: data.User,
    //   password: data.password,
    // };
    // userApi
    //   .postLogin(params)
    //   .then((res) => {
    //     let {accessToken} = res;
    //     dispatch({accessToken})
    //   })
    // userApi.postLogin(data).then(function (response) {
    //   console.log("qqqq",response.data.accessToken);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });;
    axios.post('http://localhost:8000/login/', data)
      .then(function (response) {
        console.log("qqqq", response.data.accessToken);
        console.log(response.data)
        let { accessToken, User: user } = response.data;
        // let {accessToken} = res;
        dispatch(loginSuccess({ accessToken, user }))

        localStorage.setItem("token", `${response.data.accessToken}`)

        if (RegExp("XTQUAN").test(response.data.User))
          navigate('/accuracy')
        else if (RegExp("BPGIAMSAT").test(response.data.User))
          navigate('/dashboard')
        else if (RegExp("BPXETDUYET").test(response.data.User))
          navigate('/browser')
        else if (RegExp("BPLUUTRU").test(response.data.User))
          navigate('/storage')
        else 
          navigate('/login')
      })
      .catch(function (error) {
        console.log(error);
      });
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
            name="user"
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
