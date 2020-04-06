import React from 'react';
import NumberFormat from 'react-number-format';

const TableRow = props => {
    const {
        iso_code,
        code,
        district,
        allbed_mean,
        icubed_mean,
        allbed_lower,
        mobilab_mean,
    } = props;

    return (
        <tr>
            <td><strong>{iso_code.toLowerCase()} {district}</strong></td>
            <td>{code}</td>
            <td className="tx-medium text-right">
                <NumberFormat displayType={'text'} thousandSeparator value={allbed_mean} />
            </td>
            <td className="tx-medium text-right">
                <NumberFormat displayType={'text'} thousandSeparator value={icubed_mean} />
            </td>
            <td className="tx-medium text-right">
                <NumberFormat displayType={'text'} thousandSeparator value={allbed_lower} />
            </td>
            <td className="tx-medium text-right">
                <NumberFormat displayType={'text'} thousandSeparator value={mobilab_mean} />
            </td>
        </tr>
    );
};

const ResourceUseDistricts = props => {
    const { tableData } = props;
    return (
        <div className="table-responsive">
            {tableData.length > 0
            && (
            <table className="table table-dashboard mg-b-0">
                <thead>
                    <tr>
                        <th>District</th>
                        <th>Code</th>
                        <th className="text-right">All Beds</th>
                        <th className="text-right">ICU Beds</th>
                        <th className="text-right">Bed Shortages</th>
                        <th className="text-right">Mobile Labs</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(data => <TableRow key={data.district_id} {...data} />)}
                </tbody>
            </table>)}
        </div>
    );
};

export default ResourceUseDistricts;
