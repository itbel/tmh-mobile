//import axios from 'axios';

export interface Location {
    id: string;
    name: string;
    pastorEmail: string;
    location: {
        longitude: number;
        latitude: number;
        address: string;
    };
    facebookEvents: string[];
    serviceTimes: string[];
}

export default class LocationsService {

    static getLocationById = async (locationId: string): Promise<Location | undefined> => {
      const allLocations: Location[] = LocationsService.loadLocations();
      return allLocations.find(loc => loc.id === locationId);
    }

    static loadLocations = (): Location[] => {
        return [
          {
              
              "id": "alliston",
              "name": "Alliston",
              "pastorEmail":"michael.kotsopoulos@themeetinghouse.com",
              "location": {
                  "longitude": -79.870798,
                  "latitude": 44.149035,
                  "address": "Gibson Centre, 63 Tupper Street West"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:30"],
          },
          {
              "id": "sandbanks",
              "name": "Sandbanks",
              "pastorEmail":"brent.babcock@themeetinghouse.com",
              "location": {
                  "longitude": -77.2674762,
                  "latitude": 43.9188665,
                  "address": "1901 County Rd 12, Prince Edward County"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "ancaster",
              "name": "Ancaster",
              "pastorEmail":"Matt.Collins@themeetinghouse.com",
              "location": {
                  "longitude": -79.95394369999997,
                  "latitude": 43.2272571,
                  "address": "SilverCity Ancaster, 771 Golf Links Road"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "brampton",
              "name": "Brampton",
              "pastorEmail":"Christine.Gerber@themeetinghouse.com",
              "location": {
                  "longitude": -79.768112,
                  "latitude": 43.733024,
                  "address": "SilverCity Brampton, 50 Great Lakes Drive"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "brantford",
              "name": "Brantford",
              "pastorEmail":"Natalie.Frisk@themeetinghouse.com",
              "location": {
                  "longitude": -80.278012,
                  "latitude": 43.182376,
                  "address": "Galaxy Cinemas Brantford, 300 King George Road"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "burlington",
              "name": "Burlington",
              "pastorEmail":"John.Latta@themeetinghouse.com",
              "location": {
                  "longitude": -79.829876,
                  "latitude": 43.343507,
                  "address": "SilverCity Burlington, 1250 Brant Street"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "hamilton-downtown",
              "name": "Hamilton - Downtown",
              "pastorEmail":"Jimmy.Rushton@themeetinghouse.com",
              "location": {
                  "longitude": -79.8702504,
                  "latitude": 43.26213,
                  "address": "130 Victoria Avenue North"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "toronto-downtown",
              "name": "Toronto - Downtown",
              "pastorEmail":"Anita.Giardina@themeetinghouse.com",
              "location": {
                  "longitude": -79.391418,
                  "latitude": 43.648869,
                  "address": "Scotiabank Theatre Toronto, 259 Richmond Street West"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "hamilton-mountain",
              "name": "Hamilton Mountain",
              "pastorEmail":"Dagmar.Morgan-Sinclair@themeetinghouse.com",
              "location": {
                  "longitude": -79.808856,
                  "latitude": 43.193331,
                  "address": "SilverCity Hamilton Mountain, 795 Paramount Drive"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "toronto-east",
              "name": "Toronto - East",
              "pastorEmail":"Robin.Ellingwood@themeetinghouse.com",
              "location": {
                  "longitude":-79.3166538,
                  "latitude": 43.6664844,
                  "address": "The Beach Cinemas, 1651 Queen Street East"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "toronto-high-park",
              "name": "Toronto - High Park",
              "pastorEmail":"Rob.Schellenberg@themeetinghouse.com",
              "location": {
                  "longitude": -79.4744334,
                  "latitude": 43.6578297,
                  "address": "125 Evelyn Crescent"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "kitchener",
              "name": "Kitchener",
              "pastorEmail":"Mark.Wall@themeetinghouse.com",
              "location": {
                  "longitude": -80.387502,
                  "latitude": 43.4054,
                  "address": "Landmark Cinemas 12, 135 Gateway Park Drive"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "london",
              "name": "London",
              "pastorEmail":"Phil.Prendergast@themeetinghouse.com",
              "location": {
                  "longitude": -81.278295,
                  "latitude": 43.027068,
                  "address": "SilverCity London, 1680 Richmond Street"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "newmarket",
              "name": "Newmarket",
              "pastorEmail":"Simon.Downey@themeetinghouse.com",
              "location": {
                  "longitude": -79.555998,
                  "latitude": 43.79428,
                  "address": "SilverCity Newmarket, 18195 Yonge Street"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "oakville",
              "name": "Oakville",
              "pastorEmail":"Karmyn.Bokma@themeetinghouse.com",
              "location": {
                  "longitude": -79.685926,
                  "latitude": 43.511459,
                  "address": "2700 Bristol Circle"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["8:00", "9:30", "11:15"]
          },
          {
              "id": "ottawa",
              "name": "Ottawa",
              "pastorEmail":"Eric.Versluis@themeetinghouse.com",
              "location": {
                  "longitude": -75.613528,
                  "latitude": 45.431384,
                  "address": "Lansdowne Cineplex, 325 Marché Way"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
      
          {
              "id": "owen-sound",
              "name": "Owen Sound",
              "pastorEmail":"",
              "location": {
                  "longitude": -80.933555,
                  "latitude": 44.573804,
                  "address": "St. Mary's High School, 555 15th Street East"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "parry-sound",
              "name": "Parry Sound",
              "pastorEmail":"Heidi.Konig@themeetinghouse.com",
              "location": {
                  "longitude": -80.036396,
                  "latitude": 45.35407,
                  "address": "The Sound Hub, 86 Gibson St."
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "richmond-hill",
              "name": "Richmond Hill",
              "pastorEmail":"Melissa.Ytsma@themeetinghouse.com",
              "location": {
                  "longitude": -79.4291884,
                  "latitude": 43.8408015,
                  "address": "SilverCity Richmond Hill, 8725 Yonge Street"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "toronto-uptown",
              "name": "Toronto - Uptown",
              "pastorEmail":"Jared.Erhardt@themeetinghouse.com",
              "location": {
                  "longitude": -79.58688,
                  "latitude": 43.70752,
                  "address": "Yorkdale Cineplex, 3401 Dufferin Street"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          },
          {
              "id": "waterloo",
              "name": "Waterloo",
              "pastorEmail":"Jordan.Duerrstein@themeetinghouse.com",
              "location": {
                  "longitude": -80.527216,
                  "latitude": 43.498807,
                  "address": "Galaxy Cinemas | Conestoga Mall, 550 King Street North"
              },
              "facebookEvents": ["192337637474940","204669579590265"],
              "serviceTimes": ["10:00"]
          }
      ];
    }
}
