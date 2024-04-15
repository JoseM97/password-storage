export class Site {
    private title: string;
    private user: string;
    private password: string;

    constructor(title: string, user: string, password: string) {
        this.title = title;
        this.user = user;
        this.password = password;
    }

    getTitle() {
        return this.title;
    }

    getUser() {
        return this.user;
    }

    getPassword() {
        return this.password;
    }

    setTitle(title: string) {
        this.title = title;
    }

    setUser(user: string) {
        this.user = user;
    }

    setPassword(password: string) {
        this.password = password;
    }
}