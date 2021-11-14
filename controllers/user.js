const { response } = require('express');

const controllerGET = (req, res = response) => {
    const { q, name = "no name", id, page = "1", limit = "5" } = req.query;

    res.json({
        msg: "get JSON - controller",
        q,
        name,
        id,
        page,
        limit
    })
}

const controllerPUT = (req, res = response) => {
    const { id } = req.params
    res.json({
        msg: "put JSON - controller",
        id
    })
}

const controllerPOST = (req, res = response) => {
    const { nombre, id } = req.body;

    res.json({
        msg: "post JSON - controller",
        nombre,
        id
    })
}
const controllerDELETE = (req, res = response) => {
    res.json({
        msg: "delete JSON - controller"
    })
}

const controllerPATCH = (req, res = response) => {
    res.json({
        msg: "patch JSON - controller"
    })
}


module.exports = {
    controllerGET,
    controllerPUT,
    controllerPOST,
    controllerDELETE,
    controllerPATCH

}