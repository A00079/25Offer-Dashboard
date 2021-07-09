import React, { useState } from 'react';
import { TextBox } from "../../components";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

const AddOffers = () => {
    const [imageFilePreview, setImageFilePreview] = React.useState('');
    const [imageFile, setImageFile] = React.useState('');
    const [offerBenefit, setOfferBenefit] = React.useState('');
    const [offerBenefitArry, setOfferBenefitArry] = React.useState([]);
    const [offerInfo, setOfferInfo] = React.useState('');
    const [offerInfoArry, setOfferInfoArry] = React.useState([]);
    const [offerSteps, setOfferSteps] = React.useState('');
    const [offerStepsArry, setOfferStepsArry] = React.useState([]);
    const [input, setInput] = useState({});
    const [state, setState] = React.useState({
        istop: true,
    });

    const handleImageChange = (event) => {
        setImageFilePreview(URL.createObjectURL(event.target.files[0]));
        setImageFile(event.target.files[0]);
    }

    const handleSwitchChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleOfferBenefit = () => {
        let obj = {
            "id": Math.random().toString(36).substr(2, 9),
            "text": offerBenefit
        }
        console.log('obj', obj);
        setOfferBenefitArry(offerBenefitArry.concat(obj));
        document.getElementById('offerbenefits').value = '';
    }
    const handleOfferInfo = () => {
        let obj = {
            "id": Math.random().toString(36).substr(2, 9),
            "text": offerInfo
        }
        console.log('obj', obj);
        setOfferInfoArry(offerInfoArry.concat(obj));
        document.getElementById('offerinfo').value = '';
    }

    const handleOfferSteps = () => {
        let obj = {
            "id": Math.random().toString(36).substr(2, 9),
            "text": offerSteps
        }
        console.log('obj', obj);
        setOfferStepsArry(offerStepsArry.concat(obj));
        document.getElementById('offersteps').value = '';
    }

    const handleOfferInfoRemove = (id) => {
        setOfferInfoArry(offerInfoArry.filter(x => x.id !== id));
    }

    const handleOfferStepsRemove = (id) => {
        setOfferStepsArry(offerStepsArry.filter(x => x.id !== id));
    }

    const handleOfferBenefitRemove = (id) => {
        setOfferBenefitArry(offerBenefitArry.filter(x => x.id !== id));
    }

    const handleOfferSave = () => {
        let offerData = input;
        offerData['istop'] = state.istop;
        offerData['imagefile'] = imageFile;
        console.log('offerData', offerData);
        console.log('offerBenefitArry', offerBenefitArry);
        console.log('offerStepsArry', offerStepsArry);
        console.log('offerInfoArry', offerInfoArry);
        let filterBenefits = [];
        offerBenefitArry.map((el, index) => {
            filterBenefits.push(el.text);
        });

        let filterInfo = [];
        offerInfoArry.map((el, index) => {
            filterInfo.push(el.text);
        });

        let filterSteps = [];
        offerStepsArry.map((el, index) => {
            filterSteps.push(el.text);
        });

        var bodyFormData = new FormData();
        bodyFormData.append('name', offerData.offername);
        bodyFormData.append('imageUrl', imageFile);
        bodyFormData.append('offerUrl', offerData.offerlink);
        bodyFormData.append('userPayout', offerData.userpayout);
        bodyFormData.append('payoutOnText', offerData.payoutontext);
        bodyFormData.append('taskTest', offerData.tasktext);
        bodyFormData.append('offerTypeId', offerData.offertype);
        bodyFormData.append('reportingDays', offerData.reportingdays);
        bodyFormData.append('isLive', offerData.islive);
        bodyFormData.append('isTop', offerData.istop ? '1' : '0');
        bodyFormData.append('benefits', JSON.stringify(filterBenefits));
        bodyFormData.append('infos', JSON.stringify(filterInfo));
        bodyFormData.append('steps', JSON.stringify(filterSteps));

        axios({
            method: "POST",
            url: "https://questkart.com/25offers/api/v1/offer/create",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);
                alert('Offer Saved Successfully');
                setImageFilePreview(false);
                setImageFile('');
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    return (
        <React.Fragment>
            <section class="text-gray-600 body-font bg-white h-full">
                <div class="container px-5 py-4 mx-auto">
                    <div class="flex flex-col text-left w-full">
                        <h1 class="text-lg font-medium title-font text-gray-600 pl-3">Add New Offers</h1>
                    </div>

                    <div className="text-right px-2 mb-4 space-x-4">
                        <Button variant="contained" color="secondary">
                            Cancle
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => handleOfferSave()}>
                            Save
                        </Button>
                    </div>
                    <div className='border-b border-gray-300 mx-2'></div>
                    <div className="grid grid-cols-12 gap-4 px-2">
                        <div className="col-span-4 w-full">
                            <div className="w-full">

                                <div class="overflow-hidden relative w-48 mt-7">
                                    <div class="rounded-lg h-full overflow-hidden w-full mb-5">
                                        {
                                            !!imageFilePreview ?
                                                <img alt="content" class="object-cover object-center mx-auto w-16 pt-5" src={imageFilePreview} />
                                                : ""
                                        }
                                    </div>
                                    <button class="bg-blue-500 hover:bg-blue-light text-white font-bold py-2 px-4 w-full inline-flex items-center">
                                        <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                                        </svg>
                                        <span class="ml-2">Upload Offer Image</span>
                                    </button>
                                    <input
                                        class="cursor-pointer bottom-0 absolute block py-2 px-4 w-full opacity-0 pin-r pin-t"
                                        type="file"
                                        name="documents[]"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 w-full space-y-5 mt-5">
                            <div className="w-full">
                                <TextBox
                                    type="text"
                                    svgCode="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    required={true}
                                    orientation="vertical"
                                    name="offername"
                                    placeHolder="Offer Name"
                                    isLabel={true}
                                    label="offer name"
                                    value={input.offername}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full">
                                <TextBox
                                    type="text"
                                    svgCode="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    required={true}
                                    orientation="vertical"
                                    name="userpayout"
                                    placeHolder="User Payout"
                                    isLabel={true}
                                    label="User Payout"
                                    value={input.userpayout}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-span-4 w-full space-y-5 mt-5">
                            <div className="w-full">
                                <TextBox
                                    type="text"
                                    svgCode="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    required={true}
                                    orientation="vertical"
                                    name="offerlink"
                                    placeHolder="Offer Link"
                                    isLabel={true}
                                    label="Offer Link"
                                    value={input.offerlink}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full">
                                <TextBox
                                    type="text"
                                    svgCode="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    required={true}
                                    orientation="vertical"
                                    name="payoutontext"
                                    placeHolder="Payout On Text"
                                    isLabel={true}
                                    label="Payout On Text"
                                    value={input.payoutontext}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-span-4 w-full">
                            <div className="w-full">
                                <TextBox
                                    type="text"
                                    svgCode="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    required={true}
                                    orientation="vertical"
                                    name="tasktext"
                                    placeHolder="Task Text"
                                    isLabel={true}
                                    label="Task Text"
                                    value={input.tasktext}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-span-4 w-full">
                            <div className="w-full">
                                <TextBox
                                    type="text"
                                    svgCode="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    required={true}
                                    orientation="vertical"
                                    name="reportingdays"
                                    placeHolder="Reporting Days"
                                    isLabel={true}
                                    label="Reporting Days"
                                    value={input.reportingdays}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-span-4 w-full">
                            <div className="w-full mt-3">
                                <FormControl className="w-full ">
                                    <InputLabel id="demo-simple-select-label" className='font-bold'>Is Live</InputLabel>
                                    <Select
                                        name="islive"
                                        className="w-full"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={input.islive}
                                        onChange={(e) => handleInputChange(e)}
                                    >
                                        <MenuItem value={1}>Live</MenuItem>
                                        <MenuItem value={0}>Suspended</MenuItem>
                                        <MenuItem value={2}>Paused</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="col-span-4 w-full">
                            <div className="w-full mt-3">
                                <FormControl className="w-full ">
                                    <InputLabel id="demo-simple-select-label" className='font-bold'>Offer Type</InputLabel>
                                    <Select
                                        name="offertype"
                                        className="w-full"
                                        labelId="demo-simple-select-label"
                                        id="offertype"
                                        value={input.offertype}
                                        onChange={(e) => handleInputChange(e)}
                                    >
                                        <MenuItem value={1}>Fin tech</MenuItem>
                                        <MenuItem value={0}>Ed tech</MenuItem>
                                        <MenuItem value={2}>Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="col-span-6 w-full pl-2">
                            <div className="w-full mt-4">
                                <FormGroup>
                                    <Typography component="div">
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                            <div className='flex-col'>
                                                <div style={{ fontFamily: 'Nunito' }} className='font-medium text-sm mb-2 text-gray-700'>Is Top Offer</div>
                                                <div className='flex flex-row justify-between space-x-2'>
                                                    <div className='text-sm'>Off</div>
                                                    <div className='mt-1'>
                                                        <AntSwitch checked={state.istop} onChange={handleSwitchChange} name="istop" />
                                                    </div>
                                                    <div className='text-sm'>On</div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Typography>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="col-span-12 w-full py-2"></div>
                        <div className="col-span-7 w-full">
                            <div className='mb-1 flex flex-row justify-between'>
                                <div className='text-lg'>
                                    Offer Benefits
                                </div>
                                <Button variant="contained" color="primary" onClick={() => handleOfferBenefit()}>
                                    Add
                                </Button>
                            </div>
                            <div className="w-full">
                                <TextField
                                    className='w-full'
                                    id="offerbenefits"
                                    label="Offer Benefits"
                                    multiline
                                    name="offerbenefits"
                                    rows={3}
                                    focused={true}
                                    defaultValue=""
                                    variant="outlined"
                                    onChange={(e) => setOfferBenefit(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='col-span-12 w-full'>
                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Sr.No
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Benefit
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {offerBenefitArry.map((el, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-xs text-gray-900 w-96 break-all whitespace-normal">{el.text}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <div onClick={() => handleOfferBenefitRemove(el.id)}>
                                                                    <svg class="w-6 h-6 text-red-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-7 w-full mt-7">
                            <div className='mb-1 flex flex-row justify-between'>
                                <div className='text-lg'>
                                    Offer Info
                                </div>
                                <Button variant="contained" color="primary" onClick={() => handleOfferInfo()}>
                                    Add
                                </Button>
                            </div>
                            <div className="w-full">
                                <TextField
                                    className='w-full'
                                    id="offerinfo"
                                    label="Offer Info"
                                    multiline
                                    name="offerinfo"
                                    rows={3}
                                    focused={true}
                                    defaultValue=""
                                    variant="outlined"
                                    onChange={(e) => setOfferInfo(e.target.value)}

                                />
                            </div>
                        </div>

                        <div className='col-span-12 w-full'>
                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Sr.No
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Info
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {offerInfoArry.map((el, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-xs text-gray-900 w-96 break-all whitespace-normal">{el.text}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <div onClick={() => handleOfferInfoRemove(el.id)}>
                                                                    <svg class="w-6 h-6 text-red-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-7 w-full mt-7">
                            <div className='mb-1 flex flex-row justify-between'>
                                <div className='text-lg'>
                                    Offer Steps
                                </div>
                                <Button variant="contained" color="primary" onClick={() => handleOfferSteps()}>
                                    Add
                                </Button>
                            </div>
                            <div className="w-full">
                                <TextField
                                    className='w-full'
                                    id="offersteps"
                                    label="Offer Steps"
                                    multiline
                                    name="offersteps"
                                    rows={3}
                                    focused={true}
                                    defaultValue=""
                                    variant="outlined"
                                    onChange={(e) => setOfferSteps(e.target.value)}

                                />
                            </div>
                        </div>
                        <div className='col-span-12 w-full'>
                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Sr.No
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Steps
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {offerStepsArry.map((el, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-xs text-gray-900 w-96 break-all whitespace-normal">{el.text}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <div onClick={() => handleOfferStepsRemove(el.id)}>
                                                                    <svg class="w-6 h-6 text-red-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default AddOffers;