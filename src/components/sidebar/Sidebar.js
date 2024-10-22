import React from 'react';
import { Button } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import { House, Gem, Heart, Box, BarChart, BoxArrowRight, BoxSeam, PlusCircle } from 'react-bootstrap-icons';
import Header from './HeaderSidebar';

const SalerSidebar = ({ children }) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    const menuItemStyles = {
        button: ({ level, active }) => {
            return {
                color: active ? '#fff' : '#333',
                backgroundColor: active ? '#ff69b4' : 'transparent',
                '&:hover': {
                    backgroundColor: '#ffb6c1',
                    color: '#fff',
                },
            };
        },
    };

    return (
        <div className="flex h-screen" style={{ display: "flex" }}>
            <Sidebar
                collapsed={collapsed}
                width={collapsed ? '80px' : '250px'}
                collapsedWidth="80px"
                className="h-full"
                backgroundColor="#fef0f5"
                style={{ position: "fixed", height: "100vh", overflowY: "auto", zIndex: 1000 }}
            >
                <div className="p-4 flex-grow">
                    <Button
                        style={{ backgroundColor: '#ff69b4', color: '#fff', borderColor: '#ff69b4' }}
                        onClick={handleToggle}
                        className="mb-4 w-full"
                    >
                        {collapsed ? '≡' : 'BloomGift'}
                    </Button>
                    <Menu iconShape="circle" menuItemStyles={menuItemStyles} >
                        <MenuItem style={{ paddingLeft: "0px" }} icon={<House />} component={<NavLink to="/quanly/dashboard" />}>
                            Thống Kê
                        </MenuItem>
                        <MenuItem style={{ paddingLeft: "0px" }} icon={<Gem />} component={<NavLink to="/quanly/shop-management" />}>
                            Quản lý Cửa Hàng
                        </MenuItem>
                        <MenuItem style={{ paddingLeft: "0px" }} icon={<Heart />} component={<NavLink to="/quanly/all-promotion" />}>
                            Quản Lý Khuyến Mãi
                        </MenuItem>
                        <MenuItem style={{ paddingLeft: "0px" }} icon={<Box />} component={<NavLink to="/quanly/order-management" />}>
                            Order Management
                        </MenuItem>
                        <MenuItem style={{ paddingLeft: "0px" }} icon={<BarChart />} component={<NavLink to="/quanly/giao-dich" />}>
                            Quản lý Giao Dịch
                        </MenuItem>
                        <SubMenu label="Quản Lý Sản Phẩm " style={{ paddingLeft: "0px" }} icon={<BoxSeam />}>
                            <MenuItem style={{ paddingLeft: "15px" }} icon={<Box />} component={<NavLink to="/quanly/all-products" />}>
                                Tất Cả Sản Phẩm
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </div>
            </Sidebar>
            <div className="flex flex-col flex-grow" style={{ marginLeft: collapsed ? '80px' : '250px', transition: 'margin-left 0.3s', width: 'calc(100% - ' + (collapsed ? '80px' : '250px') + ')' }}>
                <Header username="John Doe" avatarUrl="/path-to-avatar.jpg" />
                <main className="flex-grow p-8 bg-gray-100 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default SalerSidebar;