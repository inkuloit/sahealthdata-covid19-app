import React from 'react';
import {
    CasesDistricts,
    CasesProvinces,
} from 'components';

const CaseStats = (props) => {
    switch (props.view) {
        case 'provinces': return <CasesProvinces {...props} />
        case 'districts': return <CasesDistricts {...props} />
        default: return null;
    }
};

export default CaseStats;
