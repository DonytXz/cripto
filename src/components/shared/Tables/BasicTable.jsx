import React from "react";

const BasicTable = ({ data }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tiempo</th>
            <th scope="col">Predicciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => {
            return (
              <tr key={index+1}>
                <th scope="row">{index}</th>
                <td>{element.time}</td>
                <td>{element.predicciones}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default BasicTable;
