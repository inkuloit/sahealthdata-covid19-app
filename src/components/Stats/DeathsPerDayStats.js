import React, { useState } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { LineChart } from 'components';
import { StatsProvider } from 'providers';

const DeathsPerDayStats = props => {
    const { query, loaded, province } = props;
    const [chartData, setChartData] = useState({});
    const [componentLoaded, setComponentLoaded] = useState(false);

    const fetchData = async () => {
        if (loaded) {
            const data = await StatsProvider.get('cases', 'deaths_per_day', query);

            if (data.length > 0) {
                const labels = [];
                const datasetData = [];
                data.map(item => {
                    var caseDate = moment(item.case_date).format("MMM DD");
                    labels.push(caseDate);
                    datasetData.push(item.actual_deaths);
                    return null;
                });
                const chartData = {
                    labels,
                    datasets: [{
                        label: 'Actual Deaths',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(1,104,250,0.4)',
                        borderColor: 'rgba(1,104,250,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(1,104,250,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(1,104,250,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: datasetData,
                    }],
                };
                setChartData(chartData);
            }
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
            {componentLoaded
            && (
            <Card className="mg-b-10">
                <div className="card-header pd-y-20 d-md-flex align-items-center justify-content-between">
                    <h6 className="mg-b-5">
                        Deaths Per Day
                        <span className="tx-pink">{province !== 'all' ? ` for ${province}` : ''}</span>
                    </h6>
                    <ul className="list-inline d-flex mg-t-20 mg-sm-t-10 mg-md-t-0 mg-b-0">
                        <li className="list-inline-item d-flex align-items-center">
                            <span className="d-block wd-10 ht-10 bg-df-1 rounded mg-r-5"></span>
                            <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">Actual</span>
                        </li>
                        {/* <li className="list-inline-item d-flex align-items-center mg-l-5">
                            <span className="d-block wd-10 ht-10 bg-df-2 rounded mg-r-5"></span>
                            <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">Actual</span>
                        </li> */}
                        <li className="list-inline-item d-flex align-items-center mg-l-5">
                            <span className="d-block wd-10 ht-10 bg-df-3 rounded mg-r-5"></span>
                            <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">Projected</span>
                        </li>
                    </ul>
                </div>
                <CardBody className="pos-relative">
                    <div>
                        <Row>
                            <Col sm={5}>
                                <h3 className="tx-normal tx-rubik tx-spacing--2 mg-b-5">
                                    <NumberFormat displayType={'text'} thousandSeparator value={0} />
                                </h3>
                                <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-10">Days</h6>
                                <p className="mg-b-0 tx-12 tx-color-03">Until peak count of daily deaths.</p>
                            </Col>
                            <Col sm={5} className="mg-t-20 mg-sm-t-0">
                                <h3 className="tx-normal tx-rubik tx-spacing--2 mg-b-5">
                                    <NumberFormat displayType={'text'} thousandSeparator value={0} />
                                </h3>
                                <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-10">COVID-19 deaths</h6>
                                <p className="mg-b-0 tx-12 tx-color-03">Projected on April 1, 2020.</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="mg-t-30" style={{ position: 'relative', minHeight: 300, width: '100%' }}>
                        <LineChart chartData={chartData} />
                    </div>
                </CardBody>
            </Card>)}
        </React.Fragment>
    );
}

export default DeathsPerDayStats;
