import React from 'react'
import { Button, Form, Input, message } from "antd"
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../api/usersApi';
import { showLoading, hideLoading } from '../redux/loaderSlice';
import { useDispatch } from 'react-redux';

function Login() {
	const [messageApi, contextHandler] = message.useMessage()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const onFinishLoginHandler = async (values) => {
		dispatch(showLoading());
		try {
			const response = await loginUser(values)
			// console.log(response);
			if(response.status) {
				messageApi.success(response.message)
				localStorage.setItem("token", response.token)
				if(response.role == "Admin") {
					return navigate("/home")
				} else if(response.role == "Partner") {
					return navigate("/partner")
				} else {
					return navigate("/")
				}
			} else {
				messageApi.error(response.message)
			}
		} catch (error) {
			if(error.response.status === 404) {
				messageApi.error(error.response.data.message)
			} else {
				messageApi.error("Something went wrong!")
			}
			dispatch(hideLoading())
		}
	}

  return (
    <>
		{contextHandler}
			<header className="App-header">
				<main className="main-area mw-500 text-center px-3">
					<section className="left-section">
						<h1>Login to BookMyShow</h1>
					</section>

					<section className="right-section">
						<Form onFinish={onFinishLoginHandler} layout="vertical">
			
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

							<Form.Item className="d-block">
								<Button
									type="primary"
									block
									htmlType="submit"
									style={{ fontSize: "1rem", fontWeight: "600" }}
								>
									Login
								</Button>
							</Form.Item>
						</Form>
						<div>
							<p>
								New User? <Link to="/register">Register Here</Link>
							</p>
						</div>
						<div>
							<p>
								<Link to="/reset">Reset Password</Link>
							</p>
						</div>
					</section>
				</main>
			</header>
    </>
  )
}

export default Login