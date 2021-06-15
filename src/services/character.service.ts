import _ from 'lodash';
import myAxios from '../config/axios'
import myCache from '../config/cache'


export async function getAllCharactersIds() {

    try {

        let ids_array: any = [];

        //get the last modified record timestamp
        const lastModifiedCharacter = await getLastModifiedCharacter();
        let date = new Date(lastModifiedCharacter.modified);
        let last_modified_timestamp: any = myCache.get("last_modified_timestamp");

        //if last record timestamp equal to cached timestamp then serve cached data
        if (last_modified_timestamp !== undefined && last_modified_timestamp == date.getTime()) {
            ids_array = myCache.get("characters_id");
            if (ids_array == undefined) {
                ids_array = [];
            }
            else {
                return ids_array;
            }
        }


        //get all the records 
        // paginate until no more records to grab
        const limit: number = 100;
        let page: number = 1;
        let stop: boolean = false;

        do {
            let params: any = {
                limit: limit,
                orderBy: 'modified',
                offset: (page - 1) * limit
            }

            // console.log(`Getting page ${page} with offset ${params.offset}`);

            const result = await getCharacters(params);


            if (result.code == 200 && result.data && result.data.results && result.data.results.length > 1) {

                let ids = _.map(result.data.results, 'id');

                ids_array = ids_array.concat(ids);

                if (ids.length == limit) page++;
                else stop = true;

            }
            else {
                stop = true;
            }
        }
        while (!stop);


        //cache results
        myCache.set("characters_id", ids_array);
        myCache.set("last_modified_timestamp", new Date(lastModifiedCharacter.modified).getTime());

        return ids_array;

    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function getLastModifiedCharacter() {
    try {
        let params: any = {
            limit: 1,
            orderBy: '-modified',

        }

        const result = await getCharacters(params);

        if (result && result.code == 200 && result.data.results && Array.isArray(result.data.results) && result.data.results.length > 0) {
            return result.data.results[0];
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

        myCache.set("character-" + id, character);

        return character;
    } catch (error) {
        // console.log(error);
        return null

    }

}
