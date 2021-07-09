import React, { useState } from 'react';
import { TextBox } from "../../components";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const AddAnnouncemnts = () => {
    const [announcementMessage, setAnnouncementMessage] = useState();
    const [imageFilePreview, setImageFilePreview] = React.useState('');
    const [imageFile, setImageFile] = React.useState('');

    const handleImageChange = (event) => {
        setImageFilePreview(URL.createObjectURL(event.target.files[0]));
        setImageFile(event.target.files[0]);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnnouncementMessage(value);
    };

    const SaveAnnouncement = () => {
        console.log('announcement Image', imageFile);
        var bodyFormData = new FormData();
        bodyFormData.append('announcementText', announcementMessage);
        bodyFormData.append('imageUrl', imageFile);
        axios({
            method: "POST",
            url: "http://localhost:5000/api/v1/announcements/create",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);
                alert('Announcement Saved Successfully');
                document.getElementById('announcementdetails').value = '';
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
            <section class="text-gray-600 body-font bg-white h-screen">
                <div class="container px-5 py-4 mx-auto">
                    <div class="flex flex-col text-left w-full">
                        <h1 class="text-lg font-medium title-font text-gray-600 pl-3">Add New Announcements</h1>
                    </div>

                    <div className="text-right px-10 mb-4 space-x-4">
                        <Button variant="contained" color="secondary">
                            Cancle
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => SaveAnnouncement()}>
                            Save
                        </Button>
                    </div>
                    <div className='border-b border-gray-300 mx-9 mb-6'></div>
                    <div className="grid grid-cols-12 gap-4 px-8">
                        <div className="col-span-6 w-full">
                            <div className="w-full">
                                <TextField
                                    className='w-full'
                                    id="announcementdetails"
                                    label="Enter Announcements Details"
                                    multiline
                                    name="announcementdetails"
                                    rows={5}
                                    focused={true}
                                    defaultValue=""
                                    variant="outlined"
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 w-full">
                            <div className="w-full">
                                <div class="overflow-hidden relative w-72">
                                    <button class="bg-blue-500 rounded-sm hover:bg-blue-light text-white font-bold py-2 px-4 w-full inline-flex items-center">
                                        <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                                        </svg>
                                        <span class="ml-2">Upload Announcements Image</span>
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
                                            <img alt="content" class="object-cover object-center mx-auto w-48 bg-white pt-5" src={imageFilePreview} />
                                            : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default AddAnnouncemnts;