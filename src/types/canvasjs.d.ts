declare module '@canvasjs/charts' {
    interface DataPoint {
        x?: number | Date;
        y: number;
        label?: string;
        toolTipContent?: string;
        indexLabel?: string;
        markerColor?: string;
        markerType?: string;
    }

    interface ChartData {
        type: string;
        indexLabelFontSize?: number;
        dataPoints: DataPoint[];
        showInLegend?: boolean;
        name?: string;
        legendText?: string;
        markerSize?: number;
        markerType?: string;
    }

    interface AxisLabelFormatter {
        (e: { value: any }): string;
    }

    interface ChartAxis {
        title?: string;
        valueFormatString?: string;
        interval?: number;
        intervalType?: string;
        labelFormatter?: AxisLabelFormatter;
        includeZero?: boolean;
        suffix?: string;
    }

    interface ChartOptions {
        theme?: string;
        title?: {
            text: string;
        };
        animationEnabled?: boolean;
        axisX?: ChartAxis;
        axisY?: ChartAxis;
        data: ChartData[];
    }

    class Chart {
        constructor(containerId: string, options: ChartOptions);
        render(): void;
        destroy(): void;
    }

    const CanvasJS: {
        Chart: typeof Chart;
    };

    export default CanvasJS;
}