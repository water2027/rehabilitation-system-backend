const User = require('./user/user')
const Patient = require('./patient/patient')
const Doctor = require('./doctor/doctor')
const Auth = require('./admin/admin')

const DoctorToPatient = require('./connection/doctor_to_patient')
const SurveyToPatient = require('./connection/survey_to_patient')

module.exports = {
    User,
    Patient,
    Doctor,
    Auth,

    DoctorToPatient,
    SurveyToPatient
}
