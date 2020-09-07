import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.css';

import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false
    }

    orderHandler = () => {
        this.setState({loading:true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            deliveryMethod: 'fastest',
            customer: {
                name: 'Winston Halim',
                email: 'test@test.com',
                address: {
                    street: 'testStreet1',
                    zipcode: 4152,
                    country: 'Australia'
                }
            }
        }

        axios.post("/orders.json", order)
            .then(response => {
                this.setState({loading: false})
            })
            .catch(error => {
                this.setState({loading: false})
            })
        
        this.props.history.push('/');

    }

    render() {
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                </form>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </div>
        );
    }
}

export default ContactData;