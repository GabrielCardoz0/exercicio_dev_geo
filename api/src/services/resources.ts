import fs from 'fs';
import path from 'path';

export class ResourcesService {

  private readonly defaultFilePath: string;

  constructor() {
    this.defaultFilePath = path.resolve(process.cwd(), '../files/base_jales_separado_tab.csv');
  }

  private csvRowToGeoJson = (str: string, lineIndex: number) => {
    const values = str.split("\t");

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [parseFloat(values[1]), parseFloat(values[0])],
      },
      properties: {
        id: lineIndex,
        estabelecimento_outras_finalidades: parseFloat(values[2]),
        domicilio_particular: parseFloat(values[3]),
        estabelecimento_construcao: parseFloat(values[4]),
        estabelecimento_religioso: parseFloat(values[5]),
        estabelecimento_ensino: parseFloat(values[6]),
        estabelecimento_saude: parseFloat(values[7]),
        domicilio_coletivo: parseFloat(values[8]),
        estabelecimento_agro: parseFloat(values[9]),
      },
    }
  }

  public async getMockResources() {
    const csv = await fs.readFileSync(this.defaultFilePath);

    const csvString = csv.toString();

    const lines = csvString.split("\n");

    const resources = lines.slice(1).map((line, index) => this.csvRowToGeoJson(line, index));

    return {
      type: "FeatureCollection",
      features: [resources[0]]
    };
  }

};
