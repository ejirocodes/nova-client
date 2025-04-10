import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    // index("routes/home.tsx"),
    route("/auth/sign-in", "routes/auth/sign-in.tsx"),
    route("/auth/sign-up", "routes/auth/sign-up.tsx"),
    route("/auth/verify-email-address", "routes/auth/verify-email-address.tsx"),
    layout("routes/layout/core.layout.tsx", [
        route("/dashboard", "routes/home.tsx"),
    ]),
] satisfies RouteConfig;
