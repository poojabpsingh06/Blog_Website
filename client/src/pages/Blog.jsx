import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Blog() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    navigate(`/blogs?term=${term}`);
  };

  const blog = location.search



  const fetchResults = async (searchTerm) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/blogs?term=${searchTerm}`);
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchdata = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/post');
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(blog);
    const searchTerm = queryParams.get('term');
    if (searchTerm) {
      setTerm(searchTerm);
      fetchResults(searchTerm);

    } else {
      fetchdata();
    }
  }, [blog]);

  const keyenter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className=" flex flex-col justify-center items-center m-20 font-noto">
      <input
        type="search"
        className="m-0 block w-[300px] lg:w-[500px] rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-[20px] leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none "
        placeholder="Search"
        aria-label="Search"
        value={term}
        onChange={(e) => { setTerm(e.target.value) }}
        onKeyDown={keyenter}

      />
      {/* <div className='flex flex-row justify-start items-center flex-wrap'>
        {
          posts.map((post, index) => {
            return (
              <div key={index} className="flex flex-col lg:flex-row justify-start items-center flex-wrap m-1 p-1">
                <BlogCard post={post} />
              </div>
            );
          }


          )
        }
      </div> */}
      <div className='flex flex-row justify-start items-center flex-wrap'>

        {term && results.length > 0 ? (
          results.map((post, index) => (
            <div key={index} className="flex flex-row justify-start items-center flex-wrap m-1 p-5">
              <BlogCard post={post} />
            </div>
          ))
        ) : (
          <p className="text-lg text-center">No results found</p>

        )
          // : (
          //   posts.map((post, index) => {
          //     <div key={index} className="flex flex-col lg:flex-row justify-start items-center flex-wrap m-1 p-1">
          //       <BlogCard post={post} />
          //     </div>
          //   })
          // )
        }
      </div>
      <div className='flex flex-row justify-start items-center flex-wrap'>
        {results.length == 0 ? (

          posts.map((post, index) => {
            return (
              <div key={index} className="flex flex-col lg:flex-row justify-start items-center flex-wrap m-1 p-1">
                <BlogCard post={post} />
              </div>
            )
          })
        ) : (<div></div>)
        }

      </div>
    </div>
  )
}

export default Blog