import { FolderOutlined, HomeOutlined, IdcardOutlined, UserOutlined } from "@ant-design/icons";

const listrouters = [
  {
    path: "/",
    name: "Giám sát",
    icon: <HomeOutlined />,
  },
  {
    path: "/accuracy",
    name: "Xác thực hộ chiếu",
    icon: <FolderOutlined />,
  },
  {
    path: "/browser",
    name: "Xét duyệt hộ chiếu",
    icon: <IdcardOutlined />,
  },
  {
    path: "/storage",
    name: "Lưu trữ",
    icon: <UserOutlined />,
  },
];

export default listrouters;
