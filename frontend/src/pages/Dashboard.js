import { Button, Form, Input, Modal, notification, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useInsertionEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userRegister, setUserRegister] = useState();

  const columnsDangKy = [
    {
      title: "Thời gian chỉnh sửa",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Bộ phận thực hiện",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Bảng được chỉnh sửa",
      dataIndex: "table",
      key: "table",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Nội dung hành động",
      dataIndex: "des",
      key: "des",
    },
   
  ]
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
          date: item[1],
          name: item[2],
          table: item[9],
          action: item[15],
          des: item[13],
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
        <Table scroll={{x: 400}} columns={columnsDangKy} dataSource={userRegister} />
      </div>

    </div>

  )
}
 