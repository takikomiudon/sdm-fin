import React from "react";
import {
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
  Zoom,
} from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ComputerIcon from "@mui/icons-material/Computer";
import PsychologyIcon from "@mui/icons-material/Psychology";

const StockIcon = ({ id }: { id: number }) => {
  const names = [
    "物質・材料開発機構",
    "SIBC",
    "システム物流",
    "シミュレーションLab",
    "株式会社松井研究所",
  ];
  const descriptions = [
    "株価が下がりにくく安定している",
    "イベントによって株価が上下しやすい",
    "バランスが良い",
    "配当金が高い",
    "今後の成長が見込まれる",
  ];
  const dividends = [
    [20, 20, 20, 0], // 物質・材料開発機構
    [0, 20, 0, 0], // SIBC
    [10, 20, 10, 0], // システム物流
    [30, 30, 20, 0], // シミュレーションLab
    [0, 0, 0, 0], // 株式会社松井研究所
  ];

  const icons = [
    <ScienceIcon />,
    <AccountBalanceWalletIcon />,
    <LocalShippingIcon />,
    <ComputerIcon />,
    <PsychologyIcon />,
  ];
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
      TransitionComponent={Zoom}
    />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography color="inherit">{names[id]}</Typography>
          <em>{descriptions[id]}</em>
          <table>
            <tr>配当金</tr>
            <tr>
              <td>1年目</td>
              <td>2年目</td>
              <td>3年目</td>
              <td>4年目</td>
            </tr>
            <tr>
              <td>{dividends[id][0]}</td>
              <td>{dividends[id][1]}</td>
              <td>{dividends[id][2]}</td>
              <td>{dividends[id][3]}</td>
            </tr>
          </table>
        </React.Fragment>
      }
    >
      <span>{icons[id]}</span>
    </HtmlTooltip>
  );
};

export default StockIcon;
