
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import BookingList from './BookingList';

const Profile = () => {
  const {user} = useSelector((state) => state.users);
  const navigate = useNavigate();
  
  if(user.role !== 'User') {
    return navigate("/")
  }


  const items = [
    {
      key: '1',
      label: 'Bookings',
      children: <BookingList/>,
    }
    
  ];

  

  return (
    <>
    <h1>Your Bookings</h1>
        <Tabs defaultActiveKey="2" items={items} />
    </>
  )
}

export default Profile;
