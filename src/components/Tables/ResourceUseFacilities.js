import React from 'react';
import NumberFormat from 'react-number-format';

const TableRow = props => {
    const {
        district,
        subdistrict,
        facility_level,
        facility,
        allbed_mean,
        icubed_mean,
        iso_code,
    } = props;

    return (
        <tr>
            <td><strong>{district}</strong></td>
            <td className="tx-color-03">{subdistrict}</td>
            <td className="tx-color-03">{facility_level}</td>
            <td className="tx-color-03 tx-normal">{iso_code.toLowerCase()} {facility}</td>
            <td className="tx-medium text-right">
                <NumberFormat displayType={'text'} thousandSeparator value={allbed_mean} />
            </td>
            <td className="tx-medium text-right">
                <NumberFormat displayType={'text'} thousandSeparator value={icubed_mean} />
            </td>
        </tr>
    );
};

const ResourceUseFacilities = props => {
    const { tableData } = props;
    return (
        <div className="table-responsive">
            {tableData.length > 0
            && (
            <table className="table table-dashboard mg-b-0">
                <thead>
                    <tr>
                        <th>District</th>
                        <th>Sub District</th>
                        <th>Facility Level</th>
                        <th>Facility</th>
                        <th className="text-right">All Beds</th>
                        <th className="text-right">ICU Beds</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(data => <TableRow key={data.facility_id} {...data} />)}
                </tbody>
            </table>)}
        </div>
    );
};

export default ResourceUseFacilities;
