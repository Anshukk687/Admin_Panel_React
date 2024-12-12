import { Table, Typography, Space, Rate, Avatar } from "antd"
import { getCustomers } from "../../API";
import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Icon, { LogoutOutlined } from "@ant-design/icons";

function Customers() {
    const [loading, setloading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setloading(true)
        getCustomers().then(res => {
            setDataSource(res.users);
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
        <Space direction="vertical"> 
            <div style={{padding: 15, fontSize: 20, fontWeight: 600, backgroundColor: '#8080801c', width: 1352}}>
                <Typography.Text>Customers</Typography.Text><br />
            </div>
            <div className="head-right" onClick={handleLogout} style={{marginTop: -53}} >
                <LogoutOutlined style={{ cursor: 'pointer' }} />
            </div>
            <Table style={{width: 1300}}
            loading={loading}
            columns={[
                {
                    title: "Image",
                    dataIndex: "image",
                    render: (link) => {
                        return <Avatar src={link} />
                    },
                },
                {
                    title: "First Name",
                    dataIndex: "firstName",
                },
                {
                    title: "Last Name",
                    dataIndex: "lastName",
                },
                {
                    title: "Email",
                    dataIndex: "email",
                },
                {
                    title: "Age",
                    dataIndex: "age",
                },
                {
                    title: "Phone",
                    dataIndex: "phone",
                },
                {
                    title: "Address",
                    dataIndex: "address",
                    render: (address)=>{
                        return <span>{address.address}, {address.city}</span>
                    }
                }
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


export default Customers