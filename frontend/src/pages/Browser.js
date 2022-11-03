import { Button, Table } from 'antd'
import React from 'react'

const columns = [
    {
      title: "STT",
      dataIndex: "_id",
    },
    {
      title: "Loại xe",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sơ đồ ghế",
      dataIndex: "seat_diagram",
      key: "seat_diagram",
    },
    {
      title: "Loại ghế",
      dataIndex: "seat_diagram",
      key: "seat_diagram",
    },
    {
      title: "Số ghế ngồi",
      dataIndex: "number_of_seats",
      key: "number_of_seats",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "",
      render: (record) => (
        <div className="p-recruit_table_button">
          <Button
            type="primary"
          >
            Duyệt
          </Button>
        </div>
      ),
    },
  ];


export default function Browser() {
  return (
    <div className='container'>
        <Table
            columns={columns}
        />
    </div>
  )
}
