import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Circle,
  GolfCourse,
  ReportProblemRounded,
  SportsScore,
} from "@mui/icons-material";
import { renderToString } from "react-dom/server";
import axios from "../../../../api/axios";
const Home = () => {
  const token = decodeJwt(localStorage.token);
  const [mapKey, setMapKey] = useState(0);
  const limpiarUbicaciones = () => {
    setLocationsNoVisitados([]);
    setLocationsVisitados([]);
    setMapKey((prevKey) => prevKey + 1); // Cambiar la clave para refrescar el MapContainer
  };
  let [locationsVisitados, setLocationsVisitados] = useState([]);
  let [locationsNoVisitados, setLocationsNoVisitados] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionAgente, setSelectedOptionAgente] = useState(null);
  const [datos, setDatos] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const [contadorPedidos, setContadorPedidos] = useState(0);
  const [contadorPedidosTriangulo, setContadorPedidosTriangulo] = useState(0);

  const [contadorFacturas, setContadorFacturas] = useState(0);
  const [contadorFacturasTriangulo, setContadorFacturasTriangulo] = useState(0);
  const [contadorRecibo, setContadorRecibo] = useState(0);
  const [contadorReciboTriangulo, setContadorReciboTriangulo] = useState(0);

  const [contadorNovedades, setContadorNovedades] = useState(0);
  const [contadorNovedadesTriangulo, setContadorNovedadesTriangulo] =
    useState(0);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const [selectedValue, setSelectedValue] = useState("1");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setSelectedOption(null);
    setSelectedOptionAgente(null);
    setContadorPedidos(0);
    setContadorNovedades(0);
    setContadorNovedadesTriangulo(0);
    setContadorPedidosTriangulo(0);
    setContadorFacturas(0);
    setContadorFacturasTriangulo(0);
    setContadorRecibo(0);
    setContadorReciboTriangulo(0);
    limpiarUbicaciones();
  };
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 5);
  // Formatea la fecha en formato "YYYY-MM-DD" para el atributo min del campo de fecha
  const minDate = currentDate.toISOString().split("T")[0];
  // Formatea la fecha actual en formato "YYYY-MM-DD" para el atributo max del campo de fecha
  const maxDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verifica si hay una opción seleccionada
        if (selectedOption) {
          // console.log(localStorage.token);
          // const token =
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Y21DbGllbnRlIjowLCJ1Y21Db2RpZ28iOjI2OTAwMTY3NzIsInVjbUNvbmZpZ3VyYSI6MCwidWNtRW1wcmVzYSI6MiwidWNtSWQiOiIwODQxIiwidWNtTm9tYnJlIjoiR0FMTEVHT1MgTUVORElFVEEgSk9ITiBTRUJBU1RJQU4iLCJ1Y21OdWV2YVZlcnNpb24iOiIyNyIsInVjbVNlcnZpZG9yIjoiY21vdmlsMi5jZWx5YXNhLmNvbSIsInVjbVZlcnNpb24iOiIyNyIsInVjbUluYWN0aXZvIjowLCJ1Y21Nb2R1bG8iOjEsInVjbUFnZUNvZGlnbyI6NDI1MDAxODU1MywidWNtQWxtQ29kaWdvIjo0MjUsImlhdCI6MTY5OTg5NzM5OCwiZXhwIjoxNzAyNDg5Mzk4fQ.iO_02690xXQTktzH67P6n87E-QIBoOPdQIpd-YfC8WA";

          // Utiliza el código del almacén seleccionado como parámetroEntrada
          const parametroEntrada = selectedOption.UAG_ALMACEN;
          console.log(parametroEntrada, parseInt(selectedValue));

          // Utiliza axios.get para hacer la solicitud a tu API
          const response = await axios.get(
            `api/cmovilv3/usrcmovil/obtener/agente/${parametroEntrada}/${parseInt(
              selectedValue
            )}`,
            {
              headers: {
                // Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          // Almacena los datos obtenidos en el estado
          setSelectedOptionAgente(null);
          setDatos(response.data);
        }
      } catch (error) {
        // console.error("Error al obtener los datos:", error);
        setDatos(null);
        setSelectedOptionAgente(null);
      }
    };

    fetchData();
  }, [selectedOption]);

  const MuiCircleIcon = (color, icono, tipoDistancia, lonLista, tipoOpcion) =>
    L.divIcon({
      className: "",
      iconSize: [30, 30], // Ajusta el tamaño del icono
      html: renderToString(
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {selectedValue == 1 ? (
            icono == 0 ? (
              <GolfCourse
                fontSize="small"
                style={{ color: "#009FE3", fontSize: "30px" }}
              />
            ) : icono == lonLista - 1 ? (
              <SportsScore fontSize="large" style={{ fontSize: "20px" }} />
            ) : tipoDistancia == 1 ? (
              <ReportProblemRounded
                fontSize="medium"
                style={{
                  color: tipoOpcion == 0 ? "#009640" : "#FFFF00",
                  fontSize: "15px",
                }}
              />
            ) : (
              <Circle
                fontSize="small"
                style={{
                  color: tipoOpcion == 0 ? "#009640" : "#FFFF00",
                  fontSize: "10px",
                }}
              />
            )
          ) : icono == 0 ? (
            <GolfCourse
              fontSize="small"
              style={{ color: "#009FE3", fontSize: "30px" }}
            />
          ) : icono == lonLista - 1 ? (
            <SportsScore fontSize="large" style={{ fontSize: "20px" }} />
          ) : tipoDistancia == 1 ? (
            <ReportProblemRounded
              fontSize="medium"
              style={{
                color:
                  tipoOpcion === "RECIBO"
                    ? "#00C1FF"
                    : tipoOpcion === "FACTURA"
                    ? "#009640"
                    : "#FFED00",
                fontSize: "15px",
              }}
            />
          ) : (
            <Circle
              fontSize="small"
              style={{
                color:
                  tipoOpcion === "RECIBO"
                    ? "#00C1FF"
                    : tipoOpcion === "FACTURA"
                    ? "#009640"
                    : "#FFED00",
                fontSize: "10px",
              }}
            />
          )}
        </div>
      ),
    });

  const MuiCircleIconNoVisitados = (color) =>
    L.divIcon({
      className: "",
      iconSize: [30, 30], // Ajusta el tamaño del icono
      html: renderToString(
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Circle
            fontSize="small"
            style={{
              color: color,
              fontSize: "10px",
            }}
          />
        </div>
      ),
    });

  const formatearTexto = (cadena) => {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
  };

  const filtrarInformacion = async () => {
    try {
      if (selectedOption != null) {
        if (selectedOptionAgente != null) {
          if (selectedDate.length > 0) {
            const fechaSeleccionada = selectedDate.split("-");
            const fechaFormateada =
              fechaSeleccionada[2] +
              "/" +
              fechaSeleccionada[1] +
              "/" +
              fechaSeleccionada[0];

            // const token =
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Y21DbGllbnRlIjowLCJ1Y21Db2RpZ28iOjI2OTAwMTY3NzIsInVjbUNvbmZpZ3VyYSI6MCwidWNtRW1wcmVzYSI6MiwidWNtSWQiOiIwODQxIiwidWNtTm9tYnJlIjoiR0FMTEVHT1MgTUVORElFVEEgSk9ITiBTRUJBU1RJQU4iLCJ1Y21OdWV2YVZlcnNpb24iOiIyNyIsInVjbVNlcnZpZG9yIjoiY21vdmlsMi5jZWx5YXNhLmNvbSIsInVjbVZlcnNpb24iOiIyNyIsInVjbUluYWN0aXZvIjowLCJ1Y21Nb2R1bG8iOjEsInVjbUFnZUNvZGlnbyI6NDI1MDAxODU1MywidWNtQWxtQ29kaWdvIjo0MjUsImlhdCI6MTY5OTg5NzM5OCwiZXhwIjoxNzAyNDg5Mzk4fQ.iO_02690xXQTktzH67P6n87E-QIBoOPdQIpd-YfC8WA";
            const response = await fetch(
              "http://backend.celyasa.com:5001/api/cmovilv3/usrcmovil/grafica/maps",
              // "http://localhost:5000/api/cmovilv3/usrcmovil/grafica/maps",

              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  ageCodigo: selectedOptionAgente.ageCodigo,
                  fecha: fechaFormateada,
                  almId: selectedOption.UAG_ALMACEN,
                  usuModulo: parseInt(selectedValue),
                }),
              }
            );
            if (response.ok) {
              const data = await response.json();
              setLocationsVisitados(data.datosVisitadosMap);
              setLocationsNoVisitados(data.datosPendientesMap);

              setContadorPedidos(0);
              setContadorNovedades(0);
              setContadorNovedadesTriangulo(0);
              setContadorPedidosTriangulo(0);
              setContadorFacturas(0);
              setContadorFacturasTriangulo(0);
              setContadorRecibo(0);
              setContadorReciboTriangulo(0);
              if (selectedValue == 1) {
                data.datosVisitadosMap.forEach((item) => {
                  if (item.tipo === "PEDIDO") {
                    if (item.tipDistancia == 1) {
                      setContadorPedidosTriangulo((contador) => contador + 1);
                    } else {
                      setContadorPedidos((contador) => contador + 1);
                    }
                  } else if (item.tipo === "NOVEDAD") {
                    if (item.tipDistancia == 1) {
                      setContadorNovedadesTriangulo((contador) => contador + 1);
                    } else {
                      setContadorNovedades((contador) => contador + 1);
                    }
                  }
                });
                // } else if (selectedValue == 4) {
              } else {
                data.datosVisitadosMap.forEach((item) => {
                  if (item.tipo === "FACTURA") {
                    if (item.tipDistancia == 1) {
                      setContadorFacturasTriangulo((contador) => contador + 1);
                    } else {
                      setContadorFacturas((contador) => contador + 1);
                    }
                  } else if (item.tipo === "NOVEDAD") {
                    if (item.tipDistancia == 1) {
                      setContadorNovedadesTriangulo((contador) => contador + 1);
                    } else {
                      setContadorNovedades((contador) => contador + 1);
                    }
                  } else if (item.tipo === "RECIBO") {
                    if (item.tipDistancia == 1) {
                      setContadorReciboTriangulo((contador) => contador + 1);
                    } else {
                      setContadorRecibo((contador) => contador + 1);
                    }
                  }
                });
              }
            } else {
              console.error(
                "Error en la llamada a la API:",
                response.statusText
              );
            }
          } else {
            alert("Por favor, selecciona Fecha antes de buscar");
          }
        } else {
          alert("Por favor, selecciona Agente antes de buscar");
        }
      } else {
        alert("Por favor, selecciona Almacén antes de buscar");
      }
    } catch (error) {
      console.error("Error durante la llamada a la API", error);
    }
  };

  return (
    <Card variant="outlined" sx={{ paddingBottom: "0" }}>
      <Typography variant="h3" sx={{ marginBottom: "0" }} gutterBottom>
        Información
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <RadioGroup
          row
          value={selectedValue}
          // aria-label="position"
          // name="position"
          // defaultValue="top"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="Preventa"
            labelPlacement="end"
          />
          <FormControlLabel
            value="4"
            control={<Radio />}
            label="Autoventa"
            labelPlacement="end"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="Entrega"
            labelPlacement="end"
          />
        </RadioGroup>
      </Box>

      <Divider />
      <CardContent sx={{ paddingBottom: "10px !important" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Autocomplete
              id="medium-combo-box-demo"
              size="small"
              fullWidth
              options={token.almacen || []}
              getOptionLabel={(option) => option.ALM_NOMBRE}
              value={selectedOption}
              onChange={(_, newValue) => setSelectedOption(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Almacén"
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                  InputProps={{
                    ...params.InputProps,
                    style: { fontSize: "12px" },
                  }}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.UAG_ALMACEN === value.UAG_ALMACEN
              }
              renderOption={(props, option) => (
                <li {...props} style={{ fontSize: 12, padding: "5px" }}>
                  {option.ALM_NOMBRE}
                </li>
              )}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Autocomplete
              id="medium-combo-box-demo"
              size="small"
              fullWidth
              options={datos || []}
              getOptionLabel={(option) => option.ageNombre}
              value={selectedOptionAgente}
              onChange={(_, newValue) => setSelectedOptionAgente(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Agente"
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                  InputProps={{
                    ...params.InputProps,
                    style: { fontSize: "12px" },
                  }}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.ageCodigo === value.ageCodigo
              }
              renderOption={(props, option) => (
                <li {...props} style={{ fontSize: 12, padding: "5px" }}>
                  {option.ageNombre}
                </li>
              )}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              size="small"
              id="fecha"
              label="Fecha"
              type="date"
              InputLabelProps={{
                shrink: true,
                style: { fontSize: "12px" },
              }}
              inputProps={{
                min: minDate,
                max: maxDate,
              }}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <Button variant="contained" onClick={filtrarInformacion}>
              Buscar
            </Button>
          </Grid>
        </Grid>
        <Card variant="outlined">
          <Grid container spacing={1}>
            {/* Fila 1 */}
            <Grid item xs={3}>
              <Circle
                fontSize="small"
                style={{
                  color: selectedValue != 1 ? "#00C1FF" : "#009640",
                  fontSize: "10px",
                }}
              />{" "}
              {selectedValue == 1 ? "Pedido:" : "Recibo:"}{" "}
              {selectedValue != 1 ? contadorRecibo : contadorPedidos}
            </Grid>
            <Grid item xs={3}>
              <ReportProblemRounded
                style={{
                  color: selectedValue != 1 ? "#00C1FF" : "#009640",
                  fontSize: "15px",
                }}
              />{" "}
              {selectedValue == 1
                ? contadorPedidosTriangulo
                : contadorReciboTriangulo}
            </Grid>
            <Grid item xs={3}>
              {selectedValue == 1 ? "Total Pedidos: " : "Total Recibos: "}
              {selectedValue == 1
                ? contadorPedidos + contadorPedidosTriangulo
                : contadorRecibo + contadorReciboTriangulo}
            </Grid>
            <Grid item xs={3}>
              {parseInt(selectedValue) === 1 ? (
                <div>
                  Eficiencia:{" "}
                  {contadorPedidos + contadorPedidosTriangulo == 0
                    ? 0
                    : Math.round(
                        ((contadorPedidos +
                          contadorPedidosTriangulo +
                          contadorNovedades +
                          contadorNovedadesTriangulo) *
                          100) /
                          (contadorPedidos +
                            contadorPedidosTriangulo +
                            contadorNovedades +
                            contadorNovedadesTriangulo +
                            locationsNoVisitados.length)
                      )}{" "}
                  %
                </div>
              ) : (
                ""
              )}
            </Grid>

            {/* Fila 2 */}
            <Grid item xs={3}>
              <Circle
                fontSize="small"
                style={{
                  color: "#FFED00",
                  fontSize: "10px",
                }}
              />{" "}
              Novedad: {contadorNovedades}
            </Grid>
            <Grid item xs={3}>
              <ReportProblemRounded
                style={{
                  color: "#FFED00",
                  fontSize: "15px",
                }}
              />{" "}
              {contadorNovedadesTriangulo}
            </Grid>
            <Grid item xs={3}>
              Total Novedades: {contadorNovedades + contadorNovedadesTriangulo}
            </Grid>
            <Grid item xs={3}>
              {parseInt(selectedValue) === 1 ? (
                <div>
                  Efectividad:{" "}
                  {contadorPedidos + contadorPedidosTriangulo == 0
                    ? 0
                    : Math.round(
                        ((contadorPedidos + contadorPedidosTriangulo) * 100) /
                          (contadorPedidos +
                            contadorPedidosTriangulo +
                            contadorNovedades +
                            contadorNovedadesTriangulo +
                            locationsNoVisitados.length)
                      )}{" "}
                  %
                </div>
              ) : (
                ""
              )}
            </Grid>

            {/* Fila 3 */}
            <Grid item xs={3}>
              <Circle
                fontSize="small"
                style={{
                  color: "red",
                  fontSize: "10px",
                }}
              />{" "}
              Pendientes: {locationsNoVisitados.length}
            </Grid>
            <Grid item xs={3}>
              {""}
            </Grid>
            <Grid item xs={3}>
              Total Pendientes: {locationsNoVisitados.length}
            </Grid>
            <Grid item xs={3}>
              <span style={{ fontWeight: "bold" }}>
                Total Clientes:{" "}
                {selectedValue == 1
                  ? contadorPedidos +
                    contadorPedidosTriangulo +
                    contadorNovedades +
                    contadorNovedadesTriangulo +
                    locationsNoVisitados.length
                  : contadorRecibo +
                    contadorReciboTriangulo +
                    contadorNovedades +
                    contadorNovedadesTriangulo +
                    locationsNoVisitados.length +
                    contadorFacturas +
                    contadorFacturasTriangulo}
              </span>
            </Grid>
            {selectedValue != 1 ? (
              <Grid item xs={3}>
                <Circle
                  fontSize="small"
                  style={{
                    color: "#009640",
                    fontSize: "10px",
                  }}
                />{" "}
                Facturas: {contadorFacturas}
              </Grid>
            ) : (
              ""
            )}

            {selectedValue != 1 ? (
              <Grid item xs={3}>
                <ReportProblemRounded
                  style={{
                    color: "#009640",
                    fontSize: "15px",
                  }}
                />{" "}
                {contadorFacturasTriangulo}
              </Grid>
            ) : (
              ""
            )}

            {selectedValue != 1 ? (
              <Grid item xs={3}>
                Total Facturas: {contadorFacturas + contadorFacturasTriangulo}
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Card>
        <Box sx={{ flexGrow: 1 }}>
          <MapContainer
            key={mapKey}
            center={{ lat: "-1.831239", lng: "-78.183406" }}
            zoom={7}
            style={{ width: "100%", height: "500px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Polyline
              positions={locationsVisitados.map((location) => [
                location.logLatitud,
                location.logLongitud,
              ])}
              color="black"
            />

            {locationsVisitados.map((location, index) => (
              <Marker
                key={index}
                position={{
                  lat: parseFloat(location.logLatitud),
                  lng: parseFloat(location.logLongitud),
                }}
                icon={MuiCircleIcon(
                  "green",
                  index,
                  location.tipDistancia,
                  locationsVisitados.length,
                  selectedValue == 1
                    ? location.tipo === "PEDIDO"
                      ? 0
                      : 1
                    : location.tipo
                )}
              >
                <Popup>
                  <div style={{ margin: 0, padding: 0 }}>
                    <p style={{ margin: 0 }}>
                      {new Date(location.logFechaCrea).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                    <p style={{ margin: 0 }}>{location.cliNombre}</p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>
                        {formatearTexto(location.tipo)}:
                      </span>
                      {location.documento}
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Id: </span>
                      {location.cliId}
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Direccion: </span>
                      {location.cliDireccion}
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Tel1: </span>
                      {location.cliTelefono1}
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Tel2: </span>
                      {location.cliTelefono2}
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Tel3: </span>
                      {location.cliTelefono3}
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Telf CMovil: </span>
                      {location.cliTelefono2}
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>
                        Dist. a Cliente:
                      </span>
                      {location.distancia} m.
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Coord Vend: </span>
                      {location.logLatitud}, {location.logLongitud}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {locationsNoVisitados.map((location, index) => (
              <Marker
                key={index}
                position={{
                  lat: location.cliLatitud,
                  lng: location.cliLongitud,
                }}
                icon={MuiCircleIconNoVisitados("red")}
              >
                <Popup>
                  <div style={{ margin: 0, padding: 0 }}>
                    <p style={{ margin: 0 }}>{location.cliNombre}</p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Direccion: </span>
                      {location.cliDireccion}
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Tel1: </span>
                      {location.cliTelefono1}
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Tel2: </span>
                      {location.cliTelefono2}
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Tel3: </span>
                      {location.cliTelefono3}
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Telf CMovil: </span>
                      {location.cliTelefono2}
                    </p>
                    <p style={{ margin: 0 }}>
                      <span style={{ fontWeight: "bold" }}>Coord Cli: </span>
                      {location.cliLatitud}, {location.cliLongitud}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
function decodeJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payloadJson = atob(base64);
  const payload = JSON.parse(payloadJson);
  return payload;
}

export default Home;
