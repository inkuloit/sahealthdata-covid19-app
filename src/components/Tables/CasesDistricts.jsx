import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { Card, CardBody } from 'reactstrap';
import { StatsProvider } from 'providers';

const TableRow = props => {
    const {
        district,
        iso_code,
        confirmed,
        new_cases,
        deaths,
        recoveries,
        fatalities,
        district_population,
    } = props;
    // const link = `/projections?d=${district}`;
    return (
        <tr>
            <td className="align-middle tx-medium">{iso_code.toLowerCase()} {district}</td>
            <td className="text-right">
                <NumberFormat displayType={'text'} thousandSeparator value={confirmed} />
            </td>
            <td className="text-right">
                <NumberFormat displayType={'text'} thousandSeparator value={new_cases} />
            </td>
            <td className="text-right">
                <NumberFormat displayType={'text'} thousandSeparator value={deaths} />
            </td>
            <td className="text-right">
                <NumberFormat displayType={'text'} thousandSeparator value={recoveries} />
            </td>
            <td className="text-right">
                <NumberFormat displayType={'text'} thousandSeparator value={fatalities} />
            </td>
            <td className="align-middle text-right">
            <div className="wd-150 d-inline-block">
                <div className="progress ht-4 mg-b-0">
                <div className="progress-bar bg-teal wd-65p" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            </td>
            <td className="align-middle text-right"><span className="tx-medium">65.35%</span></td>
            <td className="text-right">
                <NumberFormat displayType={'text'} thousandSeparator value={district_population} />
            </td>
            {/* <td className="align-middle text-center">
                <a href={link}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link wd-12 ht-12 stroke-wd-3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </td> */}
        </tr>
    );
};

const CasesDistricts = props => {
    const { view, loaded, query, province } = props;
    const [tableData, setTableData] = useState([]);
    const [componentLoaded, setComponentLoaded] = useState(false);
    
    const fetchData = async () => {
        if (loaded) {
            const tableData = await StatsProvider.get('cases', view, query);
            setTableData(tableData);
            setComponentLoaded(true);
        }
    };

    if (loaded) {
        if (!componentLoaded) {
            fetchData();
        }
    }

    return (
        <React.Fragment>
            {tableData.length > 0
            && (
            <Card className="mg-b-10">
                <div className="card-header d-flex align-items-start justify-content-between">
                    <h6 className="lh-5 mg-b-0">
                        Total COVID-19 Cases and Deaths
                        <span className="tx-teal">{province !== 'all' ? ` for ${province}` : ''}</span>
                    </h6>
                    {/* <a href="/" className="tx-13 link-03">Mar 01 - Mar 20, 2019 <i className="icon ion-ios-arrow-down"></i></a> */}
                </div>
                <CardBody className="pd-y-15 pd-x-10">
                    <div className="table-responsive">
                        <table className="table table-borderless table-sm tx-13 tx-nowrap mg-b-0">
                            <thead>
                                <tr className="tx-10 tx-spacing-1 tx-color-03 tx-uppercase">
                                    <th>District</th>
                                    <th className="text-right">Confirmed</th>
                                    <th className="text-right">New Cases</th>
                                    <th className="text-right">Deaths</th>
                                    <th className="text-right">Recovered</th>
                                    <th className="text-right">Fatalities</th>
                                    <th className="text-right">Percentage (%)</th>
                                    <th className="text-right">Value (%)</th>
                                    <th className="text-right">Population</th>
                                    {/* <th className="wd-5p">Link</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map(data => <TableRow key={data.province_id} {...data} />)}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>)}
        </React.Fragment>
    );
};

export default CasesDistricts;
