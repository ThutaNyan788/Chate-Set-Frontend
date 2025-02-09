
import { Link } from 'react-router-dom'

const ProfileActivity = () => {
    return (
        <div className='flex space-x-4 rounded-sm'>
            <div className='flex space-x-1 items-start'>
                <div className='dark:bg-gray-800 dark:text-white bg-gray-200 text-xs px-2 py-2  '>DEC</div>
                <div className='dark:bg-gray-800 dark:text-white bg-gray-200 text-xs px-3 py-2 '>24</div>
            </div>

            <div className='dark:bg-gray-800 bg-gray-200 w-full p-4'>
                <p>Replied to</p> <Link to={"/"} className='cursor-pointer text-blue-500 hover:underline'>How to learn html ?</Link>
                <div>
                    <p><span className='text-blue-500'><Link to={"/"}>@aungaung</Link></span> this mail right ?</p>
                </div>
            </div>
        </div>

    )
}

export default ProfileActivity