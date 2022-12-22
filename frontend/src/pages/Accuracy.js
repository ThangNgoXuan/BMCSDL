import { Button, Form, Input, Modal, notification, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useInsertionEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const columnsCongDan = [
  {
    title: "CMND",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Ngày cấp CMND",
    dataIndex: "beginDateCMND",
    key: "beginDateCMND",
  },
  {
    title: "Ngày sinh",
    dataIndex: "birth",
    key: "birth",
  },
  {
    title: "Giới tính",
    dataIndex: "sex",
    key: "sex",
  },
  {
    title: "Quốc gia",
    dataIndex: "national",
    key: "national",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Quận",
    dataIndex: "district",
    key: "district",
  },
  {
    title: "Passport",
    dataIndex: "passcode",
    key: "passcode",
  },
  {
    title: "Ngày cấp",
    dataIndex: "beginDate",
    key: "beginDate",
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "expiredDate",
    key: "expiredDate",
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
  },

];



export default function Accuracy() {
  const username = useSelector((state) => state.auth.user).user;
  const navigate = useNavigate();
  const [userPP, setUserPP] = useState();
  const [userRegister, setUserRegister] = useState();
  const [dataUserInfo, setdataUserIn] = useState();
  const [open, setOpen] = useState(false);
  const { form } = Form.useForm();
  const [passcode, setPasscode] = useState(''); 

  const columnsDangKy = [
    {
      title: "Ngay dang ky",
      dataIndex: "registerDate",
      key: "registerDate",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngay sinh",
      dataIndex: "birth",
      key: "birth",
    },
    {
      title: "Gioi tinh",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "CMND",
      dataIndex: "cmnd",
      key: "cmnd",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Quận",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Passport",
      dataIndex: "passcode",
      key: "passcode",
    },
    {
      title: "SDT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ma ho chieu",
      dataIndex: "passcode",
      key: "passcode",
    },
    {
      title: "Tình trạng",
      dataIndex: "identity",
      key: "identity",
    },
    {
      title: "Thao tác",
      render: (record) => (

        <div className="p-recruit_table_button">
          <Button type="primary" onClick={() => {handleOpen(record)}}>Xác thực</Button>
        </div>
      ),
    },
  ]



  const token = localStorage.getItem("token");
  console.log("token", token);

  const handleOpen = (data) => {
    setOpen(true)
    setPasscode(data.passcode)
  }

  console.log(passcode);

  const handleClose = () => {
    setOpen(false)
    setPasscode('')
  }




  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/accuracy/infoPP", {
        headers: {
          token: token,
        },
      })
      .then(function (response) {
        const dataBefore = response.data;
        console.log("ada", dataBefore);
        const fulldata = dataBefore.map((item) => ({
          id: item[0],
          name: item[1],
          birth: item[2],
          sex: item[3],
          national: item[4],
          address: item[5],
          district: item[6],
          beginDateCMND: item[7],
          passcode: item[8],
          beginDate: item[9],
          expiredDate: item[10],
          status: item[11],
        }));
        console.log("qq", fulldata);
        setUserPP(fulldata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/accuracy/getRegister", {
        headers: {
          token: token,
        },
      })
      .then(function (response) {
        const dataBeforeRegister = response.data;
        console.log("ada", dataBeforeRegister);
        const fulldataRegister = dataBeforeRegister.map((item) => ({
          registerDate: item[0],
          name: item[1],
          birth: item[2],
          sex: item[3],
          cmnd: item[4],
          address: item[5],
          district: item[6],
          phone: item[7],
          email: item[8],
          passcode: item[9],
          identity: item[10],
          cmt: item[11],
          confirm: item[12]
        }));
        console.log("qq", fulldataRegister);
        setUserRegister(fulldataRegister);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleUpdate = (data) => {
    // const token = localStorage.getItem("token");
    console.log(data)

    axios
      .put("http://localhost:8000/accuracy/update/", { 
        passcode: passcode,
        cmt: data.cmt
       },
        {
          headers: {
            token: token,
          },
        })
      .then((res) => {
        console.log('res', res)
        notification.open({
          message: 'Xác thực thành công',
        })
      })
      .catch((err) => {
        console.log(err)
        notification.open({
          message: 'Xác thực thất bại',
        })
      })

      handleClose();
  }

  const { Title } = Typography;
  return (
    <div className="container">
      <div>
        <Title level={4}>Hồ sơ đăng kí</Title>
        <Table columns={columnsDangKy} dataSource={userRegister} />
      </div>
      <div>
        <Title level={4}>Hồ sơ công dân</Title>
        <Table columns={columnsCongDan} dataSource={userPP} />
      </div>
      <Modal
        title="Xét thực"
        open={open}
        onCancel={handleClose}
        footer={[
          <>
            <Button size="large" htmlType="submit" form="form">Xác thực</Button>
          
          </>
        ]}
      >
        <Form onFinish={handleUpdate} form={form} id="form">
          <Form.Item
            label="Ghi chú"
            name="cmt">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
