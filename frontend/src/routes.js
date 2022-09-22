import { FolderOutlined, HomeOutlined, IdcardOutlined, UserOutlined } from "@ant-design/icons";

const listrouters = [
  {
    path: "/",
    name: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    path: "/user",
    name: "Quản lí user",
    icon: <UserOutlined />,
  },
  {
    path: "/profile",
    name: "Quản lí Profile",
    icon: <FolderOutlined />,
  },
  {
    path: "/quota",
    name: "Quota",
    icon: <IdcardOutlined />,
  },
];

export default listrouters;
