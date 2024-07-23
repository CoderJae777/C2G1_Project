import RejectWorkshopRequestPopup from "../pages_admin/RejectWorkshopRequestPopup";

const endpoints = {
  login: {
    admin: "/auth/login/admin",
    trainer: "/auth/login/trainer",
    client: "/auth/login/client",
  },
  verify: "/auth/verify",
  logout: "/auth/logout",
  signup: "/auth/signup",
  admin: {
    getTrainers: "/auth/trainers/list",
    getAvailableTrainers: "/auth/trainers/available",
    addTrainer: "/auth/trainers",
    updateTrainer: "/auth/trainers/update/",
    availabilityTrainer: "/auth/trainers/",
    getWorkshopRequests: "/workshoprequest/getSubmitted",
    approveWorkshopRequest: "/workshoprequest/approve/",
    rejectWorkshopRequest: "/workshoprequest/reject/",
    deleteTrainer:"/auth/trainers/delete/",
    getWorkshopData:"/workshopdata",
    getSingleWorkshopData:"/workshopdata/",
    updateWorkshopData:"/workshopdata/"
  },
  client: {
    getAvailableWorkshopData: "/workshopdata/available",
    createWorkshop: "/workshoprequest",
  },
  trainer: {
    getAllocatedWorkshopRequests: "/auth/allocatedworkshops",
    getSingleWorkshopRequest: "/workshoprequest/",
    updateUtilisation: "/auth/updateutilisation/",
  },
  notif:{
    getAllAdminNotificiation: "/notif/getAllAdminNotification",
  }
};

export { endpoints };
