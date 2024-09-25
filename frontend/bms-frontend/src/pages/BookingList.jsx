import React, { useEffect, useState } from 'react';
import { Table, message} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/loaderSlice';
import { getAllBookings } from '../api/bookingApi';
import moment from 'moment';


const BookingList = () => {
    const { user } = useSelector( (state) => state.users );
    const [yourBooking, setYourBooking] = useState(null);
    const dispatch = useDispatch();

    const getData = async () => {
        try{
          dispatch(showLoading());
          const response = await getAllBookings();
          // console.log(response);
          if(response.status){
            

            const allBookings = response.data

            const filterMovie = allBookings.map((item) => {
              return { 
                ...item, 
                key: item._id,
              }
            })
            setYourBooking(filterMovie)
            console.log(filterMovie);
            
          }else{
            message.error(response.message)
          }
          dispatch(hideLoading())
  
        }catch(err){
          dispatch(hideLoading());
          message.error(err.message);
        }
      }

    const columns = [
        {
          title: 'Poster',
          key: 'poster',
          render: (text, data) => {
            return <img
                    width="75"
                    height="115"
                    style={{ objectFit: "cover", background: `url(${data.show.movie.poster})`, backgroundSize: "cover" }}
                  />
          }
        },
        {
          title: 'Movie Name',
          key: 'movie_name',
          render: (text, data) => {
            return data.show.movie.movieName
          }
        },
        {
          title: 'Theatre',
          key: 'theater_name',
          render: (text, data) => {
            return data.show.theatre.name
          }
        },
        {
          title: 'Show',
          key: 'show_name',
          render: (text, data) => {
            return data.show.name
          }
        },
        {
          title: 'Date',
          key: 'show_date',
          render: (text, data) => {
            return moment(data.show.date).format('DD-MM-YYYY')
          }
        },
        {
          title: 'Booked Seats',
          key: 'booked_seat',
          render: (text, data) => {
            return data.seats.join(", ")
          }
        },
        {
          title: 'Amount',
          key: 'total_amount',
          render: (text, data) => {
            return data.seats.length * data.show.ticketPrice
          }
        },
      ];

      useEffect(() => {
        getData();
      }, [])

    return(
        <>
        <Table dataSource={yourBooking} columns={columns} />
        </>
    );
}

export default BookingList;