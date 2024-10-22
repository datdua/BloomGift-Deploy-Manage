import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStores, acceptStore, rejectStore } from '../../../redux/actions/storeActions';
import { Button, Input, Table, Modal, Empty, Select } from 'antd';
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
            title: 'Tên cửa hàng',
            dataIndex: 'storeName',
            key: 'storeName',
        },
        {
            title: 'Ngày Đăng Ký',
            dataIndex: 'createAt',
            key: 'createAt',
            sorter: (a, b) => new Date(a.createAt) - new Date(b.createAt),
            render: (createAt) => new Date(createAt).toLocaleDateString(),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'storePhone',
            key: 'storePhone',
            render: (storePhone) => `0${storePhone}`,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'storeAddress',
            key: 'storeAddress',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'storeStatus',
            key: 'storeStatus',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
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
        },
    ];

    const filteredStores = stores.filter(store =>
        store.storeName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedStoreStatus ? store.storeStatus === selectedStoreStatus : true)
    );

    const customLocale = {
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
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <Input
                    placeholder="Tìm kiếm cửa hàng..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 300 }}
                    suffix={<SearchOutlined style={{ fontSize: '18px', color: '#bfbfbf' }} />}
                />
                <Select
                    placeholder="Chọn trạng thái"
                    onChange={(value) => setSelectedStoreStatus(value)}
                    style={{ width: '200px' }}
                >
                    <Option value="">Tất cả</Option>
                    <Option value="Đã kích hoạt">Đã kích hoạt</Option>
                    <Option value="Chờ duyệt">Chờ duyệt</Option>
                    <Option value="Đang xử lý">Đang xử lý</Option>
                </Select>
            </div>
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