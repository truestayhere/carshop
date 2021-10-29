import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Addcar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({ 'brand': '', 'model': '', 'color': '', 'fuel': '', 'year': format(new Date(), 'yyyy'), 'price': '' })
    const classes = useStyles();

    const fuelTypes = [
        { value: 'Diesel' },
        { value: 'Hybrid' },
        { value: 'A95' },
        { value: 'B98' },
        { value: 'Electric' },
        { value: 'A98' }
    ];

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    };

    const handleYearChange = (date) => {
        setCar({ ...car, 'year': format(date, 'yyyy') });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addCar = () => {
        props.saveCar(car);
        setCar({ 'brand': '', 'model': '', 'color': '', 'fuel': '', 'year': format(new Date(), 'yyyy'), 'price': '' });
        handleClose();
    }

    return (
        <div style={{ margin: 10 }}>
            <Button size="small" variant="outlined" onClick={handleOpen}>
                Add car
            </Button>
            <Dialog open={open} onClose={handleClose} className={classes.root}>
                <DialogTitle>Add car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={(event) => handleInputChange(event)}
                        label="Brand"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="model"
                        value={car.model}
                        onChange={(event) => handleInputChange(event)}
                        label="Model"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="color"
                        value={car.color}
                        onChange={(event) => handleInputChange(event)}
                        label="Color"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        id="standard-select-currency"
                        select
                        name="fuel"
                        label="Fuel"
                        value={car.fuel}
                        onChange={(event) => handleInputChange(event)}
                        helperText="Please select fuel type:"
                    >
                        {fuelTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            disableToolbar
                            views={["year"]}
                            label="Year"
                            format="yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            name="year"
                            value={car.year}
                            onChange={(newDate) => handleYearChange(newDate)}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="price"
                        value={car.price}
                        onChange={(event) => handleInputChange(event)}
                        label="Price"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addCar}>Save</Button>
                </DialogActions>
            </Dialog>
        </div >
    );

}