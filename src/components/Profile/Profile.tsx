import useAuth from '../../Hook/useAuth';
import useUserInfo from '../../Hook/useUserInfo';

const Profile = () => {
  const { user } = useAuth();
  const { userInfo } = useUserInfo();
  return (
    <section>
      <div className='space-y-5'>
        <p className='text-3xl font-bold'>Name: {user?.displayName}</p>
        <p className='text-2xl font-semibold'>
          Email: {user?.email} [
          {user?.emailVerified ? 'Verified' : 'Not Verified'}]
        </p>
        <p className='text-xl font-medium'>
          Phone: {userInfo?.data.phone ?? 'null'}
        </p>
        <p className='text-lg'>Account create: {user?.metadata.creationTime}</p>
      </div>
    </section>
  );
};

export default Profile;
