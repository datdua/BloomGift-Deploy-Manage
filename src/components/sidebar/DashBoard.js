import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Row, Col, Card, Statistic, Typography, Space } from 'antd';
import { ShopOutlined, UserOutlined, DollarOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchCountStoresByStatus, fetchCountAccount } from '../../redux/actions/storeActions';
import { fetchOrderCountRevenue, fetchStoresCount, fetchCustomersCount, fetchtRevenuesCount } from '../../redux/actions/orderActions';

const { Title } = Typography;

const getDateTime = (month, year) => {
    const startDate = moment(`${year}-${month}-01`).startOf('month').format('YYYY-MM-DDTHH:mm:ss');
    const endDate = moment(`${year}-${month}-01`).endOf('month').format('YYYY-MM-DDTHH:mm:ss');

    return { startDate, endDate };
};

const Dashboard = () => {
    const [storeCount, setStoreCount] = useState(null);
    const [accountCount, setAccountCount] = useState(null);
    const [orderCountRevenue, setOrderCountRevenue] = useState(null);
    const [chartData, setChartData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getCounts = async () => {
            try {
                const storeCount = await fetchCountStoresByStatus();
                setStoreCount(storeCount);

                const accountCount = await fetchCountAccount();
                setAccountCount(accountCount);

                const orderCountRevenue = await fetchOrderCountRevenue();
                setOrderCountRevenue(orderCountRevenue);

                //Const for storesCountData
                const { startDate: startDateStores8, endDate: endDateStores8 } = getDateTime(8, 2024);
                const storesCountData8 = await dispatch(fetchStoresCount(startDateStores8, endDateStores8));

                const { startDate: startDateStores9, endDate: endDateStores9 } = getDateTime(9, 2024);
                const storesCountData9 = await dispatch(fetchStoresCount(startDateStores9, endDateStores9));

                const { startDate: startDateStores10, endDate: endDateStores10 } = getDateTime(10, 2024);
                const storesCountData10 = await dispatch(fetchStoresCount(startDateStores10, endDateStores10));

                const { startDate: startDateStores11, endDate: endDateStores11 } = getDateTime(11, 2024);
                const storesCountData11 = await dispatch(fetchStoresCount(startDateStores11, endDateStores11));

                const { startDate: startDateStores12, endDate: endDateStores12 } = getDateTime(12, 2024);
                const storesCountData12 = await dispatch(fetchStoresCount(startDateStores12, endDateStores12));

                //Const for customersCountData
                const { startDate: startDateCustomers8, endDate: endDateCustomers8 } = getDateTime(8, 2024);
                const CustomersCountData8 = await dispatch(fetchCustomersCount(startDateCustomers8, endDateCustomers8));

                const { startDate: startDateCustomers9, endDate: endDateCustomers9 } = getDateTime(9, 2024);
                const CustomersCountData9 = await dispatch(fetchCustomersCount(startDateCustomers9, endDateCustomers9));

                const { startDate: startDateCustomers10, endDate: endDateCustomers10 } = getDateTime(10, 2024);
                const CustomersCountData10 = await dispatch(fetchCustomersCount(startDateCustomers10, endDateCustomers10));

                const { startDate: startDateCustomers11, endDate: endDateCustomers11 } = getDateTime(11, 2024);
                const CustomersCountData11 = await dispatch(fetchCustomersCount(startDateCustomers11, endDateCustomers11));

                const { startDate: startDateCustomers12, endDate: endDateCustomers12 } = getDateTime(12, 2024);
                const CustomersCountData12 = await dispatch(fetchCustomersCount(startDateCustomers12, endDateCustomers12));

                //Const for revenuesCountData
                const { startDate: startDateRevenues8, endDate: endDateRevenues8 } = getDateTime(8, 2024);
                const RevenuesCountData8 = await dispatch(fetchtRevenuesCount(startDateRevenues8, endDateRevenues8));

                const { startDate: startDateRevenues9, endDate: endDateRevenues9 } = getDateTime(9, 2024);
                const RevenuesCountData9 = await dispatch(fetchtRevenuesCount(startDateRevenues9, endDateRevenues9));

                const { startDate: startDateRevenues10, endDate: endDateRevenues10 } = getDateTime(10, 2024);
                const RevenuesCountData10 = await dispatch(fetchtRevenuesCount(startDateRevenues10, endDateRevenues10));

                const { startDate: startDateRevenues11, endDate: endDateRevenues11 } = getDateTime(11, 2024);
                const RevenuesCountData11 = await dispatch(fetchtRevenuesCount(startDateRevenues11, endDateRevenues11));

                const { startDate: startDateRevenues12, endDate: endDateRevenues12 } = getDateTime(12, 2024);
                const RevenuesCountData12 = await dispatch(fetchtRevenuesCount(startDateRevenues12, endDateRevenues12));

                setChartData([
                    {
                        month: 'Tháng 8',
                        stores: storesCountData8,
                        accounts: CustomersCountData8,
                        revenue: RevenuesCountData8
                    },
                    {
                        month: 'Tháng 9',
                        stores: storesCountData9,
                        accounts: CustomersCountData9,
                        revenue: RevenuesCountData9
                    },
                    {
                        month: 'Tháng 10',
                        stores: storesCountData10,
                        accounts: CustomersCountData10,
                        revenue: RevenuesCountData10
                    },
                    {
                        month: 'Tháng 11',
                        stores: storesCountData11,
                        accounts: CustomersCountData11,
                        revenue: RevenuesCountData11
                    },
                    {
                        month: 'Tháng 12',
                        stores: storesCountData12,
                        accounts: CustomersCountData12,
                        revenue: RevenuesCountData12
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
                <Col xs={24} sm={8}>
                    <Card style={cardStyle}>
                        <Statistic
                            title="Tổng số cửa hàng"
                            value={storeCount}
                            prefix={<ShopOutlined style={iconStyle} />}
                            suffix={
                                <span style={{ fontSize: '14px', color: '#52c41a' }}>
                                    <ArrowUpOutlined /> 20%
                                </span>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card style={cardStyle}>
                        <Statistic
                            title="Tổng số khách hàng"
                            value={accountCount}
                            prefix={<UserOutlined style={iconStyle} />}
                            suffix={
                                <span style={{ fontSize: '14px', color: '#52c41a' }}>
                                    <ArrowUpOutlined /> 15%
                                </span>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card style={cardStyle}>
                        <Statistic
                            title="Doanh thu đơn hàng"
                            value={orderCountRevenue}
                            prefix={<DollarOutlined style={iconStyle} />}
                            suffix={
                                <span style={{ fontSize: '14px', color: '#52c41a' }}>
                                    <ArrowUpOutlined /> 25%
                                </span>
                            }
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
                            <Bar yAxisId="left" dataKey="accounts" name="Số khách hàng" fill="#82ca9d" />
                            <Bar yAxisId="right" dataKey="revenue" name="Doanh thu" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </Space>
    );
};

export default Dashboard;