import toast from 'react-hot-toast';
import useAuth from '../../Hook/useAuth';
import useUserStatistics from '../../Hook/useUserStatistics';
import Loading from '../shared/Loading';
import ProfileInfoCard from './ProfileInfoCard';

const Profile = () => {
  const { user } = useAuth();
  const { userStatistics, isUserStatisticsLoad, isUserStatisticsError } =
    useUserStatistics();
  return (
    <section>
      {isUserStatisticsLoad && <Loading />}
      {isUserStatisticsError && toast.error('User no statistics')}
      {/* show some profile statistics */}
      <div className='mb-10 flex flex-wrap justify-between gap-5'>
        <ProfileInfoCard
          title='Total Costs'
          value={userStatistics?.data.totalCost || 0}
          theme='green'
        />
        <ProfileInfoCard
          title='Total Orders'
          value={userStatistics?.data.totalOrder || 0}
          theme='orange'
        />
        <ProfileInfoCard
          title='Total Cancellation'
          value={userStatistics?.data.totalCancellation || 0}
          theme='red'
        />
      </div>

      {/* user details  */}
      <div className='bg-slate-200'>
        <div className='relative mb-96 h-48 w-full'>
          <img
            src='https://www.bhmpics.com/downloads/patterned-backgrounds/5.stylish-hexagonal-line-pattern-background_1017-19742.jpg'
            className='h-full w-full object-cover'
          />
          <div className='grid w-full justify-items-center'>
            <div className='absolute top-20 p-10'>
              <div className='flex flex-col items-center'>
                <img
                  src={
                    user?.photoURL ||
                    'https://cdn-icons-png.flaticon.com/512/21/21104.png'
                  }
                  alt='user photo'
                  className='h-32 w-32 rounded-full border-4 border-white object-cover'
                />
                <h1 className='my-3 text-3xl'>{user?.displayName}</h1>
                <small className='my-3 text-center'>UID: {user?.uid}</small>
                <p className='text-center text-xl font-medium'>
                  {user?.email} <br /> Joined {new Date().toDateString()} .
                  Customer
                </p>
              </div>
              {/* some user action  */}
              <div className='my-10 flex justify-center gap-5'>
                <button className='primaryBtn'>Update Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
