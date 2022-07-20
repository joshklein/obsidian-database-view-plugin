import * as React from "react";
import CsvButton from "components/CsvButton";
import { NavBarProps } from "cdm/MenuBarModel";
import GlobalFilter from "components/reducers/GlobalFilter";
import { NavBarConfig, StyleVariables } from "helpers/Constants";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { c } from "helpers/StylesHelper";
import MenuIcon from "components/img/MenuIcon";

export function NavBar(navBarProps: NavBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{
        top: 0,
        alignSelf: "flex-start",
        zIndex: 1,
      }}
    >
      <AppBar
        position="static"
        style={{
          color: StyleVariables.TEXT_MUTED,
          backgroundColor: StyleVariables.BACKGROUND_SECONDARY,
          boxShadow: "none",
          position: "fixed",
          left: 0,
          width: "calc(100% - 20px)",
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            onBlur={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: NavBarConfig.ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
          >
            <MenuItem>
              {/* CSV buttton download */}
              <CsvButton {...navBarProps.csvButtonProps} />
            </MenuItem>
          </Menu>
          {/** Global filter */}
          <GlobalFilter {...navBarProps.globalFilterRows} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
export function HeaderNavBar(props: NavBarProps) {
  return (
    <div
      key="div-navbar-header-row"
      className={`${c("tr navbar")}`}
      {...props.headerGroupProps}
    >
      <div className={`${c("th navbar")}`} key="div-navbar-header-cell">
        <NavBar {...props} />
      </div>
    </div>
  );
}
