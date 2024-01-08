const { renderOrganizationForm, createOrganization } = require("../../Controller/OrganizationController/organizationController");

const router=require("express").Router()

router.route( '/addOrganization').get(renderOrganizationForm).post(createOrganization)

module.exports=router;