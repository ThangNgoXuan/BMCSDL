import { Button, Form, Input, Modal, notification, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useInsertionEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userRegister, setUserRegister] = useState();

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
      title: "Xét Duyệt",
      dataIndex: "identity",
      key: "identity",
    },
    {
      title: "Ghi Chú",
      dataIndex: "cmt",
      key: "cmt",
    },
    {
      title: "Xác thực",
      dataIndex: "confirm",
      key: "confirm",
    }
  ]

  const token = localStorage.getItem("token");
  console.log("token", token);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/monitoring/", {
        headers: {
          token: token,
        },
      })
      .then(function (response) {
        const dataBeforeRegister = response.data;
        console.log("adaaa", dataBeforeRegister);
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
    <div>
      Giám sát
      <div>
        {/* <Title level={4}>Hồ sơ đăng kí</Title> */}
        <Table columns={columnsDangKy} dataSource={userRegister} />
      </div>

    </div>

  )
}
 