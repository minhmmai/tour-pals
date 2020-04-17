const tourForm = {
    tourDetails: {
        label: 'Let\'s Get Started!',
        description: 'Let us know about your group and the tour you\'re looking for',
        fields: [
            {
                id: 'tour',
                label: 'Tour',
                type: 'select',
                options: [
                    { value: 'phillip-island', label: 'Phillip Island' },
                    { value: 'souvereign-hill', label: 'Souvereign Hill' },
                    { value: 'bright', label: 'Bright' },
                    { value: 'mt-buller', label: 'Mt Buller' },
                    { value: 'mt-macedon', label: 'Mt Macedon' },
                    { value: 'great-ocean-road', label: 'Great Ocean Road' },
                    { value: 'lake-ountain', label: 'Lake Mountain' },
                    { value: 'grampians', label: 'Grampians' }
                ],
                validation: {
                    isRequired: true
                },
                valid: false,
                value: ''
            },
            {
                id: 'pickupAddress',
                label: 'Pick-up address',
                type: 'text',
                validation: {
                    isRequired: true,
                    minLength: 10,
                    maxLength: 50
                },
                valid: false,
                value: ''
            },
            {
                id: 'totalPeople',
                label: 'How many people are travelling?',
                tooltip: 'Total number of people travelling including you',
                type: 'select',
                options: [
                    { value: 4, label: '4 Or Less' },
                    { value: 7, label: '7 Or Less' },
                    { value: 10, label: '10 Or Less' },
                    { value: 15, label: '15 Or Less' },
                    { value: 20, label: '20 Or Less' },
                    { value: 30, label: '30 Or Less' },
                    { value: 40, label: '40 Or Less' },
                    { value: 60, label: '60 Or Less' }
                ],
                validation: {
                    isRequired: true
                },
                valid: false,
                value: ''
            },
            {
                id: 'children',
                label: 'How many children between the age of 2 and 7 in your group?',
                tooltip: 'We\'ll prepare car seats for the little ones free of charge',
                description: 'Children under 2 are not recommended to travel on our tours unfortunately',
                type: 'number',
                validation: {
                    isRequired: true,
                    minValue: 0,
                    maxValue: 'totalPeople.vale'
                },
                valid: false,
                value: ''
            }
        ]
    },
    contactDetails: {
        label: 'Tell us about you',
        description: 'Let us know how we can contact you',
        fields: [
            {
                id: 'fullName',
                label: 'Full name',
                type: 'text',
                validation: {
                    isRequired: true,
                    minLength: 10,
                    maxLength: 50
                },
                valid: false,
                value: ''
            },
            {
                id: 'email',
                label: 'Email address',
                type: 'email',
                validation: {
                    isRequired: false,
                    isDisplayed: true
                },
                valid: false,
                value: ''
            },
            {
                id: 'contactNumber',
                label: 'Contact number',
                type: 'text',
                validation: {
                    isRequired: true,
                    minLength: 7,
                    maxLength: 50
                },
                valid: false,
                value: ''
            },
            {
                id: 'altContactNumber',
                label: 'Alternative Contact number',
                type: 'text',
                validation: {
                    isRequired: false,
                    isDisplayed: true,
                    minLength: 7,
                    maxLength: 50
                },
                valid: false,
                value: ''
            }
        ]
    },
    paymentDetails: {
        label: 'Almost There!',
        description: 'Let us know how you would like to pay for the tour',
        fields: [
            {
                id: 'paymentType',
                label: 'Payment Type',
                type: 'select',
                options: [
                    { value: 'visa', label: 'Visa' },
                    { value: 'master', label: 'Mastercard' },
                    { value: 'amex', label: 'American Express' }
                ],
                validation: {
                    isRequired: true
                },
                valid: false,
                value: ''
            },
            {
                id: 'cardNumber',
                label: 'Card Number',
                type: 'card-number',
                validation: {
                    isRequired: true,
                    minLength: 15,
                    maxLength: 16
                },
                valid: false,
                value: ''
            },
            {
                id: 'expiryDate',
                label: 'Expiry Date',
                type: 'mmyy',
                validation: {
                    isRequired: true
                },
                valid: false,
                value: ''
            },
            {
                id: 'cvv',
                label: 'CVV',
                tooltip: 'This is a 3 to 4 digits code at the back of your card',
                description: 'Also refered to as CVC or CID',
                type: 'number',
                validation: {
                    isRequired: true,
                    minLength: 3,
                    maxLength: 4
                },
                valid: false,
                value: ''
            }
        ]
    },
    thankyou: {
        label: 'All Done!',
        description: 'You will receive a confirmation email from us real soon. In case of any question feel free to call us at 1234 5678'
    }
};
