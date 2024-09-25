import React, { useState } from 'react'
import { Button, Form, Input, message } from "antd"
import { Link, useNavigate, useParams } from "react-router-dom";
import { newPassword } from '../api/usersApi';
import { showLoading, hideLoading } from '../redux/loaderSlice';
import { useDispatch } from 'react-redux';

function NewPassword() {
  const [messageApi, contextHandler] = message.useMessage()
	const dispatch = useDispatch()
	const navigate = useNavigate()
  const param = useParams()

  const onFinisResetHandler = async (values) => {
		dispatch(showLoading());
		try {
			const response = await newPassword({ ...values, email: param.email})
			// console.log(response);
			if(response.status) {
        messageApi.success(response.message)
        navigate("/login")
			} else {
				messageApi.error(response.message)
			}
      dispatch(hideLoading())
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

					<>
					<section className="left-section">
						<h1>Generate New Password</h1>
					</section>

					 
					<section className="right-section">
						<Form onFinish={onFinisResetHandler} layout="vertical">
			
						<Form.Item
								label="New Password"
								htmlFor="password"
								name="password"
								className="d-block"
								rules={[{ required: true, message: "Password is required" }]}
							>
								<Input
									id="password"
									type="password"
									placeholder="Enter your New Password"
									
								></Input>
							</Form.Item>

							<Form.Item className="d-block">
								<Button
									type="primary"
									block
									htmlType="submit"
									style={{ fontSize: "1rem", fontWeight: "600" }}
								>
									Save
								</Button>
							</Form.Item>
						</Form>
					</section>
					</>


						<div>
							<p>
								New User? <Link to="/register">Register Here</Link>
							</p>
						</div>
						<div>
							<p>
								<Link to="/login">Login</Link>
							</p>
						</div>
				</main>
			</header>
    </>
  )
}

export default NewPassword