
import { Tabs } from 'antd';
import TheatreList from './TheatreList';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Partner = () => {
  const {user} = useSelector((state) => state.users);
  const navigate = useNavigate();
  
  if(user.role !== 'Partner') {
    return navigate("/")
  }


  const items = [
    {
      key: '1',
      label: 'Theatres',
      children: <TheatreList/>,
    }
    
  ];

  

  return (
    <>
    <h1>Partner Page</h1>
        <Tabs defaultActiveKey="2" items={items} />
    </>
  )
}

export default Partner;
