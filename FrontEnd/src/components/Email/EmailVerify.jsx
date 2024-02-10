import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PageNotFound from '../../utils/PageNotFound';
import { BASE_URL } from '../../utils/BASE_URL';

const Email = () => {
  const [validURL, setValidURL] = useState(false);
  const { id, token } = useParams();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/${id}/verify/${token}`);
          setValidURL(true);
      } catch (err) {
      }
    };
    handleAuth();
  }, [id,token]);

  return (
    <section className='w-[80%] mx-auto h-[50vh] max-sm:h-[70vh] flex items-center justify-center'>
      {validURL ? (
        <div className="text-center h-[50%] p-5">
          <i className='fa-solid fa-check-circle text-[60px] py-5 text-green-400 max-md:text-[40px]'></i>
          <p className='my-4 opacity-50 mb-10 max-md:text-xs'>Your Email Has Verified Successfully</p>
          <Link to='/auth/login' className='font-bold bg-lgrn px-6 py-1 rounded-full text-white cursor-pointer max-md:text-xs'>Login</Link>
        </div>
      ) : (
        <PageNotFound />
      )}
    </section>
  );
}

export default Email;
