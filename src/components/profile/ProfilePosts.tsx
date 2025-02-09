
import { Link } from 'react-router-dom'

const ProfilePosts = () => {
    return (
        <div className='flex space-x-4 rounded-sm'>
            <div className='flex space-x-1 items-start'>
                <div className='dark:bg-gray-800 dark:text-white bg-gray-200 text-xs px-2 py-2  '>DEC</div>
                <div className='dark:bg-gray-800 dark:text-white bg-gray-200 text-xs px-3 py-2 '>24</div>
            </div>

            <div className='dark:bg-gray-800 bg-gray-200 w-full p-4 py-5'>
                Posts : <Link to={"/"} className='text-blue-500 hover:underline'>How to study JavaScript ? And What is Eloquent Javascript ?</Link>
            </div>
        </div>

    )
}

export default ProfilePosts