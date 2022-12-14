import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Space, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useInsertionEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";





export default function Accuracy() {
  const username = useSelector((state) => state.auth.user).user;
  const navigate = useNavigate();
  const [userPP, setUserPP] = useState();
  const [userRegister, setUserRegister] = useState();
  const [dataUserInfo, setdataUserIn] = useState();
  const [open, setOpen] = useState(false);
  const { form } = Form.useForm();
  const [passcode, setPasscode] = useState(''); 


  
  


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
          message: 'X??c th???c th??nh c??ng',
        })
      })
      .catch((err) => {
        console.log(err)
        notification.open({
          message: 'X??c th???c th???t b???i',
        })
      })

      handleClose();
  }

  const { Title } = Typography;

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

  const columnsCongDan = [
    {
      title: "Passport",
      dataIndex: "passcode",
      key: "passcode",
      ...getColumnSearchProps('passcode'),
    },
    {
      title: "CMND",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "T??n",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ng??y c???p CMND",
      dataIndex: "beginDateCMND",
      key: "beginDateCMND",
    },
    {
      title: "Ng??y sinh",
      dataIndex: "birth",
      key: "birth",
    },
    {
      title: "Gi???i t??nh",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Qu???c gia",
      dataIndex: "national",
      key: "national",
    },
    {
      title: "?????a ch???",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Qu???n",
      dataIndex: "district",
      key: "district",
    },

    {
      title: "Ng??y c???p",
      dataIndex: "beginDate",
      key: "beginDate",
    },
    {
      title: "Ng??y h???t h???n",
      dataIndex: "expiredDate",
      key: "expiredDate",
    },
    {
      title: "T??nh tr???ng",
      dataIndex: "status",
      key: "status",
    },
  
  ];

  const columnsDangKy = [
    {
      title: "Passport",
      dataIndex: "passcode",
      key: "passcode",
      ...getColumnSearchProps('passcode'),
    },
    {
      title: "Ngay dang ky",
      dataIndex: "registerDate",
      key: "registerDate",
    },
    {
      title: "T??n",
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
      title: "?????a ch???",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Qu???n",
      dataIndex: "district",
      key: "district",
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
      title: "T??nh tr???ng",
      dataIndex: "identity",
      key: "identity",
    },
    {
      title: "Thao t??c",
      render: (record) => (

        <div className="p-recruit_table_button">
          <Button type="primary" onClick={() => {handleOpen(record)}}>X??c th???c</Button>
        </div>
      ),
    },
  ]

  return (
    <div className="container">
      <div>
        <Title level={4}>H??? s?? ????ng k??</Title>
        <Table scroll={{ x: 400 }} columns={columnsDangKy} dataSource={userRegister} />
      </div>
      <div>
        <Title level={4}>H??? s?? c??ng d??n</Title>
        <Table  scroll={{ x: 400 }} columns={columnsCongDan} dataSource={userPP} />
      </div>
      <Modal
        title="X??t th???c"
        open={open}
        onCancel={handleClose}
        footer={[
          <>
            <Button size="large" htmlType="submit" form="form">X??c th???c</Button>
          
          </>
        ]}
      >
        <Form onFinish={handleUpdate} form={form} id="form">
          <Form.Item
            label="Ghi ch??"
            name="cmt">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
