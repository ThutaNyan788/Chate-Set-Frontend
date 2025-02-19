
import { useState } from 'react';
import ProfileActivity from './ProfileActivity'
import ProfilePosts from './ProfilePosts';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '@/context/AppContextProvider';

const ProfileSetting = () => {
    let [activity, setActivity] = useState('activity');
    let [dataItem,setDataItem] = useState([]);
    let navigate = useNavigate();
    let {user}= useGlobalContext();

// Fetch Data from API

    return (
        <div className=''>
            <div className='flex flex-wrap justify-center md:justify-between items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 p-1 '>

                <div className='flex  space-x-4 '>
                    <div className=' text-center p-1'>
                        <img src="https://randomuser.me/api/portraits/men/89.jpg" alt="" width={100} height={100} />
                        <div className='mt-4'>
                            <button onClick={()=>navigate(`/profile/edit`)} className='bg-gray-700 text-white font-semibold text-sm px-4 py-2
                            hover:border hover:border-solid  hover:border-blue-500 transition duration-700 ease-out'>Edit</button>
                        </div>
                    </div>

                    <div>
                        <p className='text-lg font-semibold'>thutanyan</p>
                        <p className='dark:text-white text-xs font-semibold '>Member Since 2 years ago</p>
                        <div className='mt-4'>
                            <button className='bg-gray-700 text-white font-semibold text-sm px-4 py-2
                            hover:border hover:border-solid  hover:border-blue-500 transition duration-700 ease-out'>Follow Me</button>
                        </div>
                    </div>
                </div>


                <div className='flex  space-x-4 mt-8 md:mt-0'>
                    <div className='dark:bg-gray-700 px-8 py-8 rounded-sm text-center cursor-pointer 
                        hover:border hover:border-solid  hover:border-blue-500 transition duration-700 ease-out'>
                        <img src="https://laracasts.com/images/profiles/xp-level.svg?id=2" alt="" />
                        <p className='py-2 font-semibold text-xl'>5,000</p>
                        <p className='text-sm font-bold'>Total Posts</p>
                    </div>


                    <div className='dark:bg-gray-700 px-8 py-8 rounded-sm text-center cursor-pointer 
                        hover:border hover:border-solid  hover:border-blue-500 transition duration-700 ease-out'>
                        <img src="https://laracasts.com/images/profiles/xp-lesson.svg?id=2" alt="" />
                        <p className='py-2 font-semibold text-xl'>4,500</p>
                        <p className='text-sm font-bold'>Total Followers</p>
                    </div>
                </div>
            </div>

            {/* BIO */}
            <div className='text-center mt-8 flex justify-center py-8'>
                <blockquote className="text-md max-w-5xl italic font-semibold text-gray-900 dark:text-white">
                    <p>
                        "This is your optional bio. Right now, only you can see it. You can edit it by clicking the EDIT button underneath your avatar and it will display here for all to see."
                    </p>
                </blockquote>
            </div>

            <hr />

            {/* Activity Tag */}
            <div>
                <div className='flex justify-center mt-8 space-x-8'>
                    <button className='font-bold ' onClick={() => setActivity('activity')}>
                        <p className={`${activity == "activity" ? 'dark:text-white text-gray-500' : 'text-gray-500 '}`}>My Activity </p>
                        <div className={`w-full h-[5px]  mt-4 ${activity == "activity" ? "bg-blue-500" : "bg-gray-500"}`}></div>
                    </button>

                    <button className='font-bold ' onClick={() => setActivity('posts')}>
                        <p className={`${activity == "posts" ? 'dark:text-white text-gray-500' : 'text-gray-500'}`}>My Posts </p>
                        <div className={`w-full h-[5px]  mt-4 ${activity == "posts" ? "bg-blue-500" : "bg-gray-500"}`}></div>
                    </button>
                </div>
            </div>


            <div className='mt-8 space-y-4'>

                {activity == "activity" && (
                    [1, 2, 3, 4, 5].map((item) => {
                        return <ProfileActivity key={item} />
                    })
                )}



                {activity == "posts" && (
                    [1, 2, 3, 4, 5].map((item) => {
                        return <ProfilePosts key={item} />
                    })
                )}


            </div>
        </div>
    )
}

export default ProfileSetting