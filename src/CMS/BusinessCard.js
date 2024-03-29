import React, { useState } from "react";
import { Grid, Typography, Button, Modal, Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// Define the BusinessCard component that displays business details
function BusinessCard({ business }) {
  const [open, setOpen] = useState(false);

    // Log the industry of the business to the console

  console.log("Industry: ", business.industry);
  return (
    <>
          {/* Modal dialog to display detailed business information */}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiBackdrop-root": { backgroundColor: "rgb(0,0,0,0.1)" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ maxWidth: "500px" }}>
          <Box
            sx={{
              backgroundColor: "#072840",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Business Details</Typography>

            <Button
              onClick={() => setOpen(false)}
              variant="text"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                color: "white",
              }}
            >
              <HighlightOffIcon />
            </Button>
          </Box>
          
           {/* Grid to display business information */}
          <Grid container sx={{ backgroundColor: "white", p: 3 }}>
            <Grid item xs={4} sx={{ fontWeight: 700 }} >Business Name:</Grid>
            <Grid item xs={8}>{business.businessName}</Grid>
            <Grid item xs={4} sx={{ fontWeight: 700 }} >Reg Number:</Grid>
            <Grid item xs={8}>{business.regNumber}</Grid>
            <Grid item xs={4} sx={{ fontWeight: 700 }} >Business Type:</Grid>
            <Grid item xs={8}>{business.businessType}</Grid>
            <Grid item xs={4} sx={{ fontWeight: 700 }} >Industry:</Grid>
            <Grid item xs={8}>{business.industry}</Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Grid container to display basic business information */}
      <Grid
        container
        key={business.id}
        sx={{
          display: "flex",
          flexDirection: "row",
          border: "none",
          borderBottom: "1px lightgray solid",
          ml: 2,
          mt: 2,
        }}
      >

                {/* Grid item to display business name */}
        <Grid
          item
          xs={12 / 5}
          sx={{
            pl: 2,
            pr: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 14 }} noWrap>
            {business.businessName}
          </Typography>
        </Grid>

        {/* Grid item to display registration number */}
        <Grid
          item
          xs={12 / 5}
          sx={{
            pl: 2,
            pr: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 14 }} noWrap>
            {business.regNumber}
          </Typography>
        </Grid>

        {/* Grid item to display business type */}
        <Grid
          item
          xs={12 / 5}
          sx={{
            pl: 2,
            pr: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 14 }} noWrap>
            {business.businessType}
          </Typography>
        </Grid>

        {/* Grid item to display industry */}
        <Grid
          item
          xs={12 / 5}
          sx={{
            pl: 2,
            pr: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 14 }} noWrap>
            {business.industry}
          </Typography>
        </Grid>

        {/* Grid item with a button to view detailed business information */}
        <Grid
          item
          xs={12 / 5}
          sx={{
            pl: 1,
            pr: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            variant="text"
            sx={{ textDecoration: "none", color: "#1890ff", fontSize: 14 }}
          >
            View Details
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default BusinessCard;
