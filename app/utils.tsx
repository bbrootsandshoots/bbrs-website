import file from "./information.json" with { type: "json" };
const data = JSON.parse(JSON.stringify(file.projects));



export function getProjectDescription(name: string) {
    return (
        String(data[name].description)
    );
}

export function getProjectName(name: string) {
    return (
        String(data[name].name)
    );
}

export function getProjectTime(name: string) {
    return (
        String(data[name].time)
    );
}


export function getUrl(name: string) {
    return (
        '/projects/' + name
    );
}

export function getProjectAll(name: string) {
    return (
        [String(data[name].title), String(data[name].time), String(data[name].description), getUrl(name), data[name].imageCarousel.images, data[name].imageCarousel.descriptions, String(data[name].bDesc), data[name].starterImage]
    );
}