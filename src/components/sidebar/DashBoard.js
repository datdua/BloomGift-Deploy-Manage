import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Space } from 'antd';
import { ShopOutlined, UserOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { fetchCountStoresByStatus, fetchCountAccount } from '../../redux/actions/storeActions';
import { fetchOrderCountRevenue } from '../../redux/actions/orderActions';
import PaymentList from '../../components/sidebar/PaymentManager/PaymentList'; // Adjust the import path as needed

const { Title } = Typography;

const Dashboard = () => {
    const [storeCount, setStoreCount] = useState(null);
    const [accountCount, setAccountCount] = useState(null);
    const [orderCountRevenue, setOrderCountRevenue] = useState(null);

    useEffect(() => {
        const getCounts = async () => {
            try {
                const storeCount = await fetchCountStoresByStatus();
                setStoreCount(storeCount);

                const accountCount = await fetchCountAccount();
                setAccountCount(accountCount);

                const orderCountRevenue = await fetchOrderCountRevenue();
                setOrderCountRevenue(orderCountRevenue);
            } catch (error) {
                console.error(error);
            }
        };

        getCounts();
    }, []);

    const cardStyle = {
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
        },
    };

    const iconStyle = {
        fontSize: '24px',
        color: '#ff69b4',
    };

    return (
        <Space direction="vertical" size="large" style={{ width: '100%', overflowX: "hidden", padding: "0 10px" }}>
            <Title level={2} style={{ color: '#333' }}>Dashboard</Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <Card style={cardStyle} hoverable>
                        <Statistic
                            title="Total Stores"
                            value={storeCount}
                            prefix={<ShopOutlined style={iconStyle} />}
                            valueStyle={{ color: '#ff69b4' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card style={cardStyle} hoverable>
                        <Statistic
                            title="Total Accounts"
                            value={accountCount}
                            prefix={<UserOutlined style={iconStyle} />}
                            valueStyle={{ color: '#ff69b4' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card style={cardStyle} hoverable>
                        <Statistic
                            title="Order Revenue"
                            value={orderCountRevenue}
                            prefix={<DollarCircleOutlined style={iconStyle} />}
                            valueStyle={{ color: '#ff69b4' }}
                        />
                    </Card>
                </Col>
            </Row>
            <PaymentList /> {/* Add the PaymentList component here */}
        </Space>
    );
};

export default Dashboard;