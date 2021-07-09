import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const ViewTips = () => {

    const [tipsData, setTipsData] = useState([]);

    useEffect(() => {
        fetchTips();
    }, []);

    const fetchTips = () => {
        axios.get('https://questkart.com/25offers/api/v1/tip/alltips')
            .then(function (response) {
                console.log(response.data);
                setTipsData(response.data);
            })
    }

    const handleTipDelete = (tipId) => {
        let comfirmDelete = window.confirm('Are You Sure You Want To Delete?');
        if (comfirmDelete) {
            axios.delete(`https://questkart.com/25offers/api/v1/tip/delete/${tipId}`)
                .then((response) => {
                    alert(response.data.message);
                    fetchTips();
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
                    <h1 class="text-lg font-medium title-font text-gray-600 pl-3">View Tips</h1>
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
                                            Tip Image
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Tip Message
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Created At
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
                                    {tipsData.map((el, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={el.tipImageUrl} alt="" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 w-60 break-all whitespace-normal">{el.tipText}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-sm bg-green-100 text-green-800">
                                                    {new Date(el.createdAt).toDateString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                                <Button variant="contained" color="secondary" onClick={() => { handleTipDelete(el.id) }}>
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

export default ViewTips;