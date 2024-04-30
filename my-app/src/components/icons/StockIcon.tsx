import React from "react";
import {
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
  Zoom,
} from "@mui/material";

import icon_material from './company_icons/icon_material.png';
import icon_AI from './company_icons/icon_AI.png';
import icon_SIBC from './company_icons/icon_SIBC.png';
import icon_simulation from './company_icons/icon_simulation.png';
import icon_logistics from './company_icons/icon_logistics.png';

const StockIcon = ({ id, size = '40px' }: { id: number; size?: string }) => {
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
  const icons = [
    <img src={icon_material} alt="物質・材料開発機構" style={{ width: size, height: size }}/>,
    <img src={icon_SIBC} alt="SIBC" style={{ width: size, height: size }}/>,
    <img src={icon_logistics} alt="システム物流" style={{ width: size, height: size }} />,
    <img src={icon_simulation} alt="シミュレーションLab" style={{ width: size, height: size }} />,
    <img src={icon_AI} alt="株式会社松井研究所" style={{ width: size, height: size }} />,
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
        </React.Fragment>
      }
    >
      <span>{icons[id]}</span>
    </HtmlTooltip>
  );
};

export default StockIcon;
