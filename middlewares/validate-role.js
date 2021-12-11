const { request, response } = require("express");

//* This function only check if the user have the ADMIN_ROLE
const isAdminRole = (req = request, res = response, next ) => {
    
    if( !req.user ){
        return res.status(500).json({
            msg: "You are trying to get the user before token validation"
        })
    }

    const { role } = req.user

    if( role !== "ADMIN_ROLE" ){
        return res.status(401).json({
            msg: "You don't have permission to do this..."
        })
    }
    
    next()
}

//* This function check if you have the permission roles
const haveRole = ( ...roles ) => {

    return ( req = request, res = response, next ) => {

        if( !req.user ){
            return res.status(500).json({
                msg: "You are trying to get the user before token validation"
            })
        }

        if( !roles.includes( req.user.role )){

            return res.status(401).json({
                msg: `You don't have permission to do this, you must have the permissions ${roles}`
            })
        }

        next()
    }

}

module.exports = {
    isAdminRole,
    haveRole
}