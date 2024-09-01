import colors from "tailwindcss/colors";

const lightAmt = 600;
const darkAmt = 950;

const sum = colors.blue[lightAmt];
const rendite = colors.green[lightAmt];
const auszahlung = colors.orange[lightAmt];
const steuer = colors.red[lightAmt];

export const themeColors = { auszahlung, rendite, sum, steuer };
