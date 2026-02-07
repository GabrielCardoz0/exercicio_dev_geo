import express from "express";
import cors from "cors";
import fs from "fs";

const api = express();

api
.use(express.json())
.use(cors())
.get("/health", (req, res) => res.status(200).send({ status: 200, message: "server is running" }))
.get("/resources", async (req, res) => {
  try {
    const csv = await fs.readFileSync("../files/base_jales_separado_tab.csv");

    const csvString = csv.toString();

    const lines = csvString.split("\n");

    const records = lines
      .slice(1)
      .map((line, lineIndex) => {
        const values = line.split("\t");
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [parseFloat(values[1]), parseFloat(values[0])],
          },
          properties: {
            id: lineIndex,
            estabelecimento: parseFloat(values[2]),
            domicilio_particular: parseFloat(values[3]),
            estabelecimento_construcao: parseFloat(values[4]),
            estabelecimento_religioso: parseFloat(values[5]),
            estabelecimento_ensino: parseFloat(values[6]),
            estabelecimento_saude: parseFloat(values[7]),
            domicilio_coletivo: parseFloat(values[8]),
            estabelecimento_agro: parseFloat(values[9]),
          },
        }
      });
  
    return res.status(200).send({ type: "FeatureCollection", features: records })
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 500, message: "Unknown error" })
  }
})
.listen(5000, () => console.log('API IS RUNNING!'));