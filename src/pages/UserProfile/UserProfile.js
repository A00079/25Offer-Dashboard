import React, { useEffect, useState } from 'react'
import axios from "axios";
import { withRouter } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

let currentPage = 1;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Userprofile = (props) => {
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = useState({});
    const [imageFilePreview, setImageFilePreview] = React.useState('');
    const [imageFile, setImageFile] = React.useState('');
    const [pendingData, setPendingData] = useState('');
    const [totalEarnings, setTotalEarnings] = useState('');
    const [totalWithdrawls, setTotalWithdrawls] = useState([]);
    const [userEarningData, setUserEarningData] = useState([]);
    const [userEarningModel, setUserEarningModel] = useState(false);
    const [userId, setUserId] = React.useState('');
    const [earningId, setEarningId] = React.useState('');
    const [userAmount, setUserAmount] = React.useState('');

    const [totalPages, setTotalPages] = useState('');
    const [disableNext, setDisableNext] = useState(false);
    const [disablePrevious, setDisablePrevious] = useState(true);

    const handleImageChange = (event) => {
        setImageFilePreview(URL.createObjectURL(event.target.files[0]));
        setImageFile(event.target.files[0]);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleUserEarningModelOpen = (userId, id, walletAmount) => {
        setUserEarningModel(true);
        setEarningId(id);
        setUserId(userId);
        setUserAmount(walletAmount);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserEarningClose = () => {
        setUserEarningModel(false);
    };

    const [userProfileData, setUserProfileData] = useState({});

    useEffect(() => {
        fetchUserProfile();
        fetchUserAllEarnings();
    }, []);

    const fetchUserProfile = () => {
        axios.get(`http://localhost:5000/api/v1/user/details/${props.match.params.id}`)
            .then(function (response) {
                console.log(response.data);
                setUserProfileData(response.data.user);
                if (response.data.user.hasOwnProperty('stats')) {
                    if (!!response.data.user.stats && response.data.user.stats.hasOwnProperty('totalEarnings')) {
                        setTotalEarnings(response.data.user.stats.totalEarnings);
                        setPendingData(response.data.user.stats.pending);
                    }
                }
                setTotalWithdrawls(response.data.user.withdrawls);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    const fetchUserAllEarnings = () => {
        axios.get(`http://localhost:5000/api/v1/earning/userEarnings/${props.match.params.id}?page=${currentPage}&limit=10`)
            .then(function (response) {
                console.log(response.data);
                setTotalPages(response.data.result.totalPages);
                setUserEarningData(response.data.result.data);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    const validatePaginationPrevious = () => {
        if (currentPage !== 1) {
            currentPage -= 1;
            fetchUserAllEarnings();
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
            fetchUserAllEarnings();
            setDisablePrevious(false);
        } else {
            setDisableNext(true);
        }
    }

    const handleSave = () => {
        let data = {
            'amount': input.amount,
            'offerName': input.offername,
            'offerImageUrl': ''
        }
        axios({
            method: "POST",
            url: `http://localhost:5000/api/v1/earning/addEarning/${props.match.params.id}`,
            data: data,
        })
            .then(function (response) {
                //handle success
                console.log(response);
                alert('Saved Successfully');
                fetchUserAllEarnings();
                fetchUserProfile();
                document.getElementById('offername').value = '';
                document.getElementById('amount').value = '';
                handleClose();
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    const handleUserEarningSave = () => {
        let data = {
            'amount': userAmount,
        }
        axios({
            method: "POST",
            url: `http://localhost:5000/api/v1/payment/addToWallet/${userId}/${earningId}`,
            data: data,
        })
            .then(function (response) {
                //handle success
                console.log(response);
                alert('Added Successfully');
                document.getElementById('useramount').value = '';
                setUserAmount('');
                fetchUserProfile(props.match.params.id);
                fetchUserAllEarnings();
                handleUserEarningClose();
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    return (
        <>
            <section class="text-gray-600 body-font bg-white h-screen">
                <div class="container px-5 py-7">
                    <div className="grid grid-cols-12 gap-24">
                        {
                            !!userProfileData && userProfileData ?
                                <div className="col-span-6 w-full flex flex-row space-x-3">
                                    <div class="mb-10 md:mb-0">
                                        <div class="w-24 h-24 border rounded-3xl border-indigo-900 shadow">
                                            <img src="https://img.icons8.com/plasticine/200/000000/user-male.png" />
                                        </div>
                                    </div>
                                    <div class="flex flex-col w-full md:items-start md:text-left items-center text-center">
                                        <div className='flex flex-row justify-between w-full items-center'>
                                            <h1 class="title-font sm:text-2xl text-3xl font-medium text-gray-900 flex flex-row space-x-1 items-center">
                                                <p><svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg></p>
                                                <p>{userProfileData.name}</p>
                                            </h1>
                                            <button onClick={handleClickOpen} className='flex flex-row space-x-1 items-center bg-green-600 h-6 rounded-sm px-1'>
                                                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
                                                <small className='text-xs font-bold text-white'>Add Earnings</small>
                                            </button>
                                        </div>
                                        <p className='text-xs font-medium text-gray-700 mb-3'>{userProfileData.email}</p>
                                        <div className='flex flex-row space-x-10 w-full'>
                                            <p className='text-sm font-medium text-gray-700 flex flex-col w-full whitespace-nowrap'><span className='text-sm font-semibold text-gray-600'>Phone Number</span>
                                                <span className='flex flex-row space-x-2 items-center'>
                                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                                                    <p className='text-sm font-semibold text-gray-500'>{userProfileData.phoneNumber}</p>
                                                </span>
                                            </p>
                                            <p className='text-sm font-medium text-gray-700 flex flex-col whitespace-normal whitespace-nowrap'><span className='w-full text-sm font-semibold text-gray-600'>Unique Code</span>
                                                <span className='flex flex-row space-x-2 items-center'>
                                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                                    <p className='text-sm font-semibold text-gray-500'>{userProfileData.uniqueCode}</p>
                                                </span>
                                            </p>
                                            <p className='text-sm font-medium text-gray-700 flex flex-col w-full whitespace-nowrap'><span className='text-sm font-semibold text-gray-600'>User Level </span> <span className='capitalize px-3 rounded-sm bg-yellow-300 text-xs font-bold mt-1'>{!!userProfileData.hasOwnProperty('level') && !!userProfileData.level.hasOwnProperty('name') ? userProfileData.level.name : ''
                                            }</span></p>
                                            <p className='text-sm font-medium text-gray-700 flex flex-col w-full whitespace-nowrap'><span className='text-sm font-semibold text-gray-600'>Is Refered</span>
                                                <span className='flex flex-row space-x-2 items-center'>
                                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"></path></svg>
                                                    <p className='text-sm font-semibold text-gray-500'>{userProfileData.isRefered == 0 ? 'No' : 'Yes'}</p>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                : 'No Profile Data Found'
                        }
                        <div className='col-span-6 w-full border-l border-gray-300'>
                            <div className='flex flex-row justify-between items-center w-full'>
                                <h4 className='text-lg font-medium pl-2 text-gray-500 flex flex-row space-x-2 items-center'>
                                    <svg class="w-6 h-6 text-blue-500 bg-indigo-200 rounded-sm p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
                                    <p>Statistics</p>
                                </h4>
                                <svg class="w-7 h-7 bg-gray-200 p-1 rounded-lg cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path></svg>
                            </div>
                            <div className='flex flex-row justify-start space-x-3 items-center mt-5 ml-2'>
                                <div class="flex flex-wrap -m-2">
                                    <div class="p-2 w-full">
                                        <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                            <img alt="team" class="w-12 h-12 bg-gray-100 object-cover object-center flex-shrink-0 rounded-sm mr-4" src="https://dummyimage.com/80x80" />
                                            <div class="flex-grow">
                                                <h2 class="text-gray-700 title-font font-semibold">Pending</h2>
                                                <p class="text-yellow-500 text-lg font-bold flex flex-row space-x-1 items-center">
                                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
                                                    <span>{pendingData}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-wrap -m-2">
                                    <div class="p-2 w-full">
                                        <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                            <img alt="team" class="w-12 h-12 bg-gray-100 object-cover object-center flex-shrink-0 rounded-sm mr-4" src="https://dummyimage.com/80x80" />
                                            <div class="flex-grow">
                                                <h2 class="text-gray-700 title-font font-semibold">Total Earnings</h2>
                                                <p class="text-green-500 text-lg font-bold space-x-1 flex flex-row items-center">
                                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
                                                    <span>{totalEarnings}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 mt-8">
                        <div className='col-span-6 w-full'>
                            <h4 className='text-sm font-bold text-gray-600 px-2 flex flex-row space-x-1 items-center'>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                <p>Withdrawls</p>
                            </h4>
                            <div class="flex flex-wrap justify-between items-center w-full overflow-auto h-80 p-2" id="journal-scroll">
                                {
                                    totalWithdrawls !== 0 && totalWithdrawls.map((el, index) => {
                                        return (
                                            <div class="w-1/2">
                                                <div class="p-1 w-full">
                                                    <div class="h-full w-full flex items-center border-gray-200 border p-2 rounded-lg">
                                                        <div alt="team" class="w-10 h-10 bg-yellow-50 object-cover object-center flex-shrink-0 rounded-sm mr-4">
                                                            <svg class="w-7 h-7 mx-auto mt-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L13 8.586V5h3a2 2 0 012 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2h3v3.586L9.707 7.293zM11 3a1 1 0 112 0v2h-2V3z"></path><path d="M4 9a2 2 0 00-2 2v5a2 2 0 002 2h8a2 2 0 002-2H4V9z"></path></svg>
                                                        </div>
                                                        <div class="flex-grow">
                                                            <h2 class="text-gray-900 title-font font-medium">Amount: <span className='text-green-400 text-sm font-bold'>{el.amount}</span></h2>
                                                            <p class="text-xs text-gray-500 font-medium">{el.updatedAt}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {totalWithdrawls.length == 0 ? 'Not Availiable' : ''}
                            </div>
                        </div>
                        <div className='col-span-6 w-full'>
                            <div className='flex flex-row justify-between items-center mb-4'>
                                <h4 className='text-sm font-bold text-gray-600 px-4 flex flex-row space-x-1 items-centerF'>
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                    <p>User Earnings</p>
                                </h4>
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
                            <div class="grid grid-cols-12 w-full overflow-auto h-60 p-2" id="journal-scroll">
                                {
                                    userEarningData !== 0 && userEarningData.map((el, index) => {
                                        return (
                                            <div class="col-span-6 w-full">
                                                <div class="p-1 w-full">
                                                    <div class="h-full w-full flex items-center space-x-2 border-gray-200 border p-2 rounded-lg">
                                                        <div alt="team" class="w-8 h-8 bg-green-50 object-cover object-center flex-shrink-0 rounded-sm mr-0">
                                                            <img className="h-8 w-8 rounded-full" src={el.offerImageUrl} alt="" />
                                                        </div>
                                                        <div class="flex-grow w-full">
                                                            <p class="text-xs text-gray-700 font-medium capitalize truncate w-24">{el.offerName}</p>
                                                            <h2 class="text-gray-900 text-xs title-font font-medium whitespace-nowrap">Amount: <span className='text-green-500 text-xs font-bold'>{el.amount}</span></h2>
                                                        </div>
                                                        <div class="flex-grow w-full">
                                                            <p class="text-xs text-gray-500 font-medium">Status</p>
                                                            <p class="text-xs text-gray-500 font-medium capitalize whitespace-nowrap">{!!el.status ? el.status : <small>Not Availiable</small>}</p>
                                                        </div>
                                                        <div class="flex-grow w-full">
                                                            {
                                                                !!el.status && el.status.toLocaleLowerCase() == 'pending' ?
                                                                    <svg onClick={() => handleUserEarningModelOpen(el.userId, el.id, el.amount)} class="w-6 h-6 text-blue-500 cursor-pointer float-right" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
                                                                    : <svg class="float-right w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {userEarningData.length == 0 ? 'Not Availiable' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Dialog
                maxWidth='xs'
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Add Earnings"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-6 w-full">
                                <TextField id="offername" name='offername' onChange={(e) => handleInputChange(e)} focused={true} label="Offer Name" variant="outlined" />
                            </div>
                            <div className="col-span-6 w-full">
                                <TextField id="amount" name='amount' onChange={(e) => handleInputChange(e)} label="Amount" variant="outlined" />
                            </div>
                            {/* <div className="col-span-12 w-full mt-4">
                                <div className="w-full">
                                    <div class="overflow-hidden relative w-48">
                                        <button class="bg-blue-500 rounded-sm hover:bg-blue-light text-white font-bold py-1 px-4 w-full inline-flex items-center">
                                            <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0h24v24H0z" fill="none" />
                                                <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                                            </svg>
                                            <span class="ml-2 text-sm">Upload Tips Image</span>
                                        </button>
                                        <input
                                            class="cursor-pointer top-0 absolute block py-2 px-4 w-full opacity-0 pin-r pin-t"
                                            type="file"
                                            name="documents[]"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e)}
                                        />
                                    </div>
                                    <div class="rounded-lg h-full overflow-hidden bg-white w-full">
                                        {
                                            !!imageFilePreview ?
                                                <img alt="content" class="object-cover object-center mx-auto w-28 bg-white pt-5" src={imageFilePreview} />
                                                : ""
                                        }
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSave()} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                maxWidth='xs'
                open={userEarningModel}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Add To Wallet"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-12 w-full">
                                <TextField id="useramount" inputProps={{ readOnly: true }} focused={true} value={userAmount} helperText="Note: Entered Amount amount cannot be greater than pending amount" name='useramount' onChange={(e) => setUserAmount(e.target.value)} label="Amount" variant="outlined" />
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUserEarningClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleUserEarningSave()} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default withRouter(Userprofile);