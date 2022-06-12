import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BaseCard from "./baseCard/BaseCard";
import DownloadIcon from '@mui/icons-material/Download';

const products = [
  {
    id: "1",
    name: "Garage XYZ",
    speciality: "general mechanic",
    description: "Oil change"
  },
  {
    id: "2",
    name: "Garage XYZ",
    speciality: "general mechanic",
    description: "Oil change"
  },
  {
    id: "3",
    name: "Garage XYZ",
    speciality: "general mechanic",
    description: "Oil change"
  },
  {
    id: "4",
    name: "Garage XYZ",
    speciality: "general mechanic",
    description: "Oil change"
  },
];

const ProductPerfomance = () => {

  const openReport = () => {

  }

  const downloadReport = () => {
    
  }

  return (
    <BaseCard title="Search Report">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Report No
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Contributor
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Description
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.name}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {product.speciality}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.description}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton
                  size="large"
                  color="inherit"
                >
                  <VisibilityIcon width="20" height="20" style={{color:'#000000'}}/>
                </IconButton>
                <IconButton
                  size="large"
                  onClick={downloadReport}
                >
                  <DownloadIcon width="20" height="20" style={{color:'#000000'}}/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default ProductPerfomance;
