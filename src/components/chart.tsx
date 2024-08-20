import { ResponsiveLine } from "@nivo/line";

export const Chart = () => {
  const data = [
    {
      id: "Line 1",
      data: [
        { x: 1, y: 100 },
        { x: 2, y: 150 },
        { x: 3, y: 100 },
        { x: 4, y: 250 },
        { x: 5, y: 300 },
      ],
    },
    {
      id: "Line 2",
      data: [
        { x: 1, y: 120 },
        { x: 2, y: 80 },
        { x: 3, y: 240 },
        { x: 4, y: 300 },
        { x: 5, y: 260 },
      ],
    },
    {
      id: "Line 3",
      data: [
        { x: 1, y: 140 },
        { x: 2, y: 10 },
        { x: 3, y: 280 },
        { x: 4, y: 350 },
        { x: 5, y: 20 },
      ],
    },
  ];

  return (
    <div style={{ height: "500px" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
