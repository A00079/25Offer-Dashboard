import React, { useState, useCallback } from "react";
import debounce from 'lodash.debounce';
import axios from "axios";
import { withRouter } from "react-router-dom";

const Stats = (props) => {

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSave = useCallback(
    debounce((newValue) => getSuggestions(newValue), 1000),
    []
  );

  const getSuggestions = async (word) => {
    if (word) {
      setLoading(false);
      axios.get(`https://candidleads.com/candid-offers/api/v1/user/search?query=${word}`)
        .then(function (response) {
          setOptions(response.data.suggestions);
          setLoading(true);
        })
        .catch((error) => {
          return error;
        });
    } else {
      setOptions([]);
      setLoading(false);
    }
  };

  const updateValue = (newValue) => {
    setInputValue(newValue);
    debouncedSave(newValue);
  };

  const gotoUserProfile = (userId) => {
    props.history.push(`/user-profile/${userId}`);
  }
  
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-6 w-full">

        <div className='stats-data-container space-y-1 w-full'>
          <div className='bg-white w-full shadow-xs border border-gray-200 rounded-md flex flex-col items-start space-y-1'>
            <div className='w-full'>
              <div class="w-full">
                <div class="h-full flex items-center p-2">
                  <div class="w-12 h-12 bg-gray-100 object-cover object-center flex-shrink-0 rounded-md mr-3">
                    <svg class="w-7 h-7 text-center text-indigo-600 mx-auto mt-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
                  </div>
                  <div class="flex-grow">
                    <div className='flex flex-row justify-between'>
                      <div>
                        <p class="text-gray-600 text-sm title-font font-bold">Showing Updated Data</p>
                        <small class="text-gray-500">Below are the updated statistics.</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='avaliable-stats-container w-full p-2 pt-0'>
              <div className='w-full flex flex-row justify-between space-x-1'>
                <div className='w-full bg-indigo-50 border border-gray-100 rounded-md shadow-sm p-2 flex flex-col space-y-1'>
                  <div>
                    <div class="w-9 h-9 bg-red-300 object-cover object-center flex-shrink-0 rounded-md mr-3">
                      <svg class="w-7 h-7 mx-auto pt-1 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path></svg>
                    </div>
                  </div>
                  <div className='flex flex-row space-x-1 items-center'>
                    <svg class="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"></path></svg>
                    <p className='text-sm font-bold text-blue-600'>48</p>
                  </div>
                  <p className='text-xs font-bold text-gray-700 capitalize'>
                    Total Offers
                  </p>
                </div>
                <div className='w-full bg-indigo-50 border border-gray-100 rounded-md shadow-sm p-2 flex flex-col space-y-1'>
                  <div>
                    <div class="w-9 h-9 bg-blue-400 object-cover object-center flex-shrink-0 rounded-md mr-3">
                      <svg class="w-7 h-7 mx-auto pt-1 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path></svg>
                    </div>
                  </div>
                  <div className='flex flex-row space-x-1 items-center'>
                    <svg class="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"></path></svg>
                    <p className='text-sm font-bold text-blue-600'>26</p>
                  </div>
                  <p className='text-xs font-bold text-gray-700 capitalize'>
                    Announcements
                  </p>
                </div>
                <div className='w-full bg-indigo-50 border border-gray-100 rounded-md shadow-sm p-2 flex flex-col space-y-1'>
                  <div>
                    <div class="w-9 h-9 bg-purple-400 object-cover object-center flex-shrink-0 rounded-md mr-3">
                      <svg class="w-7 h-7 mx-auto pt-1 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>
                    </div>
                  </div>
                  <div className='flex flex-row space-x-1 items-center'>
                    <svg class="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"></path></svg>
                    <p className='text-sm font-bold text-blue-600'>24</p>
                  </div>
                  <p className='text-xs font-bold text-gray-700 capitalize'>
                    Tips
                  </p>
                </div>
                <div className='w-full bg-indigo-50 border border-gray-100 rounded-md shadow-sm p-2 flex flex-col space-y-1'>
                  <div>
                    <div class="w-9 h-9 bg-green-400 object-cover object-center flex-shrink-0 rounded-md mr-3">
                      <svg class="w-7 h-7 mx-auto pt-1 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path></svg>
                    </div>
                  </div>
                  <div className='flex flex-row space-x-1 items-center'>
                    <svg class="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"></path></svg>
                    <p className='text-sm font-bold text-blue-600'>187</p>
                  </div>
                  <p className='text-xs font-bold text-gray-700 capitalize'>
                    Notifications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 w-full">
        <div class="shadow-md flex border border-gray-200 rounded-sm">
          <input class="w-full rounded-lg p-2 outline-none" type="text" onChange={(input) => updateValue(input.target.value)} placeholder="Search Users..." />
          <button class="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        {
          !!loading ?
            <div className='w-full bg-white border border-gray-200 mt-2 rounded-sm overflow-y-auto h-32' id="journal-scroll">
              <ul>
                {
                  options.map((el, index) => {
                    return (
                      <li key={index} className={index % 2 == 0 ? 'bg-gray-200' : 'bg-white'} onClick={() => gotoUserProfile(el.id)}>
                        <div className='flex flex-row space-x-2 py-1 cursor-pointer items-center'>
                          <div>
                            <svg class="w-5 h-5 text-indigo-600 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd"></path></svg>
                          </div>
                          <div className='flex flex-col'>
                            <p className='text-sm font-semibold text-gray-500'>{el.name}</p>
                            <p className='text-xs font-medium text-gray-500'>Unique Code:- {el.uniqueCode}</p>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            : ''
        }
      </div>
    </div>
  );
};

export default withRouter(Stats);
