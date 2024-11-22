import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStores, acceptStore, rejectStore, fetchStoreByStoreID } from '../../../redux/actions/storeActions';
import { Button, Input, Table, Modal, Empty, Select, Row, Col, Descriptions, Avatar } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const { Option } = Select;

const StoreList = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const stores = useSelector(state => state.storeData.stores) || [];
    const error = useSelector(state => state.storeData.error);
    const [selectedStoreStatus, setSelectedStoreStatus] = useState('');
    const [storeDetails, setStoreDetails] = useState(null);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);

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

    const handleStoreIDClick = async (storeID) => {
        try {
            const storeData = await dispatch(fetchStoreByStoreID(storeID));
            setStoreDetails(storeData);
            setDetailsModalVisible(true);
        } catch (error) {
            Swal.fire('Lỗi!', 'Có lỗi xảy ra khi lấy thông tin cửa hàng.', 'error');
        }
    };

    const columns = [
        {
            title: 'Mã cửa hàng',
            dataIndex: 'storeID',
            key: 'storeID',
            sorter: (a, b) => a.storeID - b.storeID,
            align: 'center',
            render: (storeID) => (
                <Button type="link" onClick={() => handleStoreIDClick(storeID)}>
                    {storeID}
                </Button>
            ),
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
                        style={{ background: '#52c41a', color: 'white' }}
                        icon={<CheckOutlined />}
                        onClick={() => handleAcceptClick(record.storeID)}
                        disabled={record.storeStatus === 'Đã kích hoạt'}
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
            <Modal
                title="Thông tin chi tiết cửa hàng"
                visible={detailsModalVisible}
                onCancel={() => setDetailsModalVisible(false)}
                footer={null}
            >
                {storeDetails && (
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="Mã cửa hàng">{storeDetails.storeID}</Descriptions.Item>
                        <Descriptions.Item label="Tên cửa hàng">{storeDetails.storeName}</Descriptions.Item>
                        <Descriptions.Item label="Loại">{storeDetails.type}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{storeDetails.storePhone}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{storeDetails.storeAddress}</Descriptions.Item>
                        <Descriptions.Item label="Email">{storeDetails.email}</Descriptions.Item>
                        <Descriptions.Item label="Tên tài khoản ngân hàng">{storeDetails.bankAccountName}</Descriptions.Item>
                        <Descriptions.Item label="Số tài khoản ngân hàng">{storeDetails.bankNumber}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ ngân hàng">{storeDetails.bankAddress}</Descriptions.Item>
                        <Descriptions.Item label="Mã số thuế">{storeDetails.taxNumber}</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">{storeDetails.storeStatus}</Descriptions.Item>
                        <Descriptions.Item label="Avatar">
                            <Avatar src={storeDetails.storeAvatar} size={100} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Số CMND">{storeDetails.identityCard}</Descriptions.Item>
                        <Descriptions.Item label="Tên CMND">{storeDetails.identityName}</Descriptions.Item>
                        <Descriptions.Item label="Vai trò">{storeDetails.roleName}</Descriptions.Item>
                        <Descriptions.Item label="Mô tả cửa hàng">{storeDetails.storeDescription || 'Không có mô tả'}</Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">{storeDetails.createAt}</Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default StoreList;