import React from "react";
import { Image, Layout, Menu } from "antd";
import listrouters from "../routes";
import { Link } from "react-router-dom";
import '../styles/Sider.css';

export default function Sider() {
  const { Sider } = Layout;
  const { Item } = Menu;
  return <div className="sider">
    <Sider width={200}>
        <Image src="https://picsum.photos/20/20" preview={false}/>
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
        </Menu>
    </Sider>
  </div>;
}
