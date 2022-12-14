import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Space, Table, Typography } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";




export default function Storage() {
  const [dataStore, setDateStore] = useState();
  const [dataReg, setDateReg] = useState();
  const [open, setOpen] = useState(false);
  const [passCode, setPassCode] = useState("");

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

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
      ...getColumnSearchProps('passcode'),
    },
  
    {
      title: "Ma ho chieu",
      dataIndex: "passcode",
      key: "passcode",
    },
    {
      title: "X??c th???c",
      dataIndex: "identity",
      key: "identity",
    },
    {
      title: "X??t duy???t",
      dataIndex: "confirm",
      key: "confirm",
    },
    {
      title: "Ghi ch?? ",
      dataIndex: "cmt",
      key: "cmt",
    },
  ]
  const columnsPP = [
    {
      title: "M?? h??? chi???u",
      dataIndex: "passcode",
      key: "passcode",
      ...getColumnSearchProps('passcode'),
    },
    {
      title: "Ng??y ????ng k??",
      dataIndex: "begindate",
      key: "begindate",
    },
    {
      title: "Ng??y h???t h???n",
      dataIndex: "expireddate",
      key: "expireddate",
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "CMND",
      dataIndex: "cmnd",
      key: "cmnd",
    },

    {
      title: "Thao t??c",
      render: (record) => (
        <div className="p-recruit_table_button">
          <Button type="primary" onClick={() => { handleOpen(record) }} >Gia h???n</Button>
        </div>
      ),
    },
  ];

  const handleOpen = (data) => {
    setOpen(true)
    console.log("recode", data)
    setPassCode(data.passcode)
  }


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

      axios
      .put("http://localhost:8000/storage/update1", {
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

  const handleClose = () => {
    setOpen(false)
    setPassCode('')
  }

  const handleUpdate = (data) => {
    console.log("day", data)
    const token = localStorage.getItem("token");
    axios
      .put("http://localhost:8000/storage/update/", {
        expireddate: data.date,
        passcode: passCode,
      }, {
        headers: {
          token: token,
        },
      })
      .then(function (response) {
        console.log("qq", response);
        notification.open({
          message: 'Gia h???n th??nh c??ng',
        })
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
        notification.open({
          message: 'Gia h???n th???t b???i',
        })
      });

      axios
      .put("http://localhost:8000/storage/update1", {
        passcode: passCode,
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

  const { form } = Form.useForm();
  const { Title } = Typography;
  return (
    <div className="container">
      <div>
        <Title level={4}>H??? s?? ????ng k??</Title>
        <Table scroll={{ x: 400 }} columns={columns} dataSource={dataReg} />
      </div>
      <div>
        <Title level={4}>H??? s?? h??? chi???u</Title>
        <Table scroll={{ x: 400 }} columns={columnsPP} dataSource={dataStore} />
      </div>
      <Modal
        title="L??u tr???"
        open={open}
        onCancel={handleClose}
        footer={[
          <>
            <Button size="large" htmlType="submit" form="form">Gia h???n</Button>
          
          </>
        ]}
      >
        <Form onFinish={handleUpdate} form={form} id="form">
          <Form.Item
            label="Ng??y h???t h???n"
            name="date">
            <Input placeholder="DD/MM/YYYY"/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
