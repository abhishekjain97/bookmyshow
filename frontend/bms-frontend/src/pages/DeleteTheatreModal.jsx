import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';
import { deleteTheatre } from '../api/theatreApi';
import { showLoading, hideLoading } from '../redux/loaderSlice';
import { useDispatch } from 'react-redux';



function DeleteMovieModal({isDeleteModalOpen, selectedTheatre, setIsDeleteModalOpen, setSelectedTheatre, getData}) {
    const dispatch = useDispatch();
    // console.log({isDeleteModalOpen, selectedMovie, setIsDeleteModalOpen, setSelectedMovie, getData});
    
    const hideModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handalDelete = async () => {
        try {
            dispatch(showLoading());
            const responce = await deleteTheatre({ theatreId: selectedTheatre._id})
            if(responce.status) {
                getData();
                message.success(responce.message);
            } else {
                message.error(responce.message);
            }
            setIsDeleteModalOpen(false)
            setSelectedTheatre(null);
            dispatch(hideLoading());
        } catch (error) {
            setIsDeleteModalOpen(false)
            dispatch(hideLoading());
            message.error("Something went wrong");
        }
        
    }

    return (
      <>
        <Modal
            title="Confirm"
            icon={<ExclamationCircleOutlined />}
            open={isDeleteModalOpen}
            onOk={handalDelete}
            onCancel={hideModal}
            okText="Yes"
            cancelText="No"
        >
            <ExclamationCircleOutlined /> Are your sure want to delete?
        </Modal>
      </>
    );
}

export default DeleteMovieModal



