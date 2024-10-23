import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStores, acceptStore, rejectStore } from '../../../redux/actions/storeActions';
import { Button, Input, Table, Modal, Empty, Select, Row, Col } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const { Option } = Select;

const StoreList = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const stores = useSelector(state => state.storeData.stores) || [];
    const error = useSelector(state => state.storeData.error);
    const [selectedStoreStatus, setSelectedStoreStatus] = useState('');

    useEffect(() => {
        dispatch(fetchAllStores());
    }, [dispatch]);

    const handleAcceptClick = (storeID) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn kích hoạt cửa hàng này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, kích hoạt!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(acceptStore(storeID))
                    .then(() => {
                        Swal.fire('Thành công!', 'Cửa hàng đã được kích hoạt.', 'success');
                        dispatch(fetchAllStores());
                    })
                    .catch(() => {
                        Swal.fire('Lỗi!', 'Có lỗi xảy ra khi kích hoạt cửa hàng.', 'error');
                    });
            }
        });
    };

    const handleRejectClick = (storeID) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn từ chối cửa hàng này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, từ chối!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(rejectStore(storeID))
                    .then(() => {
                        Swal.fire('Thành công!', 'Cửa hàng đã bị từ chối.', 'success');
                        dispatch(fetchAllStores());
                    })
                    .catch(() => {
                        Swal.fire('Lỗi!', 'Có lỗi xảy ra khi từ chối cửa hàng.', 'error');
                    });
            }
        });
    };

    const columns = [
        {
            title: 'Mã cửa hàng',
            dataIndex: 'storeID',
            key: 'storeID',
            sorter: (a, b) => a.storeID - b.storeID,
            align: 'center',
        },
        {
            title: 'Tên cửa hàng',
            dataIndex: 'storeName',
            key: 'storeName',
            sorter: (a, b) => a.storeName.localeCompare(b.storeName),
            align: 'center',
        },
        {
            title: 'Ngày Đăng Ký',
            dataIndex: 'createAt',
            key: 'createAt',
            sorter: (a, b) => new Date(a.createAt) - new Date(b.createAt),
            render: (createAt) => new Date(createAt).toLocaleDateString(),
            align: 'center',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'storePhone',
            key: 'storePhone',
            render: (storePhone) => `${storePhone}`,
            align: 'center',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'storeAddress',
            key: 'storeAddress',
            align: 'left', // Align left for the address column
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'storeStatus',
            key: 'storeStatus',
            align: 'center',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <Button
                        type="primary"
                        style={{ background: '#F56285' }}
                        icon={<CheckOutlined />}
                        onClick={() => handleAcceptClick(record.storeID)}
                    >
                        Chấp nhận
                    </Button>
                    <Button
                        type="danger"
                        style={{ background: 'red', color: 'white' }}
                        icon={<CloseOutlined />}
                        onClick={() => handleRejectClick(record.storeID)}
                    >
                        Từ chối
                    </Button>
                </div>
            ),
            align: 'center',
        },
    ];

    const filteredStores = stores.filter(store =>
        store.storeName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedStoreStatus ? store.storeStatus === selectedStoreStatus : true)
    );

    const customLocale = {
        triggerDesc: 'Nhấn để sắp xếp giảm dần',
        triggerAsc: 'Nhấn để sắp xếp tăng dần',
        cancelSort: 'Nhấn để hủy sắp xếp',
        emptyText: (
            <Empty
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                description={error || "Không tìm thấy cửa hàng"}
            />
        ),
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Danh sách cửa hàng</h1>
            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col xs={24} sm={12} md={8}>
                    <Input
                        placeholder="Tìm kiếm cửa hàng..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', borderColor: '#F56285' }}
                        suffix={<SearchOutlined style={{ fontSize: '18px', color: '#bfbfbf' }} />}
                    />
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Select
                        placeholder="Chọn trạng thái"
                        onChange={(value) => setSelectedStoreStatus(value)}
                        style={{ width: '100%' }}
                    >
                        <Option value="">Tất cả</Option>
                        <Option value="Đã kích hoạt">Đã kích hoạt</Option>
                        <Option value="Chờ duyệt">Chờ duyệt</Option>
                        <Option value="Đang xử lý">Đang xử lý</Option>
                    </Select>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredStores}
                rowKey="storeID"
                locale={customLocale}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default StoreList;