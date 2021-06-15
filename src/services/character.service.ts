import _ from 'lodash';
import myAxios from '../config/axios'
import myCache from '../config/cache'

export async function getAllCharactersIds() {

    try {

        let ids_array: any = [];

        //get the last modified record timestamp
        const characters_api_details: any = await getCharachersDetails();

        let last_modified_date = new Date(characters_api_details.last_modified);
        let last_modified_timestamp: any = myCache.get("last_modified_timestamp");

        //if last record timestamp equal to cached timestamp then serve cached data
        if (last_modified_timestamp !== undefined && last_modified_timestamp == last_modified_date.getTime()) {
            ids_array = myCache.get("characters_id");
            if (ids_array !== undefined) {
                return ids_array;
            }
        }

        let promises: any = [];
        const limit: number = 100;
        let stop: boolean = false;

        const number_of_pages = Math.ceil(characters_api_details.total / limit)

        for (let page = 1; page <= number_of_pages; page++) {
            let params: any = {
                limit: limit,
                orderBy: 'modified',
                offset: (page - 1) * limit
            }

            promises.push(getCharacters(params));
        }

        let values = await Promise.all(promises);

        for (let i = 0; i < values.length; i++) {
            const result: any = values[i];

            if (result.code == 200 && result.data && result.data.results && result.data.results.length > 1) {
                let ids = _.map(result.data.results, 'id');
                ids_array = ids_array.concat(ids);
            }
        }

        //cache results
        myCache.set("characters_id", ids_array);
        myCache.set("last_modified_timestamp", new Date(characters_api_details.last_modified).getTime());

        return ids_array;

    } catch (error) {
        // console.log(error);
        return null;
    }
}

export async function getCharachersDetails() {
    try {
        let params: any = {
            limit: 1,
            orderBy: '-modified',

        }

        let data = {
            last_modified: null,
            total: null
        }

        const result = await getCharacters(params);

        if (result && result.code == 200 && result.data.results && Array.isArray(result.data.results) && result.data.results.length > 0) {
            data.last_modified = result.data.results[0].modified;
            data.total = result.data.total;

            return data;
        }

        return null;

    } catch (error) {
        return null;
    }
}

export function getCharacters(params: any) {
    return myAxios('/v1/public/characters', { params })
        .then((res: any) => {
            return res.data;
        });
}

export async function getCharacterById(id: string) {

    //serve from cache if availabe
    const value = myCache.get("character-" + id);

    if (value !== undefined) {
        return value;
    }

    try {

        let result: any = await myAxios('/v1/public/characters/' + id);
        if (result.data.code != 200) {
            return null;
        }

        const data: any = result.data.data && result.data.data.count > 0 ? result.data.data.results[0] : null;
        const character: object = {
            id: data && data.id ? data.id : null,
            name: data && data.name ? data.name : null,
            description: data && data.description ? data.description : null
        }

        //cache result
        myCache.set("character-" + id, character);

        return character;
    } catch (error) {
        // console.log(error);
        return null

    }

}
