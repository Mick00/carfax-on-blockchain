import styled from "@emotion/styled";
import Account from "../Account";
import { Box, Divider, Stack } from "@mui/material";
import Balance from "../Balance";
import { useWeb3React } from "@web3-react/core";
import { useCOBApi } from "../COBProvider";

const Root = styled(Stack)(({theme}) => ({
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end'
}))

function Topbar() {
    const {account, isActive} = useWeb3React()
    const {token} = useCOBApi();
    return (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"end"}
        spacing={1}
        padding={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {isActive && <Balance token={token().address} account={account?? ""}/>}
        <Account/>
      </Stack>)
}
export default Topbar;
