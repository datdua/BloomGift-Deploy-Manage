import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Space } from 'antd';
import { ShopOutlined, UserOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchCountStoresByStatus, fetchCountAccount } from '../../redux/actions/storeActions';
import { fetchOrderCountRevenue } from '../../redux/actions/orderActions';
import PaymentList from '../../components/sidebar/PaymentManager/PaymentList';

const { Title } = Typography;

const Dashboard = () => {
    const [storeCount, setStoreCount] = useState(null);
    const [accountCount, setAccountCount] = useState(null);
    const [orderCountRevenue, setOrderCountRevenue] = useState(null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getCounts = async () => {
            try {
                const storeCount = await fetchCountStoresByStatus();
                setStoreCount(storeCount);

                const accountCount = await fetchCountAccount();
                setAccountCount(accountCount);

                const orderCountRevenue = await fetchOrderCountRevenue();
                setOrderCountRevenue(orderCountRevenue);

                setChartData([
                    {
                        month: 'Tháng 6',
                        stores: storeCount * 0.8,
                        accounts: accountCount * 0.8,
                        revenue: orderCountRevenue * 0.8
                    },
                    {
                        month: 'Tháng 7',
                        stores: storeCount * 0.85,
                        accounts: accountCount * 0.85,
                        revenue: orderCountRevenue * 0.85
                    },
                    {
                        month: 'Tháng 8',
                        stores: storeCount * 0.9,
                        accounts: accountCount * 0.9,
                        revenue: orderCountRevenue * 0.9
                    },
                    {
                        month: 'Tháng 9',
                        stores: storeCount * 0.95,
                        accounts: accountCount * 0.95,
                        revenue: orderCountRevenue * 0.95
                    },
                    {
                        month: 'Tháng 10',
                        stores: storeCount,
                        accounts: accountCount,
                        revenue: orderCountRevenue
                    }
                ]);
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

    const chartCardStyle = {
        ...cardStyle,
        marginTop: '5px',
        padding: '20px',
    };

    return (
        <Space direction="vertical" size="large" style={{ width: '100%', overflowX: "hidden", padding: "0 10px" }}>
            <Title level={2} style={{ color: '#333' }}>Dashboard</Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <Card style={cardStyle} hoverable>
                        <Statistic
                            title="Tổng số cửa hàng"
                            value={storeCount}
                            prefix={<ShopOutlined style={iconStyle} />}
                            valueStyle={{ color: '#ff69b4'}}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card style={cardStyle} hoverable>
                        <Statistic
                            title="Tổng số tài khoản"
                            value={accountCount}
                            prefix={<UserOutlined style={iconStyle} />}
                            valueStyle={{ color: '#ff69b4' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card style={cardStyle} hoverable>
                        <Statistic
                            title="Doanh thu đơn hàng"
                            value={orderCountRevenue}
                            prefix={<DollarCircleOutlined style={iconStyle} />}
                            valueStyle={{ color: '#ff69b4' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Card style={chartCardStyle}>
                <Title level={4}>Biểu đồ thống kê</Title>
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Bar yAxisId="left" dataKey="stores" name="Số cửa hàng" fill="#8884d8" />
                            <Bar yAxisId="left" dataKey="accounts" name="Số tài khoản" fill="#82ca9d" />
                            <Bar yAxisId="right" dataKey="revenue" name="Doanh thu" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <PaymentList />
        </Space>
    );
};

export default Dashboard;