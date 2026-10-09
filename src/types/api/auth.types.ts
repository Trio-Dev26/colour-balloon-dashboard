/** POST /auth/admin/login → { user } */
export interface AuthUser {
   id: string;
   email: string;
   username: string;
   fullname: string;
   role: string;
}

/** GET /auth/admin/me returns the access token's claims, not the full user. */
export interface SessionUser {
   sub: string;
   email: string;
   role: string;
}

export interface LoginRequest {
   email: string;
   password: string;
}
