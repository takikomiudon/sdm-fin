import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import { Log } from "../../types/log";

const Logs = ({ logs }: { logs: Log[] }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [expandedPanel, setExpandedPanel] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  }

  const handlePanelChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : false);
  }

  return (
    <div className="m-10">
      <h2>取引履歴</h2>
      {logs.map((log, index) => (
        <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            {log.year}年目第{log.period}期
          </AccordionSummary>
          <AccordionDetails>
            {log.logs.map((playerLog, index) => (
              <Accordion key={index} expanded={expandedPanel === `panel${index}`} onChange={handlePanelChange(`panel${index}`)}>
                <AccordionSummary expandIcon={<ExpandMore />}>{playerLog.playerName}</AccordionSummary>
                {playerLog.logs.map((stockLog, index) => (
                  <AccordionDetails key={index}>
                    {stockLog.stockType}を{stockLog.isBuy ? "購入" : "売却"}しました。価格:
                    {stockLog.price} 数量:{stockLog.quantity}
                  </AccordionDetails>
                ))}
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Logs;
