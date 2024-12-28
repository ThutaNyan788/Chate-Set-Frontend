import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
type Props = {}

const SocialiteCallback = (props: Props) => {

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    
    useEffect(() => {
        const userId = params.userId;
        if (userId && token) {
            localStorage.setItem('userId', userId);
            localStorage.setItem("login_token", token);
            navigate('/posts');
        } else {
            navigate('/');
        }
    }, []);

  return (
    <div>SocialiteCallback</div>
  )
}

export default SocialiteCallback