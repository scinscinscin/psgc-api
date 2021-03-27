import CityRequest from "../models/cityRequest";
import BarangayRequest from "../models/barangayRequest";
import handleAsync from "../utils/handleAsync";

/**
 * !PATH: /city
 */
export const getAllCities = handleAsync(async (req, res, _next) => {
    const { page = 1, limit = 10 } = req.query;
    const data = await CityRequest.find()
        .limit(<number>limit * 1)
        .skip((<number>page - 1) * <number>limit)
        .exec();
    const count = await CityRequest.countDocuments();
    res.json({
        data,
        totalPages: Math.ceil(count / <number>limit),
        currentPage: page
    });
});

/**
 * !PATH: /city/:code
 */
export const getACity = handleAsync(async (req, res, _next) => {
    const { code } = req.params;
    const [data] = await CityRequest.find({ "city.code": code });
    if (!data) throw new Error("No Results Found");

    const totalNumOfCities = Object.keys(data.municipality[0]).length;

    for (let i = 0; i < totalNumOfCities; i++) {
        let db_code = data[i].city[0].code;
        let db_obj = data[i].city[0];
        if (code == db_code) {
            res.json(db_obj);
            break;
        }
    }
});

/**
 * !PATH: /city/:code/barangay
 * barangay (for city)
 */
export const getAllBarangaysOfACity = handleAsync(async (req, res, _next) => {
    const { code } = req.params;
    const data = await BarangayRequest.find();
    if (!data) throw new Error("No Results Found");

    const totalNumOfBarangays = Object.keys(data).length;
    const codeArray = code.split("");
    const results = [];

    let new_split_code = 0;
    let split_code =
        codeArray.length < 9
            ? parseInt(
                  codeArray[0] +
                      codeArray[1] +
                      codeArray[2] +
                      codeArray[3] +
                      codeArray[4] +
                      codeArray[5]
              )
            : parseInt(
                  codeArray[0] +
                      codeArray[1] +
                      codeArray[2] +
                      codeArray[3] +
                      codeArray[4] +
                      codeArray[5] +
                      codeArray[6]
              );

    for (let i = 0; i < totalNumOfBarangays; i++) {
        const db_code = data[i].barangay[0].code;

        db_code.split("").length < 9
            ? (new_split_code = parseInt(
                  db_code[0] +
                      db_code[1] +
                      db_code[2] +
                      db_code[3] +
                      db_code[4] +
                      db_code[5]
              ))
            : (new_split_code = parseInt(
                  db_code[0] +
                      db_code[1] +
                      db_code[2] +
                      db_code[3] +
                      db_code[4] +
                      db_code[5] +
                      db_code[6]
              ));

        split_code === new_split_code ? results.push(data[i].barangay) : null;
    }

    res.json(results);
});
