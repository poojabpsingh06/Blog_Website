import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import write from "../assets/write.png"
import remove from "../assets/delete_1214428.png"
import posts from './post'
import Menu from './Menu'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from "moment";
import { useContext } from "react";
// import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

function SingleBlog() {


  const [post, setposts] = useState([])

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const currentUser = post.username;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/post/?idpost=${postId}`)

        setposts(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }


    }
    fetchdata()

  }, [postId])

  return (
    <div className='flex justify-center'>
      <div className='h-auto w-[1024px] m-15 p-5 flex flex-row justify-center gap-[50px] '>
        <div className=' flex flex-col gap-[30px] flex-[5_5_0%]'>
          <img src={`../upload/${post.img}`} className=' w-full h-[300px] object-cover' />

          <div className='user flex items-center gap-3'>
            <img src={"post.userImg"} alt="userimg" className='w-[50px] h-[50px] object-cover' />
            <div className=''>
              <span>{post.username}</span>
              <p>{post.date}</p>
            </div>
            {currentUser === post.username && (
              <div className='flex gap-[5px]'>
                <Link to={"/write"}>
                  <img src={write} className=' w-[20px] h-[20px] cursor-pointer' />
                </Link>
                <img src={remove} className=' w-[20px] h-[20px] cursor-pointer' />
              </div>
            )}
          </div>
          <h1 className=' text-[42px] font-noto'>{post.title}</h1>

          <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }} className=' text-justify leading-8 font-noto'>
          </p>

        </div>
        <div className=' flex flex-[2_2_0%]'><Menu posts={posts} /></div>
      </div>
    </div>



  )
}

export default SingleBlog