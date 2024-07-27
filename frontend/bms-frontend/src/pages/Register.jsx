import React from "react";
import { Button, Form, Input, message, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../api/usersApi";

function Register() {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const onFinishRigisterForm = async (values) => {
    const {isAdmin, isPartner, ...restValues} = values
    
    if(isAdmin === 'admin') {
      restValues.role = "Admin"
    }
    if(isPartner === 'partner') {
      restValues.role = "Partner"
    }
    
    try {
      const response = await registerUser(restValues)
      
      if(response.status) {
        messageApi.success(response.message)
        navigate("/login")
      } else {
        messageApi.error(response.message)
      }
    } catch (error) {
      messageApi.error("Something went wrong!")
    }
  }
 
 return (
    <>
      {contextHolder}
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Register to BookMyShow</h1>
          </section>

          <section className="right-section">
            <Form onFinish={onFinishRigisterForm} layout="vertical">
              <Form.Item
                label="Name"
                htmlFor="name"
                name="name"
                className="d-block"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                 
                ></Input>
              </Form.Item>

              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your Email"
                  
                ></Input>
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                 
                ></Input>
              </Form.Item>

              <Form.Item
                label="Register as an Admin?"
                htmlFor="isAdmin"
                name="isAdmin"
                className="d-block text-center"
                initialValue={false}
                rules={[{ required: true, message: "Please select an option!" }]}
              >
                <div className="d-flex justify-content-start">
               
                  <Radio.Group
                    name="radiogroup"
                    className="flex-start"
                  >
                    <Radio value={'admin'}>Yes</Radio>
                    <Radio value={'user'} checked="true">No</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>

              <Form.Item
                label="Register as a Partner"
                htmlFor="isPartner"
                name="isPartner"
                className="d-block text-center"
                initialValue={false}
                rules={[{ required: true, message: "Please select an option!" }]}
              >
                <div className="d-flex justify-content-start">
               
                  <Radio.Group
                    name="radiogroup"
                    className="flex-start"
                  >
                    <Radio value={'partner'}>Yes</Radio>
                    <Radio value={'user'}>No</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>


              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                Already a user? <Link to="/login">Login now</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Register;