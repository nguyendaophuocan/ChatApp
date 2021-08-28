import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { removeUser } from "../features/userSlice";
import { useDispatch } from "react-redux";

function Header() {
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const onSignOut = () => {
    if (user) {
      auth.signOut();
    }
    dispatch(removeUser());
  };
  return (
    <HeaderContainer>
      {/* Header left */}
      <HeaderLeft>
        <HeaderAvatar
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
          alt={user?.displayName}
          src={user?.photoURL}
          //Todo : Add onclick
        />
        <MenuContainer>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => {
              setAnchorEl(false);
            }}
            PaperProps={{
              style: {
                marginTop: "40px",
              },
            }}
          >
            <MenuItem onClick={() => {}}>Profile</MenuItem>
            <MenuItem onClick={() => {}}>My account</MenuItem>
            <MenuItem onClick={onSignOut}>Logout</MenuItem>
          </Menu>
        </MenuContainer>
        <AccessTimeIcon />
      </HeaderLeft>
      {/* Header middle */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search"></input>
      </HeaderSearch>
      {/* Header right */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;
const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
`;
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;
const MenuContainer = styled.div`
  > .MuiPaper-root {
    top: 0 !important;
  }
`;
