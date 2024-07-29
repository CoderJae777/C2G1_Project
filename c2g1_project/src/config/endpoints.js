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
    deleteTrainer: "/auth/trainers/delete/",
    getWorkshopData: "/workshopdata",
    getSingleWorkshopData: "/workshopdata/",
    updateWorkshopData: "/workshopdata/",
    getApprovedWorkshops: "/workshoprequest/getApproved",
  },
  client: {
    getAvailableWorkshopData: "/workshopdata/available",
    getPendingWorkshopRequests: "/auth/pendingworkshops",
    createWorkshop: "/workshoprequest",
  },
  trainer: {
    getAllocatedWorkshopRequests: "/auth/allocatedworkshops",
    getSingleWorkshopRequest: "/workshoprequest/",
    getTeammates: "/auth/getteammates",
    getOthers: "/auth/getothers",
    updateUtilisation: "/auth/updateutilisation/",
    getApprovedWorkshops: "/workshoprequest/getApproved"
  },
  notif: {
    getAllAdminNotificiation: "/notif/getAllAdminNotification",
  },
  graph: {
    // deprecated use
    getWorkshopSummaryGraph: "/graph/getWorkshopSummaryGraph",
    getTrainerGraph: "/graph/getTrainerGraph",
    getTodayGraph: "/graph/getTodayGraph",
    // currently in use
    getYearsPieChartGraph: "/graph/getYearsPieChartGraph",
    getTotalPieChartGraph: "/graph/getTotalPieChartGraph",
    getWorkshopTypesGraph: "/graph/getWorkshopTypesGraph",
    getClientTypeGraph: "/graph/getClientTypeGraph",
    getWorkshopTrendDataGraph: "/graph/getWorkshopTrendDataGraph",
    // hardcoded data below
    getHCtotalPieData: "/graph/getHCtotalPieData",
    getHCyearsPieData: "/graph/getHCyearsPieData",
    getHCWorkshopTypesData: "/graph/getHCWorkshopTypesData",
    getHCClientTypesData: "/graph/getHCClientTypesData",
    getHCWorkshopTrendData: "/graph/getHCWorkshopTrendData",
  },
};

export { endpoints };
