import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/auth/sign-in", "routes/auth/sign-in.tsx"),
    route("/auth/sign-up", "routes/auth/sign-up.tsx"),
] satisfies RouteConfig;
