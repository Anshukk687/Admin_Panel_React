import { Table, Typography, Space, Rate, Avatar } from "antd"
import { getInventory } from "../../API";
import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Icon, { LogoutOutlined } from "@ant-design/icons";

function Inventory() {
    const [loading, setloading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setloading(true)
        getInventory().then(res => {
            setDataSource(res.products);
            setloading(false);
        })
    }, []);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user-info');
        sessionStorage.removeItem('user-info');
        navigate('/login');
    };

    return (
        <Space size={20} direction="vertical">
            <div style={{padding: 15, fontSize: 20, fontWeight: 600, backgroundColor: '#8080801c', width: 1352}}>
                <Typography.Text>Inventory</Typography.Text><br />
            </div>
            <div className="head-right" onClick={handleLogout} style={{marginTop: -64}} >
                <LogoutOutlined style={{ cursor: 'pointer' }} />
            </div>
            <Table style={{width: 1300}}
            loading={loading}
            columns={[
                {
                    title: "Thumbnail",
                    dataIndex: "thumbnail",
                    render: (link) => {
                        return <Avatar src={link} />
                    },
                },
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
                    title: "Rating",
                    dataIndex: "rating",
                    render: (rating)=>{
                        return <Rate value={rating} allowHalf disabled />
                    }
                },
                {
                    title: "Stock",
                    dataIndex: "stock",
                },
                {
                    title: "Brand",
                    dataIndex: "brand",
                },
                {
                    title: "Category",
                    dataIndex: "category",
                },
            ]}
            dataSource={dataSource}
            pagination = {{
                pageSize: 10
            }}
            >
            </Table>
        </Space>
    )
}


export default Inventory