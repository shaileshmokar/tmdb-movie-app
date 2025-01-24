import React, { useState, useMemo } from 'react';
import { Table, InputGroup, Form, Button } from 'react-bootstrap';
import { useTable, usePagination, useGlobalFilter } from 'react-table';

const MoviesTable = ({ movies }) => {
    const [search, setSearch] = useState('');
    const columns = useMemo(
        () => [
            // {
            //     Header: 'Poster',
            //     accessor: 'posterPath',
            // },
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Release Date',
                accessor: 'releaseDate',
            },
            {
                Header: 'Duration',
                accessor: 'duration',
            },
            {
                Header: 'Genre',
                accessor: 'genre.name',
            },
            {
                Header: 'Actions',
                accessor: 'id',
                Cell: ({ value }) => (
                    <Button variant="danger" onClick={() => handleDelete(value)}>
                        Delete
                    </Button>
                ),
            },
        ],
        []
    );

    const data = useMemo(() => movies, [movies]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
        page,
        gotoPage,
        previousPage,
        nextPage,
        pageCount,
        canPreviousPage,
        canNextPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 5, pageIndex: 0 },
        },
        useGlobalFilter,
        usePagination
    );

    const handleDelete = (id) => {
        // Implement delete logic
        console.log(`Deleting movie with id: ${id}`);
    };

    const handleSearch = (e) => {
        const value = e.target.value || '';
        setSearch(value);
        setGlobalFilter(value);
    };

    return (    
        <div>
            {/* Search Bar */}
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search movies"
                    value={search}
                    onChange={handleSearch}
                />
            </InputGroup>

            {/* Table */}
            <Table striped bordered hover responsive {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                    variant="outline-primary"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    Previous
                </Button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageCount}
                    </strong>
                </span>
                <Button
                    variant="outline-primary"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default MoviesTable;