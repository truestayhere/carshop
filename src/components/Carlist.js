import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import 'react-table/react-table.css';
import Addcar from './Addcar';
import Editcar from './Editcar';


export default function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [link, setLink] = useState('');

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
            .then(responce => responce.json())
            .then(data => setCars(data._embedded.cars))
    };

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(car)
            })
            .then(res => fetchData())
            .catch(err => console.error(err))
    };

    const updateCar = (car, link) => {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(car)
            })
            .then(res => fetchData())
            .catch(err => console.error(err))
    };

    const deleteCar = (link) => {
        setLink(link);
        setOpen(true);
    };

    useEffect(() => {
        if (confirm) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchData())
                .catch(err => console.error(err))
            setConfirm(false);
        }
    }, [confirm])

    const handleClose = (event) => {
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={() => setConfirm(true)}>
                DELETE
            </Button>
        </React.Fragment>
    );

    const columns = [
        {
            Header: 'brand',
            accessor: 'brand'
        },
        {
            Header: 'model',
            accessor: 'model'
        },
        {
            Header: 'color',
            accessor: 'color'
        },
        {
            Header: 'fuel',
            accessor: 'fuel'
        },
        {
            Header: 'price',
            accessor: 'price'
        },
        {
            sortable: false,
            filterable: false,
            width: 80,
            Cell: row => <Editcar car={row.original} updateCar={updateCar} />
        },
        {
            sortable: false,
            filterable: false,
            width: 80,
            accessor: '_links.self.href',
            Cell: row => <Button variant="text" size="small" color="secondary" onClick={() => deleteCar(row.value)}>Delete</Button>
        }

    ];

    return (
        <div>
            <Addcar saveCar={saveCar} />
            <ReactTable filterable={true} data={cars} columns={columns} />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Confirm delete"
                action={action}
            />
        </div>
    );
};