import { Grid } from "@mui/material";
import ProductPerfomance from "../components/ProductPerfomance";

const Tables = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ProductPerfomance />
      </Grid>
    </Grid>
  );
};

export default Tables;
