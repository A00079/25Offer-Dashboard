import React, { useEffect, useState } from "react"
import axios from 'axios';

export default function AllUserEarnings() {
    const [userEarningsData, setUserEarningsData] = useState([]);

    useEffect(() => {
        fetchUserEarnings();
    }, []);

    const fetchUserEarnings = () => {
        axios.get('http://localhost:5000/api/v1/earning/allUsersEarnings')
            .then(function (response) {
                console.log(response.data.result.data);
                setUserEarningsData(response.data.result.data);
            })
    }
    return (
        <React.Fragment>
            <h4 className='text-sm font-bold text-gray-500'>Users Earnings</h4>
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
