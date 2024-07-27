import React from 'react'

import {Tabs} from 'antd'
import MovieList from './MovieList'
import TheatresTable from './TheatresTable'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function Admin() {
  const {user} = useSelector((state) => state.users);
  const navigate = useNavigate();

  if(user.role !== 'Admin') {
    return navigate("/")
  }

  const tabItems = [
      { 
          key : '1',
          label : 'Movies',
          children : <MovieList/>

      },

      {
          key : '2',
          label : 'Theatres',
          children : <TheatresTable/>
      }
  ]


  return (
    <div>
        <h1>Admin Page</h1>
        <Tabs items={tabItems}/>
    </div>
  )
}

export default Admin