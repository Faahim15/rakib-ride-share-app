import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  family: string;
}

export const languagesApi = createApi({
  reducerPath: "languagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://raw.githubusercontent.com/haliaeetus/iso-639/master/data/",
  }),
  endpoints: (builder) => ({
    // Fetch all languages
    getAllLanguages: builder.query<Language[], void>({
      query: () => "iso_639-1.json",
      transformResponse: (response: Record<string, any>) => {
        // Convert object to array and sort by name
        const langArray: Language[] = Object.entries(response).map(
          ([code, info]: [string, any]) => ({
            code,
            name: info.name,
            nativeName: info.nativeName,
            family: info.family,
          }),
        );
        return langArray.sort((a, b) => a.name.localeCompare(b.name));
      },
    }),

    // Fetch language by code
    getLanguageByCode: builder.query<Language | null, string>({
      query: () => "iso_639-1.json",
      transformResponse: (response: Record<string, any>, _, code: string) => {
        const langArray: Language[] = Object.entries(response).map(
          ([key, info]: [string, any]) => ({
            code: key,
            name: info.name,
            nativeName: info.nativeName,
            family: info.family,
          }),
        );
        return langArray.find((lang) => lang.code === code) || null;
      },
    }),
  }),
});

export const { useGetAllLanguagesQuery, useGetLanguageByCodeQuery } =
  languagesApi;
