import { Button, Form, Input, Modal, notification, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useInsertionEffect, useState } from "react";
import userApi from "../api/userApi";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";




export default function Browser() {
  const [userRegister, setUserRegister] = useState();
  const token = localStorage.getItem("token");
  console.log("token", token);
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
      title: "Ghi chú ",
      dataIndex: "cmt",
      key: "cmt",
    },
    {
      title: "",
      render: (record) => (
        <div className="p-recruit_table_button">
          <Button
            type="primary"
            onClick={() => { handleDuyet(record) }}
          >
            Duyệt
          </Button>
          <Button
            type="primary"
            onClick={() => { handleKhongDuyet(record) }}
          >
            Không duyệt
          </Button>
        </div>

      ),
    },
  ];


  const handleDuyet = (data) => {
    console.log("dưqd",data.passcode)
    axios
      .put("http://localhost:8000/approval/update/", {
        passcode: data.passcode,
        confirm: "Không duyệt"
      },
        {
          headers: {
            token: token,
          },
        })
      .then((res) => {
        console.log('res', res)
        notification.open({
          message: 'Duyệt thành công',
        })
      })
      .catch((err) => {
        console.log(err)
        notification.open({
          message: 'Duyệt không thành công',
        })
      })
  }

  const handleKhongDuyet = (data) => {
    axios
      .put("http://localhost:8000/approval/update/", {
        passcode: data.passcode,
        confirm: "Không duyệt"
      },
        {
          headers: {
            token: token,
          },
        })
      .then((res) => {
        console.log('res', res)
        notification.open({
          message: 'Duyệt thành công',
        })
      })
      .catch((err) => {
        notification.open({
          message: 'Xác thực thất bại',
        })
      })
  }


  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/approval/", {
        headers: {
          token: token,
        },
      })
      .then(function (response) {
        const dataBeforeRegister = response.data;
        console.log("XXD", dataBeforeRegister);
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
  return (
    <div className='container'>
      <Table
        columns={columnsDangKy}
        dataSource={userRegister}
      />

    </div>
  )
}
