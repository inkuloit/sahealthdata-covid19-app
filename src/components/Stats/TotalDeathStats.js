import React, { useState } from 'react';
import moment from 'moment';
import { Card, CardBody } from 'reactstrap';
import { LineChart } from 'components';
import { StatsProvider } from 'providers';

const TotalDeathStats = props => {
    const { query, loaded, province } = props;
    const [stats, setStats] = useState({});
    const [chartData, setChartData] = useState({});
    const [componentLoaded, setComponentLoaded] = useState(false);
    
    const fetchData = async () => {
        if (loaded) {
            const stats = await StatsProvider.get('cases', 'all', query);
            const data = await StatsProvider.get('cases', 'deaths_per_day', query);
            setStats(stats[0]);

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
                        backgroundColor: 'rgba(255,99,132,0.4)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(255,99,132,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(255,99,132,1)',
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
                <div className="card-header pd-t-20 d-sm-flex align-items-start justify-content-between bd-b-0 pd-b-0">
                    <div>
                        <h6 className="mg-b-5">
                            Total Deaths
                            <span className="tx-pink">{province !== 'all' ? ` for ${province}` : ''}</span>
                        </h6>
                        <p className="tx-13 tx-color-03 mg-b-0">Total COVID-19 deaths projected to April 1, 2020</p>
                    </div>
                </div>
                <CardBody className="pd-y-30">
                    <div className="d-sm-flex">
                        <div className="media">
                            <div className="wd-40 wd-md-50 ht-40 ht-md-50 bg-pink tx-white mg-r-10 mg-md-r-10 d-flex align-items-center justify-content-center rounded op-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                            </div>
                            <div className="media-body">
                                <h4 className="tx-20 tx-sm-18 tx-md-24 tx-normal tx-rubik mg-b-0">
                                    {stats.deaths ? stats.deaths : 0}
                                </h4>
                                <h6 className="tx-sans tx-uppercase tx-10 tx-spacing-1 tx-color-03 tx-semibold tx-nowrap mg-b-5 mg-md-b-8">COVID-19 deaths</h6>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardBody className="pd-y-20">
                    <div style={{ position: 'relative', minHeight: 300, width: '100%' }}>
                        <LineChart chartData={chartData} />
                    </div>
                </CardBody>
            </Card>)}
        </React.Fragment>
    );
};

export default TotalDeathStats;
