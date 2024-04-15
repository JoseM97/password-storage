import { Site } from "./site.model";

export class Category {
    private color: string;
    private sites: Site[];
    private title: string; 

    constructor(color: string, title: string) {
        this.color = color;
        this.sites = [];
        this.title = title;
    }

    getColor() {
        return this.color;
    }

    getSites() {
        return this.sites;
    }

    getTitle() {
        return this.title;
    }

    setColor(color: string) {
        this.color = color;
    }

    setSites(sites: Site[]) {
        this.sites = sites;
    }

    setTitle(title: string) {
        this.title = title;
    }
}