import React from 'react';

import { getForm } from '../../shared/utility';
import Form from './Form';

const Booking = props => {

    const form = getForm(props.formName);

    return (
        <div>
            <Form>{form}</Form>
        </div>
    )
};

export default Booking;