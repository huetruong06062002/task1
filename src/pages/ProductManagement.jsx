// ProductManagement.jsx
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Spin } from "antd";
const { Search } = Input;
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../redux/productsSlice";

const ProductManagement = () => {
  const [showProducts, setshowProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentProduct, setcurrentProduct] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => {
    setshowProducts(products);
  }, [products]);
  if (loading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  const handleEdit = (product) => {
    setVisible(true);
    setEditing(true);
    setcurrentProduct(product.id);
    form.setFieldsValue({
      name: product.name,
      price: product.price,
      avatar: product.avatar,
    });
  };
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Avatar", dataIndex: "avatar", key: "avatar" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => {
        return a.price - b.price;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button onClick={() => handleDelete(record.id)}>
            <DeleteOutlined />
          </Button>
          <Button onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
        </>
      ),
    },
  ];

  const handleSubmit = (data) => {
    if (editing) {
      dispatch(updateProduct({ id: currentProduct, ...data }));
    } else {
      dispatch(addProduct(data));
    }
    setVisible(false);
    setEditing(false);
    form.resetFields();
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    let data = products.filter((product) => {
      return Object.values(product).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      );
    });

    setshowProducts(data);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "50px auto 0" }}>
      <div
        className="options"
        style={{ display: "flex", justifyContent: " space-between" }}
      >
        <Button type="primary" onClick={() => setVisible(true)}>
          Add Product
        </Button>
        <Search
          placeholder="Search name product"
          allowClear
          style={{
            width: 200,
          }}
          onChange={(event) => handleSearch(event)}
        />
      </div>

      <Table
        dataSource={showProducts}
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
      <Modal
        title={editing ? "Edit Product" : "Add Product"}
        open={visible}
        onOk={() => form.submit()}
        onCancel={() => {
          setVisible(false);
          setEditing(false);
          form.resetFields();
        }}
      >
        <Form form={form} onFinish={(data) => handleSubmit(data)}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Avatar"
            name="avatar"
            rules={[{ required: true, message: "Please enter a avatar" }]}
          >
            <Input type="string" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter a price" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
