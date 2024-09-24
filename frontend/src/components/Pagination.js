import React from 'react';

function Pagination({ totalRecipes, recipesPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalRecipes / recipesPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center space-x-2 my-4">
            <button
                disabled={currentPage === 1}
                onClick={handlePrevious}
                className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            >
                Previous
            </button>
            <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
            </span>
            <button
                disabled={currentPage === totalPages}
                onClick={handleNext}
                className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;