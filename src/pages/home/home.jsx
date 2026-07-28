import React, { useEffect, useState } from "react";
import LineChart from "../../components/shared/Charts/LineChart";
import BasicTable from "../../components/shared/Tables/BasicTable";
import { getData } from "../../services/Currency";
import LoadingIndicator from "../../components/shared/LoadingIndicator";
import { Navigate } from "react-router";

function Home() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(id && token);

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    let ignore = false;

    getData()
      .then((response) => {
        if (!ignore) {
          setData(Array.isArray(response) ? response : []);
          setStatus("success");
        }
      })
      .catch((error) => {
        if (!ignore) {
          console.error("Unable to load prediction data.", error);
          setStatus("error");
        }
      });

    return () => {
      ignore = true;
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/pages/login" replace />;
  }

  return (
    <>
      {status === "loading" ? (
        <div className="d-flex fullH">
          <div className="m-auto">
            <LoadingIndicator />
          </div>
        </div>
      ) : status === "error" ? (
        <div className="container py-5">
          <div className="alert alert-danger" role="alert">
            Prediction data could not be loaded. Please try again later.
          </div>
        </div>
      ) : data.length > 0 ? (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="row">
                <LineChart data={data} />
              </div>
              <div className="row mt-4">
                <BasicTable data={data} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container py-5">
          <div className="alert alert-info" role="status">
            No prediction data is available yet.
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
