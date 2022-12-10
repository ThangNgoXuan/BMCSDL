import { Button, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import userApi from "../api/userApi";
import useFetch from "../hooks/useFetch";

const columns = [
  {
    title: "STT",
    dataIndex: "_id",
  },
  {
    title: "Mã đăng kí",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Ngày đăng kí",
    dataIndex: "day",
    key: "day",
  },
  {
    title: "Họ tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Ngày sinh",
    dataIndex: "dateofbird",
    key: "dateofbird",
  },
  {
    title: "Giới tính",
    dataIndex: "sex",
    key: "sex",
  },
  {
    title: "",
    render: (record) => (
      <div className="p-recruit_table_button">
        <Button type="primary">Xem</Button>
      </div>
    ),
  },
];



const data = [
  {
    _id: 1,
    id: "12121",
    day: "20/12",
    name: "Ngô Xuân Thắng",
    dateofbird: "02/02/2000",
    sex: "Nam",
  },
];

export default function Accuracy() {

  // const [loading, dataqq, _, fetch, refetch] = useFetch({}, 
  //   userApi.getUser);

  // useEffect(() => {
  //   fetch({}, true);
  //   /*eslint-disable-next-line */
  // }, []);

  axios.get('http://localhost:5000/user')
  .then(function (response) {
    console.log('qq',response.data);
  })
  .catch(function (error) {
    console.log(error);
  });


  const { Title } = Typography;
  return (
    <div className="container">
      <Title level={4}>Hồ sơ đăng kí</Title>
      <Table columns={columns} dataSource={data} />
      <Title level={4}>Hồ sơ công dân</Title>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
