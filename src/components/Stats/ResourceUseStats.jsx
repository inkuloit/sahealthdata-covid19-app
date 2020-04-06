import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { Card, CardBody, Col, Row } from 'reactstrap';
import {
    BarChart,
    ResourceUseFacilities,
    ResourceUseDistricts,
    ResourceUseProvinces,
} from 'components';
import { StatsProvider } from 'providers';

const ResourceUseTable = (props) => {
    switch (props.view) {
        case 'facilities': return <ResourceUseFacilities {...props} />
        case 'districts': return <ResourceUseDistricts {...props} />
        case 'provinces': return <ResourceUseProvinces {...props} />
        default: return null;
    }
};

const ResourceUseStats = props => {
    const { view, loaded, query, province } = props;
    const [tableData, setTableData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [componentLoaded, setComponentLoaded] = useState(false);
    const [redraw, setRedraw] = useState(false);
    const [filterTab, setFilterTab] = useState('all');
    
    const fetchData = async () => {
        if (loaded) {
            const labels = [];
            const tableData = await StatsProvider.get('resources', view, query);
            setTableData(tableData);

            if (tableData.length > 0) {
                const allBedsData = [];
                const icuBedsData = [];
                const bedShortData = [];
                const mobiLabsData = [];
                tableData.map(item => {
                    labels.push((view === 'provinces') ? item.iso_code : item.code);
                    allBedsData.push(item.allbed_mean);
                    icuBedsData.push(item.icubed_mean);
                    bedShortData.push(item.allbed_lower);
                    mobiLabsData.push(item.mobilab_mean);
                    return true;
                });
                const chartData = {
                    labels,
                    datasets: [
                        {
                            label: 'All Beds',
                            backgroundColor: 'rgba(1,104,250,0.2)',
                            borderColor: 'rgba(1,104,250,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(1,104,250,0.4)',
                            hoverBorderColor: 'rgba(1,104,250,1)',
                            data: allBedsData,
                        },
                        {
                            label: 'ICU Beds',
                            backgroundColor: 'rgba(253,126,20,0.2)',
                            borderColor: 'rgba(253,126,20,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(253,126,20,0.4)',
                            hoverBorderColor: 'rgba(253,126,20,1)',
                            data: icuBedsData,
                        },
                        {
                            label: 'Bed Shortages',
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: bedShortData,
                        },
                        {
                            label: 'Mobile Labs',
                            backgroundColor: 'rgba(0,204,204,0.2)',
                            borderColor: 'rgba(0,204,204,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(0,204,204,0.4)',
                            hoverBorderColor: 'rgba(0,204,204,1)',
                            data: mobiLabsData,
                        }
                    ]
                };
                if (labels.length > 0) {
                    setChartData(chartData);
                }
            }
            setComponentLoaded(true);
        }
    };

    if (loaded) {
        if (!componentLoaded) {
            fetchData();
        }
    }

    const reDrawChart = (activeTab) => {
        const labels = [];
        const datasets = [];
        const tData = tableData;
        if (tData.length > 0) {
            const allBedsData = [];
            const icuBedsData = [];
            const bedShortData = [];
            const mobiLabsData = [];
            tData.map(item => {
                labels.push((view === 'provinces') ? item.iso_code : item.code);
                if (activeTab === 'all' || activeTab === 'allbed_mean')
                    allBedsData.push(item.allbed_mean);
                if (activeTab === 'all' || activeTab === 'icubed_mean')
                    icuBedsData.push(item.icubed_mean);

                bedShortData.push(item.allbed_lower);
                if (activeTab === 'all' || activeTab === 'mobilab_mean')
                    mobiLabsData.push(item.mobilab_mean);
                return true;
            });

            // all beds
            if (activeTab === 'all' || activeTab === 'allbed_mean') {
                datasets.push({
                    label: 'All Beds',
                    backgroundColor: 'rgba(1,104,250,0.2)',
                    borderColor: 'rgba(1,104,250,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(1,104,250,0.4)',
                    hoverBorderColor: 'rgba(1,104,250,1)',
                    data: allBedsData,
                });
            }

            // icu beds
            if (activeTab === 'all' || activeTab === 'icubed_mean') {
                datasets.push({
                    label: 'ICU Beds',
                    backgroundColor: 'rgba(253,126,20,0.2)',
                    borderColor: 'rgba(253,126,20,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(253,126,20,0.4)',
                    hoverBorderColor: 'rgba(253,126,20,1)',
                    data: icuBedsData,
                });
            }
            
            // bed shortages
            datasets.push({
                label: 'Bed Shortages',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: bedShortData,
            });

            // mobile labs
            if (activeTab === 'all' || activeTab === 'mobilab_mean') {
                datasets.push({
                    label: 'Mobile Labs',
                    backgroundColor: 'rgba(0,204,204,0.2)',
                    borderColor: 'rgba(0,204,204,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(0,204,204,0.4)',
                    hoverBorderColor: 'rgba(0,204,204,1)',
                    data: mobiLabsData,
                });
            }

            const chartData = { labels, datasets };

            if (labels.length > 0) {
                setChartData(chartData);
                setRedraw(true);
            }
        }
    };

    return (
        <Card className="mg-b-10">
            <div className="card-header pd-t-20 d-sm-flex align-items-start justify-content-between bd-b-0 pd-b-0">
                <div>
                    <h6 className="mg-b-5">
                        Hospital Resource Use Stats
                        <span className="tx-primary">{province !== 'all' ? ` for ${province}` : ''}</span>
                    </h6>
                    <p className="tx-13 tx-color-03 mg-b-0">Resources needed for COVID-19 patients</p>
                </div>
                <div className="d-flex mg-t-20 mg-sm-t-0">
                    <div className="btn-group flex-fill">
                        <button
                            className={`btn btn-white btn-uppercase btn-xs ${filterTab === 'all' ? 'active' : ''}`}
                            onClick={() => {
                                setFilterTab('all');
                                reDrawChart('all');
                            }}
                        >
                            All Resources
                        </button>
                        <button
                            className={`btn btn-white btn-uppercase btn-xs ${filterTab === 'allbed_mean' ? 'active' : ''}`}
                            onClick={() => {
                                setFilterTab('allbed_mean');
                                reDrawChart('allbed_mean');
                            }}
                        >
                            All Beds
                        </button>
                        <button
                            className={`btn btn-white btn-uppercase btn-xs ${filterTab === 'icubed_mean' ? 'active' : ''}`}
                            onClick={() => {
                                setFilterTab('icubed_mean');
                                reDrawChart('icubed_mean');
                            }}
                        >
                            ICU Beds
                        </button>
                        <button
                            className={`btn btn-white btn-uppercase btn-xs ${filterTab === 'mobilab_mean' ? 'active' : ''}`}
                            onClick={() => {
                                setFilterTab('mobilab_mean');
                                reDrawChart('mobilab_mean');
                            }}
                        >
                            Mobile Labs
                        </button>
                    </div>
                </div>
            </div>
            <CardBody className="pd-lg-25">
                <Row className="align-items-sm-end">
                    <Col lg={7} xl={8}>
                        {componentLoaded
                        && (
                        <div className="pd-lg-5" style={{ position: 'relative', minHeight: 300, width: '100%' }}>
                            <BarChart
                                chartData={chartData}
                                redraw={redraw}
                                setRedraw={setRedraw}
                            />
                        </div>)}
                    </Col>
                    <Col lg={5} xl={4}>
                        <Row>
                            <Col sm={6} lg={12}>
                                <div className="d-flex align-items-center justify-content-between mg-b-5">
                                    <h6 className="tx-uppercase tx-10 tx-spacing-1 tx-color-02 tx-semibold mg-b-0">All Beds</h6>
                                    <span className="tx-10 tx-color-04">Projected</span>
                                </div>
                                <div className="d-flex align-items-end justify-content-between mg-b-5">
                                    <h5 className="tx-normal tx-rubik lh-2 mg-b-0">
                                        <NumberFormat displayType={'text'} thousandSeparator value={props.allbed_mean ? props.allbed_mean : 0} />
                                    </h5>
                                    <h6 className="tx-normal tx-rubik tx-color-03 lh-2 mg-b-0">0</h6>
                                </div>
                                <div className="progress ht-4 mg-b-0 op-5">
                                    <div className="progress-bar bg-primary wd-100p" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </Col>
                            <Col sm={6} lg={12} className="mg-t-30 mg-sm-t-0 mg-lg-t-30">
                                <div className="d-flex align-items-center justify-content-between mg-b-5">
                                    <h6 className="tx-uppercase tx-10 tx-spacing-1 tx-color-02 tx-semibold mg-b-0">ICU Beds</h6>
                                    <span className="tx-10 tx-color-04">Projected</span>
                                </div>
                                <div className="d-flex align-items-end justify-content-between mg-b-5">
                                    <h5 className="tx-normal tx-rubik lh-2 mg-b-0">
                                        <NumberFormat displayType={'text'} thousandSeparator value={props.icubed_mean ? props.icubed_mean : 0} />
                                    </h5>
                                    <h6 className="tx-normal tx-rubik tx-color-03 lh-2 mg-b-0">0</h6>
                                </div>
                                <div className="progress ht-4 mg-b-0 op-5">
                                    <div className="progress-bar bg-orange wd-45p" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </Col>
                            <Col sm={6} lg={12} className="mg-t-30 mg-sm-t-0 mg-lg-t-30">
                                <div className="d-flex align-items-center justify-content-between mg-b-5">
                                    <h6 className="tx-uppercase tx-10 tx-spacing-1 tx-color-02 tx-semibold mg-b-0">Bed Shortages</h6>
                                    <span className="tx-10 tx-color-04">Projected</span>
                                </div>
                                <div className="d-flex align-items-end justify-content-between mg-b-5">
                                    <h5 className="tx-normal tx-rubik lh-2 mg-b-0">
                                        <NumberFormat displayType={'text'} thousandSeparator value={props.allbed_lower ? props.allbed_lower : 0} />
                                    </h5>
                                    <h6 className="tx-normal tx-rubik tx-color-03 lh-2 mg-b-0">0</h6>
                                </div>
                                <div className="progress ht-4 mg-b-0 op-5">
                                    <div className="progress-bar bg-pink wd-20p" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </Col>
                            <Col sm={6} lg={12} className="mg-t-30 mg-sm-t-0 mg-lg-t-30">
                                <div className="d-flex align-items-center justify-content-between mg-b-5">
                                    <h6 className="tx-uppercase tx-10 tx-spacing-1 tx-color-02 tx-semibold mg-b-0">Mobile Labs</h6>
                                    <span className="tx-10 tx-color-04">&nbsp;</span>
                                </div>
                                <div className="d-flex align-items-end justify-content-between mg-b-5">
                                    <h5 className="tx-normal tx-rubik lh-2 mg-b-0">
                                        <NumberFormat displayType={'text'} thousandSeparator value={props.mobilab_mean ? props.mobilab_mean : 0} />
                                    </h5>
                                    <h6 className="tx-normal tx-rubik tx-color-03 lh-2 mg-b-0">&nbsp;</h6>
                                </div>
                                <div className="progress ht-4 mg-b-0 op-5">
                                    <div className="progress-bar bg-teal wd-100p" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
            <ResourceUseTable tableData={tableData} view={view} />
        </Card>
    );
}

export default ResourceUseStats;
