import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import SearchIcon from "@mui/icons-material/Search";
import clipArt from "../images/clipArtWelcome.png";
import { firebase } from "../config";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";

// Define functional component ManageBusinesses

export default function ManageBusinesses() {
    // Initialize state variables to store data counts and lists

  const [usersList, setUsersList] = useState([]);
  const [businessesList, setBusinessesList] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [businessesCount, setBusinessesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0); 
  const [user] = useAuthState(firebase.auth());

    // useEffect hook to fetch data when the component mounts or when the user changes

  useEffect(() => {
    const fetchData = async () => {
            // Fetch users data

      try {
        const usersRef = firebase.firestore().collection("Users");
        const snapshot = await usersRef.get();

        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          surname: doc.data().surname,
          email: doc.data().email,
          phone: doc.data().phone,
          location: doc.data().location,
          actions: ["Block User", "View Details"],
        }));
        setUsersList(usersData);
        setUsersCount(snapshot.size);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      // Fetch businesses data

      try {
        const businessesRef = firebase.firestore().collection("Business");
        const businessesSnapshot = await businessesRef.get();
        const businessesData = businessesSnapshot.docs.map((doc) => ({
          id: doc.id,
          businessName: doc.data().businessName,
          regNumber: doc.data().regNumber,
          businessType: doc.data().selectedBusinessType,
          industry: doc.data().selectedIndustry,
          actions: ["Some Action"],
        }));
        setBusinessesList(businessesData);
        setBusinessesCount(businessesSnapshot.size);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
      // Fetch products count

      try {
        const productsRef = firebase.firestore().collection("Products");
        const productsSnapshot = await productsRef.get();
        setProductsCount(productsSnapshot.size);
      } catch (error) {
        console.error("Error fetching products:", error);
      }

      try {
        const ordersRef = firebase.firestore().collection("Orders");
        const ordersSnapshot = await ordersRef.get();
        setOrdersCount(ordersSnapshot.size);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    // Check if user is authenticated before fetching data

    if (user) {
      fetchData();
    }
  }, [user]);

  // Return JSX for rendering the dashboard

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          height: "20vh",
          backgroundColor: "#072840",
          display: "flex",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${clipArt})`,
            width: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "120% 50%",
            backgroundSize: "50%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: 30,
              fontWeight: 600,
              paddingLeft: 2,
            }}
          >
            WELCOME TO AMS
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          height: "80vh",
        }}
      >
        <Box
          sx={{
            ml: 4,
            mt: 4,
            border: "none",
            borderBottom: "1px lightgray solid",
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>DASHBOARD</Typography>
        </Box>
        {/* Render statistics for sales, new businesses, new users, and new products */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            ml: 4,
            mt: 8,
          }}
        >
                  {/* Render statistics boxes */}

          <Box
            sx={{
              width: "100px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ color: "gray", fontSize: 12 }}>Sales</Typography>
            <Typography sx={{ fontWeight: 400, fontSize: 20 }}>{ordersCount}</Typography>
          </Box>

          <Box
            sx={{
              width: "100px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ color: "gray", fontSize: 12 }}>
              New Businesses
            </Typography>
            <Typography sx={{ fontWeight: 400, fontSize: 20 }}>{businessesCount}</Typography>
          </Box>

          <Box
            sx={{
              width: "100px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ color: "gray", fontSize: 12 }}>
              New Users
            </Typography>
            <Typography sx={{ fontWeight: 400, fontSize: 20 }}> {usersCount}</Typography>
          </Box>

          <Box
            sx={{
              width: "100px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ color: "gray", fontSize: 12 }}>
              New Products
            </Typography>
            <Typography sx={{ fontWeight: 400, fontSize: 20 }}>{productsCount}</Typography>
          </Box>
        </Box>
          {/* Render grids for new users and new businesses */}


        <Grid container sx={{ mt: 2 }}>
          <Grid
            item
            xs={6}
            sx={{ p: 2, border: "none", borderRight: "1px lightgray solid" }}
          >
            <Box
              sx={{
                border: "none",
                borderBottom: "1px lightgray solid",
                ml: 2,
                
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>NEW USERS</Typography>
            </Box>
            {/* Render table headers */}

            <Grid
              container
              sx={{
                backgroundColor: "#fafafa",
                display: "flex",
                flexDirection: "row",
                
                mt: 2,
                pt: 2,
                pb: 2,
                border: "none",
                borderBottom: "1px lightgray solid",
              }}
            >
              <Grid
                item
                xs={12 / 5}
                sx={{
                  pl: 2,
                  pr: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "none",
                  borderRight: "1px lightgray solid",
                }}
              >
                <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
                  Name
                </Typography>
                <Typography
                  sx={{
                    color: "gray",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <UnfoldMoreIcon sx={{ fontSize: 17 }} />
                  <SearchIcon sx={{ fontSize: 17 }} />
                </Typography>
              </Grid>

              <Grid
                item
                xs={12 / 5}
                sx={{
                  pl: 2,
                  pr: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "none",
                  borderRight: "1px lightgray solid",
                }}
              >
                <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
                  Surname
                </Typography>
                <Typography
                  sx={{
                    color: "gray",
                  }}
                >
                  <UnfoldMoreIcon sx={{ fontSize: 17 }} />
                </Typography>
              </Grid>

              <Grid
                item
                xs={12 / 5}
                sx={{
                  pl: 2,
                  pr: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "none",
                  borderRight: "1px lightgray solid",
                }}
              >
                <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
                  Phone
                </Typography>
                <Typography
                  sx={{
                    color: "gray",
                  }}
                >
                  <UnfoldMoreIcon sx={{ fontSize: 17 }} />
                </Typography>
              </Grid>

              <Grid
                item
                xs={12 / 5}
                sx={{
                  pl: 2,
                  pr: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "none",
                  borderRight: "1px lightgray solid",
                }}
              >
                <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
                  Email
                </Typography>
                <Typography
                  sx={{
                    color: "gray",
                  }}
                >
                  <UnfoldMoreIcon sx={{ fontSize: 17 }} />
                </Typography>
              </Grid>

              <Grid
                item
                xs={12 / 5}
                sx={{
                  pl: 2,
                  pr: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
                  Location
                </Typography>
                <Typography
                  sx={{
                    color: "gray",
                  }}
                >
                  <UnfoldMoreIcon sx={{ fontSize: 17 }} />
                </Typography>
              </Grid>
            </Grid>

            {usersList.length === 0 ? (
                            // If no users, display loading indicator

                            
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "20vh",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
                            // If users exist, map through them and display in a grid

              usersList.map((user) => (
                <Grid
                  container
                  key={user.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    border: "none",
                    borderBottom: "1px lightgray solid",
    
                    mt: 4,
                  }}
                >
                  <Grid
                    item
                    xs={12 / 5}
                    sx={{
                      pl: 2,
                      pr: 2,
                      
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        display: "flex",
                  
                      }}
                      noWrap
                    >
                      {user.name}
                    </Typography>
                  </Grid>

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
                      {user.surname}
                    </Typography>
                  </Grid>

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
                      {user.phone}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12 / 5}
                    sx={{
                      pl: 2,
                      display: "flex",
                      alignItems: "center",
                      //border: "1px red solid",
                    }}
                  >
                    <Typography sx={{ fontSize: 14 }} noWrap>
                      {user.email}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12 / 5}
                    sx={{
                      pl: 1,
                      display: "flex",
                      //border: "1px red solid",
                    }}
                  >
                    <Typography sx={{ fontSize: 14 }} noWrap>
                      {user.location}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            )}
          </Grid>

          <Grid item xs={6} sx={{ p: 2 }}>
            <Box
              sx={{
                border: "none",
                borderBottom: "1px lightgray solid",
                ml: 2,
                //mt: 4,
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>NEW BUSINESSES</Typography>
            </Box>

            <Grid
              container
              sx={{
                backgroundColor: "#FAFAFA",
                display: "flex",
                flexDirection: "row",
                ml: 0,
                mt: 2,
                pt: 2,
                pb: 2,
                border: "none",
                borderBottom: "1px lightgray solid",
              }}
            >
              <Grid
                item
                xs={3}
                sx={{
                  pl: 2,
                  pr: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "none",
                  borderRight: "1px lightgray solid",
                }}
              >
                <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
                  Business Name
                </Typography>
                <Typography
                  sx={{
                    color: "gray",
                  }}
                >
                  <UnfoldMoreIcon sx={{ fontSize: 17 }} />
                  <SearchIcon sx={{ fontSize: 17 }} />
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sx={{
                  pl: 2,
                  pr: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "none",
                  borderRight: "1px lightgray solid",
                }}
              >
                <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
                  Reg Number
                </Typography>
                <Typography
                  sx={{
                    color: "gray",
                  }}
                >
                  <UnfoldMoreIcon sx={{ fontSize: 17 }} />
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sx={{
                  pl: 2,
                  pr: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "none",
                  borderRight: "1px lightgray solid",
                }}
              >
                <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
                  Type of Business
                </Typography>
                <Typography
                  sx={{
                    color: "gray",
                  }}
                >
                  <UnfoldMoreIcon sx={{ fontSize: 17 }} />
                </Typography>
              </Grid>
          {/* Grid for new businesses */}

              <Grid
                item
                xs={3}
                sx={{
                  pl: 2,
                  pr: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
                  Industry
                </Typography>
                <Typography
                  sx={{
                    color: "gray",
                  }}
                >
                  <UnfoldMoreIcon sx={{ fontSize: 17 }} />
                </Typography>
              </Grid>
            </Grid>

            {businessesList.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "20vh",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              businessesList.map((business) => (
                <Grid
                  container
                  key={business.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    border: "none",
                    borderBottom: "1px lightgray solid",
                    ml: 0,
                    mt: 4,
                  }}
                >
                  <Grid
                    item
                    xs={3}
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

                  <Grid
                    item
                    xs={3}
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

                  <Grid
                    item
                    xs={3}
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

                  <Grid
                    item
                    xs={3}
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
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
