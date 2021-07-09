import React, { useState } from 'react';
import { TextBox } from "../../components";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const AddNotification = () => {
    const [notificationMessage, setNotificationMessage] = useState();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNotificationMessage(value);
    };

    const SaveNotification = () => {
        axios({
            method: "POST",
            url: "https://questkart.com/25offers/api/v1/notification/create",
            data: {
                message: notificationMessage
            },
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);
                alert('Notification Saved Successfully');
                document.getElementById('tipsdetails').value = '';
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }
    return (
        <React.Fragment>
            <section class="text-gray-600 body-font bg-white h-screen">
                <div class="container px-5 py-4 mx-auto">
                    <div class="flex flex-col text-left w-full">
                        <h1 class="text-lg font-medium title-font text-gray-600 pl-3">Add New Notification</h1>
                    </div>

                    <div className="text-right px-10 mb-4 space-x-4">
                        <Button variant="contained" color="secondary">
                            Cancle
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => SaveNotification()}>
                            Save
                        </Button>
                    </div>
                    <div className='border-b border-gray-300 mx-9 mb-6'></div>
                    <div className="grid grid-cols-12 gap-4 px-8">
                        <div className="col-span-6 w-full">
                            <div className="w-full">
                                <TextField
                                    name="notificationmessage"
                                    className='w-full'
                                    id="notificationmessage"
                                    label="Enter Notification Message"
                                    multiline
                                    rows={5}
                                    focused={true}
                                    defaultValue=""
                                    variant="outlined"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default AddNotification;