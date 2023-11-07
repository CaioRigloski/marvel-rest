export default interface Characters {
    id: number,
    name: string,
    description: string,
    thumbnail: {
        extension: string,
        path: string
    }
}