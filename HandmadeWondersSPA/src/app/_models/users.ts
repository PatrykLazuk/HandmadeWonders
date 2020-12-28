export interface userToShow {
    id: number;
    userName: string;
}

export interface userToRegister {
    username: string;
    password: string;
}

export interface userToLogin {
    username: string;
    password: string;
}

export interface userToDelete {
    id: number;
}

export interface validatePassword {
    id: number,
    passwordToValidate: string
}

export interface changePassword {
    id: number,
    OldPassword: string,
    NewPassword: string
}