const { QueryTypes } = require("sequelize")
const { sequelize } = require("../../Model")

exports.renderOrganizationForm=(req,res)=>{
    res.render("organization")
}

exports.createOrganization=async(req,res)=>{
    const {organizationName,address,email,phone}=req.body
    const vatNumber=req.body.vatNumber ||null
    const panNumber=req.body.panNumber ||null


    //create organization
    await sequelize.query(`CREATE TABLE organization (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,orgname VARCHAR(255),email VARCHAR(255),phone VARCHAR(255),address VARCHAR(255),pan VARCHAR(255),vat VARCHAR(255))`,{
        type:QueryTypes.CREATE
    })
    //inset into table
    await sequelize.query(`INSERT INTO organization (orgname,email,phone,address,pan,vat) VALUES (?,?,?,?,?,?)`,{
        type:QueryTypes.INSERT,
        replacements:[organizationName,email,phone,address,panNumber,vatNumber]

    })
    res.send("Organization created successfully")

}