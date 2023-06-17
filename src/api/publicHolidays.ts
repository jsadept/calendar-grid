import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {HOLIDAY_COUNTRY_CODE, HOLIDAY_YEAR, HOLIDAYS_API_URL} from "../constants";

export const publicHolidaysApi = createApi({
    reducerPath: 'publicHolidaysApi',
    baseQuery: fetchBaseQuery({ baseUrl: HOLIDAYS_API_URL }),
    endpoints: (builder) => ({
        getPublicHolidays: builder.query<{ [date: string]: PublicHoliday[] }, { year: string; countryCode: string }>({
            query: () => `/PublicHolidays/${HOLIDAY_YEAR}/${HOLIDAY_COUNTRY_CODE}`,
            transformResponse: (response: PublicHoliday[]) => {
                const transformedData: { [date: string]: PublicHoliday[] } = {};

                response.forEach((holiday) => {
                    const { date } = holiday;
                    const [year, month, day] = date.split('-');
                    const transformedDate = `${Number(year)}-${Number(month)}-${Number(day)}`;

                    if (!transformedData[transformedDate]) {
                        transformedData[transformedDate] = [];
                    }
                    transformedData[transformedDate].push({...holiday, date: transformedDate});
                });

                return transformedData;
            },

        }),
    }),
});

export const { useGetPublicHolidaysQuery } = publicHolidaysApi;
