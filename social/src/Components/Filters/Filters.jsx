import React from 'react';
import { Chip, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../Features';
import { Filter } from '../../Utilities';

const Filters = () => {
    const { sortBy } = useSelector(state => state.post);
    const dispatch = useDispatch();
  return (
    <Stack direction="row" spacing={1}>
        {Filter?.map(({label, type})=>
            <Chip 
                label={label}
                key={type}
                color="primary"
                variant={sortBy===type ? "contained" : "outlined"}
                onClick={()=>dispatch(setSortBy(type))}/>
        )}
    </Stack>
  )
}

export { Filters };
