import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Input, Modal, Select, Empty, Row, Col, Image, DatePicker } from 'antd';
import { acceptPayment, fetchAllPayment, rejectPayment } from '../../../redux/actions/paymentAction';
import { CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/vi_VN';

const { Option } = Select;
const { RangePicker } = DatePicker;

const PaymentList = () => {
    const dispatch = useDispatch();
    const payments = useSelector(state => state.paymentData.payments) || [];
    const [searchTerm, setSearchTerm] = useState('');
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [selectedPaymentId, setSelectedPaymentId] = useState(null);
    const [rejectNote, setRejectNote] = useState('');
    const [noteError, setNoteError] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);

    useEffect(() => {
        dispatch(fetchAllPayment());
    }, [dispatch]);

    const handleAcceptClick = (paymentID) => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: "Bạn sẽ không thể hoàn tác thao tác này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(acceptPayment(paymentID))
                    .then(() => {
                        Swal.fire('Thành công', 'Thanh toán đã được chấp nhận.', 'success');
                        dispatch(fetchAllPayment());
                    })
                    .catch(() => {
                        Swal.fire('Lỗi', 'Có lỗi xảy ra khi chấp nhận thanh toán.', 'error');
                    });
            }
        });
    };

    const handleRejectClick = (paymentID) => {
        setSelectedPaymentId(paymentID);
        setRejectModalVisible(true);
    };

    const handleConfirmReject = () => {
        if (!rejectNote.trim()) {
            setNoteError('Vui lòng nhập lý do từ chối thanh toán');
            return;
        }

        dispatch(rejectPayment(selectedPaymentId, rejectNote))
            .then(() => {
                Swal.fire('Thành công', 'Thanh toán đã bị từ chối.', 'success');
                setRejectModalVisible(false);
                setRejectNote('');
                setNoteError('');
                dispatch(fetchAllPayment());
            })
            .catch(() => {
                Swal.fire('Lỗi', 'Có lỗi xảy ra khi từ chối thanh toán.', 'error');
            });
    };

    const columns = [
        {
            title: 'ID Thanh toán',
            dataIndex: 'paymentID',
            key: 'paymentID',
            sorter: (a, b) => a.paymentID - b.paymentID,
            align: 'center',
        },
        {
            title: 'Ngày thanh toán',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
            sorter: (a, b) => new Date(a.paymentDate) - new Date(b.paymentDate),
            render: (date) => date ? moment(date).format('DD/MM/YYYY HH:mm:ss') : 'N/A',
            align: 'center',
        },
        {
            title: 'Cửa hàng',
            dataIndex: 'storeName',
            key: 'storeName',
            sorter: (a, b) => a.storeName.localeCompare(b.storeName),
            align: 'center',
        },
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderID',
            key: 'orderID',
            sorter: (a, b) => a.orderID - b.orderID,
            align: 'center',
        },
        {
            title: 'Ngân hàng',
            dataIndex: 'bankName',
            key: 'bankName',
            align: 'center',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            render: (price) => `${price?.toLocaleString()} VNĐ`,
            align: 'center',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status) => (status ? 'Đã thanh toán' : 'Chưa thanh toán'),
            align: 'center',
        },
        {
            title: "Ảnh thanh toán",
            dataIndex: "paymentImage",
            key: "paymentImage",
            render: (image) => (
                image ? (
                    <Image
                        src={image}
                        alt="Payment proof"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                        preview={{
                            maskClassName: "customize-mask",
                            mask: <div className="text-white">Xem</div>,
                        }}
                    />
                ) : (
                    "Chưa có ảnh"
                )
            ),
            align: 'center',
        },
        {
            title: 'Thao tác duyệt',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <Button
                        type="primary"
                        style={{ background: '#52c41a', color: 'white' }}
                        onClick={() => handleAcceptClick(record.paymentID)}
                        icon={<CheckOutlined />}
                        disabled={record.paymentStatus}
                    >
                        Chấp nhận
                    </Button>
                    <Button
                        type="danger"
                        style={{ background: '#f5222d', color: 'white' }}
                        onClick={() => handleRejectClick(record.paymentID)}
                        icon={<CloseOutlined />}
                        disabled={record.paymentStatus}
                    >
                        Từ chối
                    </Button>
                </div>
            ),
            align: 'center',
        },
    ];

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = !searchTerm ||
            payment.paymentID?.toString().includes(searchTerm.toLowerCase()) ||
            payment.orderID?.toString().includes(searchTerm.toLowerCase());
        const matchesBank = !selectedBank || payment.bankName === selectedBank;
        const matchesDateRange = !dateRange[0] || !dateRange[1] ||
            (moment(payment.paymentDate).isSameOrAfter(dateRange[0]) && moment(payment.paymentDate).isSameOrBefore(dateRange[1]));
        return matchesSearch && matchesBank && matchesDateRange;
    });

    return (
        <div style={{ padding: '20px' }}>
            <h1>Danh sách thanh toán</h1>
            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col xs={24} sm={12} md={8}>
                    <Input
                        placeholder="Tìm kiếm theo mã thanh toán hoặc mã đơn hàng"
                        prefix={<SearchOutlined />}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', borderColor: '#F56285' }}
                    />
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Select
                        placeholder="Chọn ngân hàng"
                        onChange={(value) => setSelectedBank(value)}
                        style={{ width: '100%' }}
                        allowClear
                    >
                        <Option value="">Tất cả</Option>
                        <Option value="MOMO">MOMO</Option>
                        <Option value="TPBANK">TPBANK</Option>
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <RangePicker
                        style={{ width: '100%' }}
                        onChange={(dates) => setDateRange(dates || [null, null])}
                        locale={{
                            ...locale,
                            lang: {
                                ...locale.lang,
                                rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'],
                            },
                        }}
                    />
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={filteredPayments}
                rowKey="paymentID"
                locale={{
                    triggerDesc: 'Nhấn để sắp xếp giảm dần',
                    triggerAsc: 'Nhấn để sắp xếp tăng dần',
                    cancelSort: 'Nhấn để hủy sắp xếp',
                    emptyText: <Empty description="Không có thanh toán nào" />,
                }}
                pagination={{
                    pageSize: 10,
                    showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} thanh toán`
                }}
            />

            <Modal
                title="Từ chối thanh toán"
                visible={rejectModalVisible}
                onOk={handleConfirmReject}
                onCancel={() => {
                    setRejectModalVisible(false);
                    setRejectNote('');
                    setNoteError('');
                }}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <div style={{ marginBottom: '16px' }}>
                    <Input.TextArea
                        value={rejectNote}
                        onChange={(e) => {
                            setRejectNote(e.target.value);
                            setNoteError('');
                        }}
                        placeholder="Nhập ghi chú lý do từ chối"
                        status={noteError ? 'error' : ''}
                        style={{ marginBottom: '4px' }}
                    />
                    {noteError && (
                        <div style={{ color: '#ff4d4f', fontSize: '14px' }}>
                            {noteError}
                        </div>
                    )}
                </div>
            </Modal>

            <style jsx>{`
                .ant-select-item-option-content {
                    color: black !important;
                }
            `}</style>
        </div>
    );
};

export default PaymentList;