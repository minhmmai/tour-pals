import React from 'react';

import { renderForm, getFormJson } from '../../shared/utility'

const Booking = props => {

    const form = getFormJson(props.formName);

    return (
        <div>
            {renderForm(form)}
        </div>
    )
};

export default Booking;