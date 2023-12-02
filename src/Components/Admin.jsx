import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

const Admin = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [charge, setcharge] = useState(null);
  const [cat6, setcat6] = useState();
  const [gdata, setgdata] = useState({
    cat7 : 0,
    cat8 :  0,
    cat9 : 0,
    cat10 : 0
  })
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');

   const handleCatChange = (name, value) => {
    setgdata((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10) || 0, 
    }));
  };


  const getDetails = async () => {
    try {
      const response = await axios.get(`https://stg.dhunjam.in/account/admin/${userId}`);
      const { data, status } = response;
      if (status === 200) {
        setUserData(data.data);
      } else {
        console.error('Unexpected status code:', status);
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const amountData = userData?.amount
    ? Object.entries(userData.amount).map(([category, value]) => ({ category, value }))
    : [];
  
  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    if (!storedAuthState || storedAuthState !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      getDetails();
    }
  }, [userId]);

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='flex flex-col '>
            <div className=' w-full text-center'>
                <h1 className='text-[32px] font-extrabold'>{userData.name}, {userData.location} on Dhun Jam</h1>
            </div>
            <div className='flex flex-col'>
            <table  className='table-fixed' style={{ borderCollapse: 'separate', borderSpacing: '50px 20px' }}>
                <tbody >
                {/* Row 1 */}
                <tr>
                    <td>
                    <div className='flex flex-col'>
                        <p>Do you want to charge your</p>
                        <p>customers for requesting songs</p>
                    </div>
                    </td>
                    <td>
                    <div className='flex gap-11 items-center justify-center'>
                        <div className='flex items-center gap-3'>
                        <input id="charge-yes" type="radio" required value="yes" name="charge-radio"
                            defaultChecked={userData.charge_customers === true}
                        />
                        <label htmlFor="charge-yes">Yes</label>
                        </div>
                        <div className='flex items-center gap-3'>
                        <input id="charge-no" type="radio" required value="no" name="charge-radio" 
                            defaultChecked={userData.charge_customers === false}
                        />
                        <label htmlFor="charge-no">No</label>
                        </div>
                    </div>
                    </td>
                </tr>

                {/* Row 2 */}
                <tr>
                    <td>
                    <div className='flex items-center gap-[70px]'>
                        <p>Customer song request amount-</p>
                    </div>
                    </td>
                    <td>
                    <input
                        type='text'
                        className='bg-transparent text-[16px] py-2 w-[350px] px-3 text-center outline-none
                        border-[1px] rounded-xl'
                        required={userData.charge_customers === true}
                        value={cat6}
                        disabled={userData.charge_customers === false}
                        onChange={(e)=>{ setcat6(e.target.value)}}
                    />
                    </td>
                </tr>

                {/* Row 3 */}
                <tr>
                    <td>
                    <div className='flex flex-col'>
                        <p>Regular request amount,</p>
                        <p>from high to low-</p>
                    </div>
                    </td>
                    <td>
                    <div className='flex w-full justify-between'>
                        <input type="text" name="cat7" 
                        required={userData.charge_customers === true} 
                        onChange={(e) => handleCatChange('cat7', e.target.value)}
                        className=' bg-transparent py-2 w-[80px] px-3  outline-none border-[1px] rounded-xl ' />
                        <input type="text" name="cat8" 
                        required={userData.charge_customers === true} 
                        onChange={(e) => handleCatChange('cat8', e.target.value)}
                        className=' bg-transparent py-2 w-[80px] px-3  outline-none border-[1px] rounded-xl ' />
                        <input type="text" name="cat9" 
                        required={userData.charge_customers === true} 
                        onChange={(e) => handleCatChange('cat9', e.target.value)}
                        className=' bg-transparent py-2 w-[80px] px-3  outline-none border-[1px] rounded-xl ' />
                        <input type="text" name="cat10" 
                        required={userData.charge_customers === true} 
                        onChange={(e) => handleCatChange('cat10', e.target.value)}
                        className=' bg-transparent py-2 w-[80px] px-3  outline-none border-[1px] rounded-xl ' />
                    </div>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
                {/* Bar Chart */}
            <div className='mt-5'>
                <ResponsiveContainer width='90%' height={350}>
                    <BarChart data={amountData} barSize={30} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey='category' />
                    <YAxis yAxisId='left'   />
                    <Bar dataKey='value' fill='#F0C3F1' yAxisId='left' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className='w-full text-center mt-8'>
                <button 
                className={`w-[80%] bg-[${ cat6 >= 99 &&  gdata.cat7 >= 79 && gdata.cat8 >= 59  && gdata.cat9 >= 39 && gdata.cat10 >= 19 ? "#6741D9" : "#C2C2C2"}]`}>Save</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
