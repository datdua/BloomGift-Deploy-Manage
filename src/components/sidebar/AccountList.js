import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts } from '../../redux/actions/accountActions';
import { Button, Input, Table, Empty, Select, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const AccountList = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const accounts = useSelector(state => state.customerData.accounts) || [];
    const error = useSelector(state => state.customerData.error);
    const [selectedAccountStatus, setSelectedAccountStatus] = useState('');
    const [selectedRole, setSelectedRole] = useState(''); // State to store selected role

    useEffect(() => {
        dispatch(getAllAccounts());
    }, [dispatch]);

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            key: 'fullname',
            sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            align: 'center',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => `${phone}`,
            align: 'center',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            align: 'left', // Align left for the address column
        },
        {
            title: 'Trạng thái',
            dataIndex: 'accountStatus',
            key: 'accountStatus',
            render: (status) => (status ? 'Hoạt động' : 'Không hoạt động'),
            align: 'center',
        },
        {
            title: 'Vai trò',
            dataIndex: 'roleName',
            key: 'roleName',
            align: 'center',
        },
    ];

    const filteredAccounts = accounts.filter(account =>
        account.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedAccountStatus ? account.accountStatus === (selectedAccountStatus === 'Hoạt động') : true) &&
        (selectedRole ? account.roleName === selectedRole : true)
    );

    const customLocale = {
        triggerDesc: 'Nhấn để sắp xếp giảm dần',
        triggerAsc: 'Nhấn để sắp xếp tăng dần',
        cancelSort: 'Nhấn để hủy sắp xếp',
        emptyText: (
            <Empty
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                description={error || "Không tìm thấy tài khoản"}
            />
        ),
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Danh sách tài khoản</h1>
            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col xs={24} sm={12} md={8}>
                    <Input
                        placeholder="Tìm kiếm tài khoản..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', borderColor: '#F56285' }}
                        suffix={<SearchOutlined style={{ fontSize: '18px', color: '#bfbfbf' }} />}
                    />
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Select
                        placeholder="Chọn trạng thái"
                        onChange={(value) => setSelectedAccountStatus(value)}
                        style={{ width: '100%' }}
                    >
                        <Option value="">Tất cả</Option>
                        <Option value="Hoạt động">Hoạt động</Option>
                        <Option value="Không hoạt động">Không hoạt động</Option>
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Select
                        placeholder="Chọn vai trò"
                        onChange={(value) => setSelectedRole(value)}
                        style={{ width: '100%' }}
                    >
                        <Option value="">Tất cả</Option>
                        <Option value="ROLE_CUSTOMER">ROLE_CUSTOMER</Option>
                        <Option value="ROLE_ADMIN">ROLE_ADMIN</Option>
                        <Option value="ROLE_SELLER">ROLE_SELLER</Option>
                    </Select>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredAccounts}
                rowKey="accountID"
                locale={customLocale}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default AccountList;