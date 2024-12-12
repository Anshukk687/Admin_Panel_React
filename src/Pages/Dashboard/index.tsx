import Icon, { DashboardFilled, DollarCircleOutlined, LogoutOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './das.css';
import { Layout } from "antd";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

interface Order {
  title: string;
  quantity: number;
  price: string;
}

interface RevenueData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then(res => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then(res => setInventory(res.total));
    getCustomers().then(res => setCustomers(res.total));
    getRevenue().then(res => setRevenue(res.total));
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user-info');
    sessionStorage.removeItem('user-info');
    navigate('/login');
  };

  return (
    <Layout className="dash-Right">
      <Space size={15} direction="vertical">
        <div className="dash-right">
          <div className="dash-header">
            <Typography.Text>Dashboard</Typography.Text>
          </div>
          
          <div className="head-right" onClick={handleLogout}>
            <LogoutOutlined style={{ cursor: 'pointer' }} />
          </div>
          <div className="dash-content">
            <Space direction="horizontal" size={120}>
              <DashboardCard icon={<ShoppingCartOutlined style={{ color: "green", backgroundColor: "rgba(0,255,0,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title="Orders" value={orders} />
              <DashboardCard icon={<ShoppingOutlined style={{ color: "blue", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title="Inventory" value={inventory} />
              <DashboardCard icon={<UserOutlined style={{ color: "purple", backgroundColor: "rgba(0,255,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title="Customer" value={customers} />
              <DashboardCard icon={<DollarCircleOutlined style={{ color: "red", backgroundColor: "rgba(255,0,0,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title="Revenue" value={revenue} />
            </Space>
            <Space direction="horizontal" size={40}>
              <RecentOrders />
              <DashboardChart />
            </Space>
          </div>
        </div>
      </Space>
    </Layout>
  );
}

function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState<Order[]>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    getOrders().then(res => {
      setDataSource(res.products.splice(0, 3));
      setloading(false);
    });
  }, []);

  return (
    <Table
      columns={[
        { title: "Title", dataIndex: "title" },
        { title: "Quantity", dataIndex: "quantity" },
        { title: "Price", dataIndex: "price" },
      ]}
      loading={loading}
      dataSource={dataSource}
      pagination={false}
    />
  );
}

function DashboardChart() {
  const [reveneuData, setReveneuData] = useState<RevenueData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart: any) => `User-${cart.userId}`);
      const data = res.carts.map((cart: any) => cart.discountedTotal);

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250, top: 15 }}>
      <Bar options={options} data={reveneuData} />
    </Card>
  );
}

export default Dashboard;