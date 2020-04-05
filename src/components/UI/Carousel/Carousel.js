import React, { useState, useEffect, useCallback } from 'react';

import db from '../../../firestore';
import classes from './Carousel.module.scss';
import { Slide, IconButton } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const Carousel = props => {

    const [items, setItems] = useState([]);
    const activeIndexes = [];
    const carouselLength = props.length ? props.length : 3;

    useEffect(() => {
        db.collection('destinations')
            .get()
            .then(querySnapshot => {
                const data = [];
                querySnapshot.docs.map(doc => {
                    data.push({
                        name: doc.data().name,
                        description: doc.data().description,
                        thumbnail: doc.data().thumbnail,
                    })
                })
                setItems(data);
            }).catch(err => console.log(err));
    }, [])

    for (let i = 0; i < carouselLength - 1; i++) {
        activeIndexes.push(i);
    }

    return (
        <div className={classes.Carousel}>
            {items.length > 0
                ? console.log(items[1].name)
                : null}
        </div>
    )
};

export default Carousel;