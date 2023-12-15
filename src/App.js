// import "./App.css";
import { Route, Routes } from "react-router";
import { ThemeProvider } from "@emotion/react";
import { baseTheme } from "./assets/global/Theme";
import LoginForm from "./components/views/LoginForm/loginForm";
import Dashboard from "./components/views/dashboard/Dashboard";
import Layout from "./components/Layout";
import Missing from "./components/views/NoFound/Missing";

function App() {
  return (
    // <ThemeProvider theme={theme}>{routing}</ThemeProvider>

    <ThemeProvider theme={baseTheme}>
      {/* <CssBaseline /> */}
      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
