import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from 'axios';

let currentPage = 1;

export default function AllUserEarnings() {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const [userEarningsData, setUserEarningsData] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState('');
    const [disableNext, setDisableNext] = useState(false);
    const [disablePrevious, setDisablePrevious] = useState(true);

    useEffect(() => {
        fetchUserEarnings();
        // fetchAllTransactions();
    }, []);

    const fetchAllTransactions = () => {
        var data = '';

        var config = {
            method: 'get',
            url: 'https://api.razorpay.com/v1/transactions?account_number=2323230024948434',
            headers: {
                'Authorization': 'Basic cnpwX3Rlc3RfV2JSVHc0bEZSUDdrUm46djV0TFhDU3o0dUtnWDc1anR6aGRuejNC'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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

    const downloadXL = () => {
        axios.get(`https://questkart.com/25offers/api/v1/earning/allUsersEarnings?all=true`)
            .then(function (response) {
                let SheetData = [];
                let filtertedData = response.data.result.data.filter((el, index) => {
                    return el.status.toLocaleLowerCase() == 'paid';
                });

                filtertedData.map((el, index) => {
                    SheetData.push({ 'Name': el.user.name, 'Amount': el.amount });
                });

                const ws = XLSX.utils.json_to_sheet(SheetData);
                const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
                const data = new Blob([excelBuffer], { type: fileType });
                FileSaver.saveAs(data, 'User Details' + fileExtension);
            })
            .catch(e => console.log('Error', e));
    }

    return (
        <React.Fragment>
            <div className="grid grid-cols-12">
                <div className="col-span-6 w-full flex flex-row justify-between px-2 items-center">
                    <h4 className='text-sm font-bold text-gray-500'>Users Earnings</h4>
                    <div className='flex flex-row justify-center space-x-1 items-center'>
                        <button onClick={() => downloadXL()} className='text-white mr-2 bg-green-400 px-2 py-1 rounded-sm text-xs flex flex-row items-center space-x-2'>
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd"></path></svg>
                            <small>Download</small>
                        </button>
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
                <div className="col-span-6 w-full space-y-1 overflow-auto h-72 p-2" id="journal-scroll">
                    {
                        userEarningsData.map((el, index) => (
                            <div class="flex flex-wrap -m-2">
                                <div class="p-1 w-full">
                                    <div class="h-full flex items-center border-gray-300 border p-2 rounded-lg">
                                        <img alt="team" class="w-12 h-12 bg-gray-100 object-cover object-center flex-shrink-0 rounded-sm mr-4" src="https://dummyimage.com/80x80" />
                                        <div class="flex-grow w-full">
                                            <h2 class="text-gray-700 font-medium capitalize">{el.user.name}</h2>
                                            <div className='flex flex-col items-start'>
                                                <small class="text-gray-500 text-xs capitalize">{el.offerName}</small>
                                                <small class="text-gray-500 text-xs font-semibold capitalize" style={{ fontSize: '0.7rem' }}>{el.user.level.name}</small>
                                            </div>
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
                                        <div class="flex-grow w-full">
                                            <h2 class="text-gray-600 capitalize font-semibold">Unique Code</h2>
                                            <p class="text-gray-500 font-semibold">{el.user.uniqueCode}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-span-6 w-full">
                    <div class="p-4 w-full -my-9 border border-gray-300 rounded-lg shadow-sm">
                        <div class="h-full flex flex-col items-center text-center">
                            <img alt="team" class="flex-shrink-0 rounded-lg w-48 h-40 object-fit mb-2" src="/img/AddOffers.png" />
                            <div class="w-full mx-auto">
                                <h2 class="title-font font-medium text-lg text-gray-900">Add New Offer</h2>
                                <h3 class="text-gray-500 mb-3 text-xs">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</h3>
                                <div className='text-center w-full mx-auto'>
                                    <Button variant="contained" color="primary">
                                        <svg class="w-6 h-6 pr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clip-rule="evenodd"></path></svg>Add Offer
                                    </Button>
                                </div>
                                <span class="inline-flex">
                                    <a class="text-gray-500">
                                        <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a class="ml-2 text-gray-500">
                                        <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a class="ml-2 text-gray-500">
                                        <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment >
    )
}
