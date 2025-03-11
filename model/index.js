const User = require('./user/user')
const Patient = require('./patient/patient')
const Doctor = require('./doctor/doctor')
const Auth = require('./auth/auth')

const DoctorToPatient = require('./connection/doctor_to_patient')
module.exports = {
    User,
    Patient,
    Doctor,
    Auth,

    DoctorToPatient
}