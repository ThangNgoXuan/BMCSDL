import React from "react";
import { Image, Layout, Menu } from "antd";
import listrouters from "../routes";
import '../styles/Sider.css';
import {
    LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { logoutSuccess } from "../slices/authSlice";
import { useDispatch } from "react-redux";

export default function Sider() {
    const { Sider } = Layout;
    const { Item } = Menu;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutSuccess());
        navigate('/')
        }
    

    return <div className="sider">
        <Sider width={200}>
            <Image src="https://picsum.photos/20/20" preview={false} />
            <Menu mode="inline">
                {
                    listrouters.map((item, index) => (
                        <Item
                            key={`sub-menu-${index.toString()}`}
                            icon={item.icon}
                        >
                            <Link to={item.path}>{item.name}</Link>
                        </Item>
                    ))
                }
                <Item
                    icon=
                    {<LogoutOutlined />}
                    onClick = {handleLogout}>
                    đăng xuất
                </Item>
            </Menu>
        </Sider>
    </div>;
}
