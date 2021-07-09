import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const ViewOffers = () => {
    const [offersData, setOffersData] = useState([]);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = () => {
        axios.get('https://questkart.com/25offers/api/v1/offer/alloffers')
            .then(function (response) {
                console.log(response.data);
                let filteredOfferData = [];
                response.data.map((el, index) => {
                    filteredOfferData.push({
                        'name': el.name,
                        'offerimageurl': el.offerImageUrl,
                        'offerurl': el.offerUrl,
                        'isformenabled': el.isformenabled,
                        'islive': el.isLive,
                        'istop': el.isTop,
                        'offertype': el.offerType.type,
                        'payoutontext': el.payoutOnText,
                        'reportingdays': el.reportingDays,
                        'tasktest': el.taskTest,
                        'userpayout': el.userPayout
                    })
                });
                setOffersData(filteredOfferData);
            })
            .catch((e) => {
                console.log('Error', e);
            })
    }

    const handleOffersDelete = (tipId) => {
        let comfirmDelete = window.confirm('Are You Sure You Want To Delete?');
        if (comfirmDelete) {
            axios.delete(`https://questkart.com/25offers/api/v1/offer/delete/${tipId}`)
                .then((response) => {
                    alert(response.data.message);
                    fetchOffers();
                })
                .catch((e) => {
                    console.log('Error', e);
                })
        }
    }
    return (
        <React.Fragment>
            <div class="container px-5 py-4 mx-auto bg-white h-full">
                <div class="flex flex-col text-left w-full">
                    <h1 class="text-lg font-medium title-font text-gray-600 pl-3">View Offers</h1>
                </div>
            </div>
            <div className="flex flex-col px-4 bg-white h-screen">
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
                                            Offer
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Offer Type
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Reporting Days
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            User Payout
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Live Offer
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Top Offer
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Form Enabled
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
                                    {offersData.map((el, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={el.offerimageurl} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-xs font-medium text-gray-900 uppercase">{el.name}</div>
                                                        <div className="text-xs text-gray-500 w-40 break-all whitespace-normal">{el.offerurl}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 capitalize font-medium">{el.offertype}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 font-medium">{el.reportingdays}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-green-600">{el.userpayout}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{el.islive == '1' ? 'Live' : el.islive == '0' ? 'Suspended' : el.islive == '2' ? 'Paused' : 'Not Avaliable'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{el.istop == '1' ? 'Yes' : 'No'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{el.isformenabled == '1' ? 'Yes' : 'No'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Button variant="contained" color="secondary">
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ViewOffers;