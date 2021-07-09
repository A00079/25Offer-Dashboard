import React, { useEffect, useState } from "react"
import axios from 'axios';

let currentPage = 1;

export default function AllUserEarnings() {
    const [userEarningsData, setUserEarningsData] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState('');
    const [disableNext, setDisableNext] = useState(false);
    const [disablePrevious, setDisablePrevious] = useState(true);

    useEffect(() => {
        fetchUserEarnings();
    }, []);

    const fetchUserEarnings = () => {
        axios.get(`https://questkart.com/25offers/api/v1/earning/allUsersEarnings?page=${currentPage}&limit=5`)
            .then(function (response) {
                console.log(response.data.result.data);
                setTotalPages(response.data.result.totalPages);
                setUserEarningsData(response.data.result.data);
            })
            .catch(e => console.log('Error', e));
    }
    const validatePaginationPrevious = () => {
        if (currentPage !== 1) {
            currentPage -= 1;
            fetchUserEarnings();
            if (currentPage == 1) {
                setDisablePrevious(true);
                setDisableNext(false);
            }
        } else {
            setDisablePrevious(true);
        }
    }

    const validatePaginationNext = () => {
        if (currentPage < totalPages) {
            currentPage += 1;
            fetchUserEarnings();
            setDisablePrevious(false);
        } else {
            setDisableNext(true);
        }
    }

    return (
        <React.Fragment>
            <div className="grid grid-cols-12">
                <div className="col-span-6 w-full flex flex-row justify-between px-2 items-center">
                    <h4 className='text-sm font-bold text-gray-500'>Users Earnings</h4>
                    <div className='flex flex-row justify-center space-x-1 items-center'>
                        <button disabled={disablePrevious} onClick={() => validatePaginationPrevious()} className={disablePrevious ? 'bg-gray-200 px-2 py-1 rounded-sm text-xs flex flex-row items-center space-x-2' : 'bg-indigo-500 px-2 py-1 rounded-sm text-xs text-white flex flex-row items-center space-x-2'}>
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                            <small>Previous</small>
                        </button>
                        <button disabled={disableNext} onClick={() => validatePaginationNext()} className={disableNext ? "bg-gray-200 px-2 py-1 text-white rounded-sm text-xs flex flex-row items-center space-x-2" : "bg-indigo-700 px-2 py-1 text-white rounded-sm text-xs flex flex-row items-center space-x-2"} >
                            <small>Next</small>
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6 w-full space-y-1 overflow-auto h-60 p-2" id="journal-scroll">
                    {
                        userEarningsData.map((el, index) => (
                            <div class="flex flex-wrap -m-2">
                                <div class="p-1 w-full">
                                    <div class="h-full flex items-center border-gray-300 border p-2 rounded-lg">
                                        <img alt="team" class="w-12 h-12 bg-gray-100 object-cover object-center flex-shrink-0 rounded-sm mr-4" src="https://dummyimage.com/80x80" />
                                        <div class="flex-grow w-full">
                                            <h2 class="text-gray-700 font-medium capitalize">{el.offerName}</h2>
                                            <p class="text-gray-500 text-xs">{new Date(el.createdAt).toDateString()}</p>
                                        </div>
                                        <div class="flex-grow w-full">
                                            <h2 class="text-gray-600 capitalize font-semibold">Amount</h2>
                                            <p class="text-green-500 font-semibold">{el.amount}</p>
                                        </div>
                                        <div class="flex-grow w-full">
                                            <h2 class="text-gray-600 capitalize font-semibold">Status</h2>
                                            {
                                                el.status.toLocaleLowerCase() == 'reverted' ?
                                                    <p class="text-red-500 capitalize font-semibold">{el.status}</p>
                                                    : el.status.toLocaleLowerCase() == 'paid' ?
                                                        <p class="text-green-500 capitalize font-semibold">{el.status}</p>
                                                        :
                                                        <p class="text-red-500 capitalize font-semibold">{el.status}</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </React.Fragment >
    )
}
