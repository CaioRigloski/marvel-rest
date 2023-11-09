export default interface CharactersPs {
    id: number,
    name: string,
    description: string,
    thumbnail: {
        extension: string,
        path: string
    }
}