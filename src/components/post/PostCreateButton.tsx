import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom';


export const PostCreateButton = () => {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/posts/create");
    }

    return (
        <Button
            onClick={handleNavigate}
            className=" font-semibold rounded-lg active:scale-95 transition-transform"
        >
            New Post
        </Button>
    )
}