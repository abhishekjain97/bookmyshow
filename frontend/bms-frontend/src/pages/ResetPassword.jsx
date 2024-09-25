import React, { useState } from 'react'
import { Button, Form, Input, message } from "antd"
import { Link, useNavigate } from "react-router-dom";
import { resetPassword, validateOtp } from '../api/usersApi';
import { showLoading, hideLoading } from '../redux/loaderSlice';
import { useDispatch } from 'react-redux';

function ResetPassword() {
    const [messageApi, contextHandler] = message.useMessage()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [currentEmail, setCurrentEmail] = useState(null)
	const [isEmailSend, setIsEmailSend] = useState(false)

	const onFinisResetHandler = async (values) => {
		console.log(values);
		
		dispatch(showLoading());
		try {
			const response = await resetPassword(values)
			// console.log(response);
			if(response.status) {
				setCurrentEmail(values.email)
				setIsEmailSend(true)
                messageApi.success(response.message)
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

	const onFinishOtpHandler = async (value) => {
		dispatch(showLoading());
		try {
			const response = await validateOtp({ ...value, email: currentEmail })
			// console.log(response);
			if(response.status) {
                messageApi.success(response.message)
				navigate("/new-password/"+currentEmail)
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
				{ isEmailSend === false &&
					<>
					<section className="left-section">
						<h1>Reset Password</h1>
					</section>

					 
					<section className="right-section">
						<Form onFinish={onFinisResetHandler} layout="vertical">
			
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

							<Form.Item className="d-block">
								<Button
									type="primary"
									block
									htmlType="submit"
									style={{ fontSize: "1rem", fontWeight: "600" }}
								>
									Reset
								</Button>
							</Form.Item>
						</Form>
					</section>
					</>
				}


				{ isEmailSend &&
					<>
					<section className="left-section">
						<h1>Enter OTP</h1>
					</section>

					 
					<section className="right-section">
						<Form onFinish={onFinishOtpHandler} layout="vertical">
			
						<Form.Item
								label=""
								htmlFor="otp"
								name="otp"
								className="d-block"
								rules={[{ required: true, message: "Otp is required" }]}
							>
								<Input.OTP length={4} />
							</Form.Item>

							<Form.Item className="d-block">
								<Button
									type="primary"
									block
									htmlType="submit"
									style={{ fontSize: "1rem", fontWeight: "600" }}
								>
									Confirm
								</Button>
							</Form.Item>
						</Form>
					</section>
					</>
				}

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

export default ResetPassword