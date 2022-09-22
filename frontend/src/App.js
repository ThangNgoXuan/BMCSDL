import './App.css';
import {Layout} from 'antd';

import Header from './components/Header';
import Sider from './components/Sider';
import Profile from './pages/Profile';
import { Route, Routes } from 'react-router-dom';
import Quota from './pages/Quota';
import User from './pages/User';

function App() {
  const {Content} = Layout;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider/>
      <Layout>
        <Header/>
        <Content>
          <Routes>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/quota' element={<Quota/>}/>
            <Route path='/user' element={<User/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
