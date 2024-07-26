interface shippingAddressProps {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useUserInfo from '../../Hook/useUserInfo';

const ShippingAddress: React.FC<shippingAddressProps> = ({
  isEdit,
  setIsEdit,
}) => {
  const { userInfo, isUserLoad, isUserError } = useUserInfo();
  const [editUserInfo, setEditUserInfo] = useState({
    phone: '',
    address: '',
    city: '',
    area: '',
  });
  // shipping address handle change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditUserInfo({ ...editUserInfo, [name]: value });
    setIsEdit(true);
  };

  //  handle submit shipping address
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEdit) return toast.error('All ready Save your address');
    try {
      const { address, area, city, phone } = editUserInfo;
      const res = await axios.put(
        `${import.meta.env.VITE_baseurl}/users/one/${userInfo?.data._id}`,
        { phone, address, city, area },
      );
      if (res.status === 200) {
        toast.success('Shipping address updated successfully');
        setIsEdit(false);
      } else {
        toast.error('Something is wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setEditUserInfo({
      phone: userInfo?.data.phone,
      address: userInfo?.data.address,
      city: userInfo?.data.city,
      area: userInfo?.data.area,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        <h2 className='text-2xl font-semibold'>Shipping Address</h2>
        <p className='text-lg text-gray-500'>
          Please enter your shipping address
        </p>
      </div>
      {isUserLoad && <p className='py-10 text-lg'>Loading . . .</p>}
      {isUserError && <p className='py-10 text-lg'>There was an error.</p>}
      {!isUserLoad && !isUserError && userInfo && (
        <form
          onSubmit={handleSubmit}
          className='my-10 w-full space-y-6 lg:w-1/2'
        >
          {/* name and contact */}
          <div className='flex w-full flex-col gap-5 sm:flex-row'>
            <div className='grid w-full gap-1'>
              <label htmlFor='name' className='text-lg font-semibold'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Jhon Dou'
                className='primaryInput'
                value={userInfo?.data.name}
                disabled
              />
            </div>
            <div className='grid w-full gap-1'>
              <label htmlFor='phone' className='text-lg font-semibold'>
                Contact No
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                placeholder='+054798690454'
                className='primaryInput'
                value={editUserInfo.phone ?? userInfo?.data.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* area and city */}
          <div className='flex w-full flex-col gap-5 sm:flex-row'>
            <div className='grid w-full gap-1'>
              <label htmlFor='city' className='text-lg font-semibold'>
                City
              </label>
              <select
                name='city'
                id='city'
                className='primaryInput'
                value={editUserInfo.city ?? userInfo?.data.city}
                onChange={handleChange}
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
            <div className='grid w-full gap-1'>
              <label htmlFor='area' className='text-lg font-semibold'>
                Area
              </label>
              <input
                type='text'
                id='area'
                name='area'
                placeholder='Mirpur-10 / Azimpur / Dhanmondi'
                className='primaryInput'
                value={editUserInfo.area ?? userInfo?.data.area}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* address in details */}
          <div className='grid w-full gap-1'>
            <label htmlFor='address' className='text-lg font-semibold'>
              Address
            </label>
            <textarea
              name='address'
              id='address'
              placeholder='House no, Road no, Village, Post office'
              rows={4}
              className='primaryInput'
              value={editUserInfo.address ?? userInfo?.data.address}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <input
              type='checkbox'
              name='isDefault'
              id='isDefault'
              className='accent-green-600'
            />
            <label htmlFor='isDefault' className='ml-2 font-medium'>
              Set as default address
            </label>
          </div>
          {/* buttons */}
          <div className='flex gap-5'>
            <button className='secondaryBtn w-full'>Add Billing Address</button>
            <button className='primaryBtn w-full'>Save</button>
          </div>
        </form>
      )}
    </>
  );
};

export default ShippingAddress;
