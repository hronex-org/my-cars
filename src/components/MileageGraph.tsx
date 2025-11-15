import { useEffect, useMemo, useRef } from 'react';
import type { Service } from '../types/Car';
import CanvasJS from '@canvasjs/charts';
import './MileageGraph.css';

interface MileageGraphProps {
    currentMileage: number;
    services: Service[];
}

export const MileageGraph = ({ currentMileage, services }: MileageGraphProps) => {
    const chartContainerId = useMemo(() => `chartContainer-${Math.random().toString(36).substring(7)}`, []);
    const chartRef = useRef<any>(null);

    useEffect(() => {
        if (services.length === 0) {
            return;
        }

        // Create data points from services
        const points = services
            .map(service => ({
                x: new Date(service.date.split('.').reverse().join('-')),
                y: service.mileage,
                label: `${service.mileage.toLocaleString()} km`,
                indexLabel: `${service.mileage.toLocaleString()} km`,
                toolTipContent: `Datum: {x}<br>Kilometri: {y}km`
            }))
            .sort((a, b) => a.x.getTime() - b.x.getTime());

        // Add current mileage point if it exists
        if (currentMileage && currentMileage > 0) {
            points.push({
                x: new Date(),
                y: currentMileage,
                label: `${currentMileage.toLocaleString()} km`,
                indexLabel: currentMileage + " km",
                toolTipContent: `Datum: {x}<br>Kilometri: {y}km`
            });
        }

        // Create the chart with fixed Y-axis range 0..300000
        const chart = new CanvasJS.Chart(chartContainerId, {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Zgodovina prevoženih kilometrov",
                fontSize: 16
            },
            axisX: {
                title: "Datum",
                valueFormatString: "DD.MM.YYYY",
                labelFormatter: function (e: any) {
                    return new Date(e.value).toLocaleDateString('sl-SI');
                }
            },
            axisY: {
                title: "Kilometri",
                includeZero: true,
                minimum: 0,
                maximum: 300000,
                interval: 50000,
                labelFormatter: function (e: any) {
                    return e.value.toLocaleString() + " km";
                }
            },
            data: [{
                type: "line",
                indexLabelFontSize: 12,
                dataPoints: points,
                markerSize: 8,
                markerType: "circle"
            }]
        });

        // Render the chart and store the reference
        chart.render();
        chartRef.current = chart;

        // Cleanup
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [services, currentMileage, chartContainerId]);

    return (
        <div className="mileage-graph">
            <div id={chartContainerId} style={{ height: "300px", width: "100%", minWidth: "600px" }} />
        </div>
    );
};