import React, { Fragment } from "react";

import {
  Card,
  Box,
  Avatar,
  CardContent,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

import banner from "../assets/banner.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import collage from "../assets/collage.png";

//********Imagenes de los desarrolladores********** */
import Cristian from "../assets/Cristian.jpeg";
import Edwar from "../assets/Edwar.jpeg";
import jose from "../assets/jose.jpeg";
import Kelly from "../assets/kelly.jpeg";
import Ramiro from "../assets/Ramiro.jpeg";

export default function About() {
  return (
    <Fragment>
      <div name="banner">
        <img src={banner} width="100%" alt="CreatiBook " />
      </div>

      <Box
        className="col-md-11  mx-auto text-center"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            p: 2,
          },
        }}
      >
          <Stack direction="row" spacing={2}>
        <Box className="col" width="100%" sx={{ m: 1 }}>
          <img src={image1} alt="imagen1" />
        </Box>

        <Box className="col" width="100%" sx={{ m: 1 }}>
          <img src={image2} alt="imagen1" />
        </Box>
        <Box className="col" width="100%" sx={{ m: 1 }}>
          <img src={image3} alt="imagen1" />
        </Box>
        </Stack>
      </Box>

      <Box
        className="col-md-11  mx-auto text-center"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            p: 2,
          },
        }}
      >
        <Paper elevation={3}>
          Somos Creatibook, una aplicación web que te brinda la oportunidad de
          mostrar tus talentos y/o habilidades enfocados en la rama artística,
          los cuales no tienes la posibilidad de mostrar en otro lugar, para
          impulsar al máximo tus oportunidades laborales.
        </Paper>
      </Box>

      {/* **************Collage***************** */}

      <Box className="col-md-auto  mx-auto">
        <img src={collage} width="100%" alt="collage" />
      </Box>

      <div className="text-center">
        <h1>Desarrolladores</h1>{" "}
      </div>

      <Box sx={{ mx: 5, mt: 5 }}>
        <Box className="row text-center">
          {/* **************Informacion de Cristian ******************** */}

          <Box className="col-md-2.1  mx-auto ">
            <Card variant="outlined" sx={{ mt: 3 }}>
              <div className="row">
                <div className="col">
                  <Avatar
                    alt="Cristian"
                    src={Cristian}
                    sx={{ width: 56, height: 56, ml: 2, mt: 2.5 }}
                  />
                </div>
                <div className="col">
                  <Box sx={{ mt: 1 }}>
                    <CardContent sx={{ mr: 1 }}>
                      <Typography component="div">Cristian David</Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        component="div"
                      >
                        cirisdavi8@gmail.com
                      </Typography>
                    </CardContent>
                  </Box>
                </div>
              </div>
            </Card>
          </Box>
          {/***********  Informacion de Edwar *******************/}

          <Box className="col-md-2.1  mx-auto">
            <Card variant="outlined" sx={{ mt: 3 }}>
              <div className="row">
                <div className="col">
                  <Avatar
                    alt="Edwar"
                    src={Edwar}
                    sx={{ width: 56, height: 56, ml: 2, mt: 2.5 }}
                  />
                </div>
                <div className="col">
                  <Box sx={{ mt: 1 }}>
                    <CardContent sx={{ mr: 1 }}>
                      <Typography component="div">Edwar Villadiego</Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        component="div"
                      >
                        edwarvilladiego@hotmail.com
                      </Typography>
                    </CardContent>
                  </Box>
                </div>
              </div>
            </Card>
          </Box>
        </Box>

        <Box className="row text-center">
          {/* **************Informacion de Jose ******************** */}
          <Box className="col-md-2.1  mx-auto">
            <Card variant="outlined" sx={{ mt: 3 }}>
              <div className="row">
                <div className="col">
                  <Avatar
                    alt="Jose"
                    src={jose}
                    sx={{ width: 56, height: 56, ml: 2, mt: 2.5 }}
                  />
                </div>
                <div className="col">
                  <Box sx={{ mt: 1 }}>
                    <CardContent sx={{ mr: 1 }}>
                      <Typography component="div">Jose Alfredo</Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        component="div"
                      >
                        morelosjosealfredo@gmail.com
                      </Typography>
                    </CardContent>
                  </Box>
                </div>
              </div>
            </Card>
          </Box>
          {/***********  Informacion de Kelly *******************/}

          <Box className="col-md-2.1  mx-auto">
            <Card variant="outlined" sx={{ mt: 3 }}>
              <div className="row">
                <div className="col">
                  <Avatar
                    alt="Kelly"
                    src={Kelly}
                    sx={{ width: 56, height: 56, ml: 2, mt: 2.5 }}
                  />
                </div>
                <div className="col">
                  <Box sx={{ mt: 1 }}>
                    <CardContent sx={{ mr: 1 }}>
                      <Typography component="div">Kelly Vergara</Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        component="div"
                      >
                        Kellyvergara12@gmail.com
                      </Typography>
                    </CardContent>
                  </Box>
                </div>
              </div>
            </Card>
          </Box>

          {/* ***************Informacion de Ramiro***************** */}
          <Box className="col-md-2.1  mx-auto">
            <Card variant="outlined" sx={{ mt: 3 }}>
              <div className="row">
                <div className="col">
                  <Avatar
                    alt="Ramiro"
                    src={Ramiro}
                    sx={{ width: 56, height: 56, ml: 2, mt: 2.5 }}
                  />
                </div>
                <div className="col">
                  <Box sx={{ mt: 1 }}>
                    <CardContent sx={{ mr: 1 }}>
                      <Typography component="div">Ramiro Vargas</Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        component="div"
                      >
                        ramivar11@hotmail.com
                      </Typography>
                    </CardContent>
                  </Box>
                </div>
              </div>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* ************Pie de pagina************** */}

      <Box className="text-center" sx={{ mt: 5, mb: 2 }}>
        <p>
          Un compromiso total con rezaltar el talento humano y brindar
          oportunidades económicas
        </p>
      </Box>
    </Fragment>
  );
}