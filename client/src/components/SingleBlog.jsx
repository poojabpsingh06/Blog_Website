import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import write from "../assets/write.png";
import remove from "../assets/delete_1214428.png";
import Menu from './Menu';
import moment from "moment";
// import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

function SingleBlog() {
  const [post, setPost] = useState(null); // Initialize as null to handle loading state
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  
  // Assuming currentUser is obtained from some context or prop
  // const { currentUser } = useContext(AuthContext);
  const currentUser = "user1";  // Modify this as per your actual implementation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/post/${postId}`);
        const data = await response.json();
        setPost(data); // Assuming data.post contains the post object
        console.log(data);  
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className='flex justify-center'>
      <div className='h-auto w-[1024px] m-15 p-5 flex flex-row justify-center gap-[50px] '>
        <div className='flex flex-col gap-[30px] flex-[5_5_0%]'>
          <img src={`../upload/${post.img}`} className='w-full h-[300px] object-cover' alt="Post" />
          <div className='user flex items-center gap-3'>
            <img src={post.userImg} alt="userimg" className='w-[50px] h-[50px] object-cover' />
            <div className=''>
              <span>{post.username}</span>
              <p>{moment(post.date).format("MMM DD, YYYY")}</p>
            </div>
            {currentUser === post.username && (
              <div className='flex gap-[5px]'>
                <Link to={"/write"}>
                  <img src={write} className='w-[20px] h-[20px] cursor-pointer' alt="Edit" />
                </Link>
                <img src={remove} className='w-[20px] h-[20px] cursor-pointer' alt="Delete" />
              </div>
            )}
          </div>
          <h1 className='text-[42px] font-noto'>{post.title}</h1>
          <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }} className='text-justify leading-8 font-noto'>
          </p>
        </div>
        <div className='flex flex-[2_2_0%]'><Menu posts={[post]} /></div>
      </div>
    </div>
  )
}

export default SingleBlog;
 