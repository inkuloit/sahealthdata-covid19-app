import React, { useState, useEffect } from 'react';
import { Session } from 'bc-react-session';
import { Doughnut } from 'react-chartjs-3';
import { TransactionsService } from 'services';

const user = Session.getSession().payload.user;
const defaultChartData = {
    labels: [
        '',
    ],
    datasets: [{
        data: [100],
        backgroundColor: [
            '#F2F2F2',
        ],
        hoverBackgroundColor: [
            '#F2F2F2',
        ],
    }],
};

function DoughnutChart() {
    const [loaded, setLoaded] = useState(false);
    const [chartData] = useState({
        labels: [
            'Deposits',
            'Withdrawals',
        ],
        datasets: [{
            data: [0, 0],
            backgroundColor: [
                '#23c99d',
                '#112272',
            ],
            hoverBackgroundColor: [
                '#23c99d',
                '#112272',
            ],
        }],
    });

	useEffect(() => {
		const fetchData = async () => {
			if (user) {
                const transactions = await TransactionsService.getCount();
                const x = transactions.filter((item) => item.subtype.indexOf('withdrawal') >= 0);
                const y = transactions.filter((item) => item.subtype.indexOf('deposit') >= 0);
                const withdrawals = x.length > 0 ? parseInt(x[0].count) : 0;
                const deposits = y.length > 0 ? parseInt(y[0].count) : 0;
                chartData.datasets = [{
                    data: [deposits, withdrawals],
                    backgroundColor: [
                        '#23c99d',
                        '#112272',
                    ],
                    hoverBackgroundColor: [
                        '#23c99d',
                        '#112272',
                    ],
                }];
                setLoaded(true);
			}
		};
		fetchData();
    }, [chartData]);

    return (
        <React.Fragment>
            {loaded ?
            <Doughnut
                data={chartData}
                height={500}
                legend={{
                    "display": true,
                    "position": "bottom",
                    "fullWidth": true,
                    "reverse": false,
                }}
            /> :
            <Doughnut
                data={defaultChartData}
                height={500}
                legend={{
                    "display": true,
                    "position": "bottom",
                    "fullWidth": true,
                    "reverse": false,
                }} 
            />}
        </React.Fragment>
    );
}

export default DoughnutChart;