import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const maxVisiblePages = 5;
    const [startPage, setStartPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
                setData(response?.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredData = data?.filter((item) =>
        Object.values(item).some((val) => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const sortedData = useMemo(() => {
        let sortableData = [...filteredData];
        if (sortConfig.key) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }
        return sortableData;
    }, [filteredData, sortConfig]);

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
        setSortConfig({ key, direction });
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrev = () => {
        if (startPage > 1) {
            setStartPage(startPage - 1);
            setCurrentPage(startPage - 1);
        }
    };

    const handleNext = () => {
        if (startPage + maxVisiblePages - 1 < totalPages) {
            setStartPage(startPage + 1);
            setCurrentPage(startPage + 1);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-92">Loading...</div>;
    }


    return (
        <div className="md:p-6 p-4">
            <div className="md:mb-4 mb-2">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e?.target?.value)}
                    className="w-full px-4 lg:py-2 py-[6px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A21D3C]"
                />
            </div>
            <div className="overflow-x-auto shadow-md w-full bg-white rounded-lg">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-[#A21D3C] text-white w-full">
                        <tr className='flex flex-row items-center justify-between w-full'>
                            <th
                                className="w-[10%] md:px-6 px-[10px] xl:py-6 lg:py-4 md:py-5 py-4 text-left md:text-xs text-[10px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-black"
                                onClick={() => requestSort("id")}
                            >
                                <div className="flex items-center">
                                    ID
                                    <span className="ml-1">
                                        {sortConfig.key === "id" ? (sortConfig.direction === "asc" ? "↑" : "↓") : "↑↓"}
                                    </span>
                                </div>
                            </th>
                            <th
                                className="xl:w-[25%] w-[24%] md:px-6 px-[10px] xl:py-6 lg:py-4 md:py-5 py-4 text-left md:text-xs text-[10px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-black"
                                onClick={() => requestSort('title')}
                            >
                                <div className="flex items-center">
                                    Title
                                    <span className="ml-1">
                                        {sortConfig.key === 'title' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↑↓'}
                                    </span>
                                </div>
                            </th>
                            <th
                                className="w-[50%] md:px-6 px-[10px] xl:py-6 lg:py-4 md:py-5 py-4 text-left md:text-xs text-[10px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-black"
                                onClick={() => requestSort('body')}
                            >
                                <div className="flex items-center">
                                    Body
                                    <span className="ml-1">
                                        {sortConfig.key === 'body' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↑↓'}
                                    </span>
                                </div>
                            </th>

                            <th
                                className="xl:w-[15%] w-[16%] md:px-6 px-[10px] xl:py-6 lg:py-4 md:py-5 py-4 text-left md:text-xs text-[10px] font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-black"
                                onClick={() => requestSort('userId')}
                            >
                                <div className="flex items-center">
                                    User ID
                                    <span className="ml-1">
                                        {sortConfig.key === 'userId' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↑↓'}
                                    </span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems?.length > 0 ? (
                            currentItems?.map(item => (
                                <tr key={item?.id} className="hover:bg-gray-50 flex flex-row justify-between md:gap-0 gap-1">
                                    <td className="w-[10%] md:px-6 px-[10px] py-4 whitespace-nowrap md:text-sm text-xs text-gray-500">{item?.id}</td>
                                    <td className="xl:w-[25%] w-[24%] md:px-6 px-[10px] py-4 md:text-sm text-xs font-medium text-gray-900">{item?.title}</td>
                                    <td className="w-[50%] md:px-6 px-[10px] py-4 md:text-sm text-xs text-gray-500">{item?.body}</td>
                                    <td className="xl:w-[15%] w-[16%] md:px-6 px-[10px] py-4 md:text-sm text-xs text-gray-500">{item?.userId}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="md:px-6 px-0 py-4 h-92 font-semibold text-center text-sm text-gray-500">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            {currentItems?.length > 0 && (
                <div className="flex justify-center items-center md:gap-2 gap-1 xl:mt-10 lg:mt-8 md:mt-12 mt-8 mb-8">
                    <button
                        onClick={handlePrev}
                        disabled={startPage === 1}
                        className="md:mr-4 mr-2 w-8 h-8 font-bold flex justify-center items-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                    >
                        <FaAngleLeft />
                    </button>

                    {Array.from({ length: Math.min(maxVisiblePages, totalPages - startPage + 1) }, (_, i) => startPage + i).map(
                        (number) => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`flex items-center justify-center px-3 py-2 font-semibold md:text-sm/none text-xs/none rounded-md ${currentPage === number ? "bg-[#A21D3C] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {number}
                            </button>
                        )
                    )}

                    <button
                        onClick={handleNext}
                        disabled={startPage + maxVisiblePages - 1 >= totalPages}
                        className="md:ml-4 ml-2 w-8 h-8 font-bold flex justify-center items-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                    >
                        <FaAngleRight  />
                    </button>
                </div>
            )}
        </div>
    );
};

export default DataTable;