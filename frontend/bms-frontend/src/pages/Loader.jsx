import React from 'react'
import { useSelector } from 'react-redux'
import { Spin } from 'antd';


function Loader() {
    const { loading } = useSelector((state) => state.loaders);

    return loading ? (<div className='loader-container'>
        <div className='loader' />
    </div>) : null
}

export default Loader