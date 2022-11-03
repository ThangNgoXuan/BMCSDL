import React from "react";
import { Route, Routes } from "react-router-dom";
import Sider from "./components/Sider";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Browser from "./pages/Browser";
import Error404 from "./pages/Error404";
import { Layout } from "antd";
import Accuracy from "./pages/Accuracy";
import Storage from "./pages/Storage";

export default function MainLayout() {
  const { Content } = Layout;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <Content>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/accuracy" element={<Accuracy />} />
            <Route exact path="/browser" element={<Browser />} />
            <Route exact path="/storage" element={<Storage />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
