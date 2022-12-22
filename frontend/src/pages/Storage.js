import { Button, Table, Typography } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

const columns = [
  {
    title: "Ngay dang ky",
    dataIndex: "registerDate",
    key: "registerDate",
  },
  {
    title: "Passport",
    dataIndex: "passcode",
    key: "passcode",
  },

  {
    title: "Ma ho chieu",
    dataIndex: "passcode",
    key: "passcode",
  },
  {
    title: "Xác thực",
    dataIndex: "identity",
    key: "identity",
  },
  {
    title: "Xét duyệt",
    dataIndex: "confirm",
    key: "confirm",
  },
  {
    title: "Ghi chú ",
    dataIndex: "cmt",
    key: "cmt",
  },
]


export default function Storage() {
  const [dataStore, setDateStore] = useState();
  const [dataReg, setDateReg] = useState();

  const columnsPP = [
    {
      title: "Mã hộ chiếu",
      dataIndex: "passcode",
      key: "passcode",
    },
    {
      title: "Ngày đăng kí",
      dataIndex: "begindate",
      key: "begindate",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expireddate",
      key: "expireddate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "CMND",
      dataIndex: "cmnd",
      key: "cmnd",
    },

    {
      title: "Thao tác",
      render: (record) => (
        <div className="p-recruit_table_button">
          <Button type="primary" onClick={() => { handleGH(record) }} >Gia hạn</Button>
        </div>
      ),
    },
  ];


  const handleGH = (data) => {
    const c =moment(data.expireddate, "DD/MM/YYYY").add(1,'years').format('L');
    const token = localStorage.getItem("token");
    axios
      .put("http://localhost:8000/storage/update/", {
        expireddate: c,
        passcode: data.passcode,
      }, {
        headers: {
          token: token,
        },
      })
      .then(function (response) {
        console.log("qq", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/storage/", {
        headers: {
          token: token,
        },
      })
      .then(function (response) {
        const dataBeforeRegister = response.data;
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
        setDateReg(fulldataRegister);
      })
      .catch(function (error) {
        console.log(error);
      });


    axios
      .get("http://localhost:8000/storage/passport/", {
        headers: {
          token: token,
        },
      })
      .then(function (response) {
        const dataBeforeRegister = response.data;
        const fulldataRegister = dataBeforeRegister.map((item) => ({
          passcode: item[0],
          begindate: item[1],
          expireddate: item[2],
          status: item[3],
          cmnd: item[4],
        }));
        setDateStore(fulldataRegister);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const { Title } = Typography;
  return (
    <div className="container">
      <div>
        <Title level={4}>Hồ sơ đăng kí</Title>
        <Table columns={columns} dataSource={dataReg} />
      </div>
      <div>
        <Title level={4}>Hồ sơ hộ chiếu</Title>
        <Table columns={columnsPP} dataSource={dataStore} />
      </div>
    </div>
  );
}
