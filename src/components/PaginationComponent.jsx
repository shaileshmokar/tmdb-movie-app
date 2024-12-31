import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, totalCount, startEntry, endEntry, onPageChange }) => {
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    // return (
    //     <div>
    //         <Pagination className="ms-auto">
    //             <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1} />
    //             {Array.from({ length: totalPages }).map((_, index) => (
    //                 <Pagination.Item
    //                     key={index}
    //                     active={index + 1 === currentPage}
    //                     onClick={() => handlePageClick(index + 1)}
    //                 >
    //                     {index + 1}
    //                 </Pagination.Item>
    //             ))}
    //             <Pagination.Next onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages} />
    //         </Pagination>
    //     </div>
    // );

    return (
        <div className="d-flex align-items-center justify-content-between">
            <div className="text-muted">
                Showing {startEntry} to {endEntry} of {totalCount} entries
            </div>

            <Pagination className="mb-0">
                <Pagination.Prev 
                    onClick={() => handlePageClick(currentPage - 1)} 
                    disabled={currentPage === 1} 
                />
                {Array.from({ length: totalPages }).map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageClick(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next 
                    onClick={() => handlePageClick(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                />
            </Pagination>
        </div>
    );
};

export default PaginationComponent;