import { Table, Typography, Space, Rate, Avatar } from "antd"
import { getInventory, getOrders } from "../../API";
import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Icon, { LogoutOutlined } from "@ant-design/icons";

function Orders() {
    const [loading, setloading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setloading(true)
        getOrders().then(res => {
            setDataSource(res.products);
            setloading(false);
        })
    }, [])

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user-info');
        sessionStorage.removeItem('user-info');
        navigate('/login');
    };

    return (
        <Space size={20} direction="vertical">
            <div style={{padding: 15, fontSize: 20, fontWeight: 600, backgroundColor: '#8080801c', width: 1352}}>
                <Typography.Text>Orders</Typography.Text><br />
            </div>
            <div className="head-right" onClick={handleLogout} style={{marginTop: -64}} >
                <LogoutOutlined style={{ cursor: 'pointer' }} />
            </div>
            <Table style={{width: 1300}}
            loading={loading}
            columns={[
                {
                    title: "Title",
                    dataIndex: "title",
                },
                {
                    title: "Price",
                    dataIndex: "price",
                    render: (value)=><span>${value}</span>
                },
                {
                    title: "Price",
                    dataIndex: "price",
                    render: (value)=><span>${value}</span>
                },
                {
                    title: "Quantity",
                    dataIndex: "quantity",
                },
                {
                    title: "Total",
                    dataIndex: "total",
                }
            ]}
            dataSource={dataSource}
            pagination = {false}
            >
            </Table>
        </Space>
    )
}


export default Orders