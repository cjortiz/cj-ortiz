import { useState } from "react";
import { CommonCardLayout } from "./layout-card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  AboutTab,
  BlogTab,
  ContactTab,
  PortfolioTab,
  ResumeTab,
} from "../tabs";

export const RightPanel = () => {
  const rightPanelFooter = <div></div>;

  const [value, setValue] = useState<string>("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const contentHandler = () => {
    switch (value) {
      case "1":
        return <AboutTab />;
      case "2":
        return <ResumeTab />;
      case "3":
        return <PortfolioTab />;
      case "5":
        return <ContactTab />;
    }
  };

  const rightTabsArr = [
    {
      val: "1",
      label: "About",
    },
    {
      val: "2",
      label: "Resume",
    },
    {
      val: "3",
      label: "Portfolio",
    },

    {
      val: "5",
      label: "Contact",
    },
  ];

  return (
    <CommonCardLayout isLeft={false} footer={rightPanelFooter}>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          sx={{
            "& .MuiTab-root": {
              outline: "none",
              boxShadow: "none",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
                color: "#ffbe26",
              },
              "&:focus-visible": {
                outline: "none",
                boxShadow: "none",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#ffbe26",
              color: "#ffbe26",
            },
          }}
          style={{
            width: "50  %",
            backgroundColor: "#282828",
            borderBottomLeftRadius: 8,
            borderTopRightRadius: 20,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          {rightTabsArr.map((obj) => {
            return (
              <Tab
                value={obj.val}
                label={obj.label}
                sx={{
                  fontFamily: "'Manrope', sans-serif", // or 'Gilroy' if licensed
                  fontWeight: 600,
                  fontSize: "14px",
                  textTransform: "none",
                  marginLeft: 2,
                  marginRight: 2,
                }}
              />
            );
          })}
        </Tabs>
      </div>
      {contentHandler()}
    </CommonCardLayout>
  );
};
