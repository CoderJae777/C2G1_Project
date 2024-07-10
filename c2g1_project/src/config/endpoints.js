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
  },
};

export { endpoints };
