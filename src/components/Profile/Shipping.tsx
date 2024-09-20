import { useState } from 'react';
import toast from 'react-hot-toast';
import useUserInfo from '../../Hook/useUserInfo';
import axios from '../../utils/axios';

const Shipping = () => {
  const { userInfo, isUserLoad, isUserError } = useUserInfo();
  const [editable, setEditable] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState({
    phone: userInfo?.data.phone,
    address: userInfo?.data.address,
    city: userInfo?.data.city,
    area: userInfo?.data.area,
  });
  // handle update user shipping address
  const handleUpdateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { phone, address, city, area } = editUserInfo;
    if (!phone || !address || !city || !area) {
      toast.error('All fields are required');
      return;
    }
    const res = await axios.put(`/users/one/${userInfo?.data._id}`, {
      phone,
      address,
      city,
      area,
    });
    if (res.status === 200) {
      toast.success('Shipping address updated successfully');
      setEditable(false);
    } else {
      toast.error('Something is wrong');
    }
  };

  return (
    <section>
      {/* top */}
      <div className='flex items-center justify-between'>
        <p className='text-2xl font-bold'>Shipping</p>
        {editable || (
          <button
            className='primaryBtn'
            onClick={() => {
              setEditable(!editable);
              setEditUserInfo({
                phone: userInfo?.data.phone,
                address: userInfo?.data.address,
                city: userInfo?.data.city,
                area: userInfo?.data.area,
              });
            }}
          >
            Edit
          </button>
        )}
      </div>
      {isUserLoad && <p>Loading...</p>}
      {isUserError && <p>Something is wrong</p>}
      {!isUserLoad && !isUserError && (
        <form className='mt-8 space-y-4' onSubmit={handleUpdateUserInfo}>
          <div className='flex flex-col items-center gap-5 sm:flex-row'>
            <div className='w-full md:w-1/2'>
              <label htmlFor='phone' className='text-lg font-semibold'>
                Phone
              </label>
              <input
                type='tel'
                name='phone'
                id='phone'
                className='primaryInput'
                value={editUserInfo.phone ?? userInfo?.data.phone}
                onChange={(e) =>
                  setEditUserInfo({ ...editUserInfo, phone: e.target.value })
                }
                disabled={editable ? false : true}
              />
            </div>
            <div className='w-full md:w-1/2'>
              <label htmlFor='address' className='text-lg font-semibold'>
                Address
              </label>
              <input
                type='text'
                name='address'
                id='address'
                className='primaryInput'
                value={editUserInfo.address ?? userInfo?.data.address}
                onChange={(e) =>
                  setEditUserInfo({ ...editUserInfo, address: e.target.value })
                }
                disabled={editable ? false : true}
              />
            </div>
          </div>
          <div className='flex flex-col items-center gap-5 sm:flex-row'>
            <div className='w-full md:w-1/2'>
              <label htmlFor='city' className='text-lg font-semibold'>
                City
              </label>
              <select
                name='city'
                id='city'
                className='primaryInput'
                value={editUserInfo.city ?? userInfo?.data.city}
                onChange={(e) =>
                  setEditUserInfo({ ...editUserInfo, city: e.target.value })
                }
                disabled={editable ? false : true}
              >
                <option value=''>Choose your city</option>
                <option value='dhaka'>Dhaka</option>
                <option value='chattogram'>Chattogram</option>
                <option value='sylhet'>Sylhet</option>
                <option value='khulna'>Khulna</option>
                <option value='barishal'>Barishal</option>
                <option value='rajshahi'>Rajshahi</option>
                <option value='mymensingh'>Mymensingh</option>
                <option value='rangpur'>Rangpur</option>
              </select>
            </div>
            <div className='w-full md:w-1/2'>
              <label htmlFor='area' className='text-lg font-semibold'>
                Area
              </label>
              <input
                type='text'
                name='area'
                id='area'
                className='primaryInput'
                value={editUserInfo.area ?? userInfo?.data.area}
                onChange={(e) =>
                  setEditUserInfo({ ...editUserInfo, area: e.target.value })
                }
                disabled={editable ? false : true}
              />
            </div>
          </div>
          {editable && (
            <button type='submit' className='primaryBtn'>
              Save
            </button>
          )}
        </form>
      )}
    </section>
  );
};

export default Shipping;
