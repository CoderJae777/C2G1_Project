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
    addTrainer: "/auth/trainers",
    getTrainers: "/auth/trainers/list",
    getAvailableTrainers: "/auth/trainers/available",
    updateTrainer: "/auth/trainers/update/",
    availabilityTrainer: "/auth/trainers/",
    getWorkshopRequests: "/workshop/getRequest",
    approveWorkshopRequest: "/workshop/approve/",
    rejectWorkshopRequest: "/workshop/reject/",
  },
  client: {
    createWorkshop: "/workshop",
  },
};

export { endpoints };
