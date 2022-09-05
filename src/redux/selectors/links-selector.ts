import { ESortTypes, TLinks } from "../reducers/links-reducer";
import { TAppState } from "../store";

export const getLinksData = (state: TAppState): Array<TLinks> => state.links.links;
export const getSortType = (state: TAppState): ESortTypes => state.links.sortType;
export const getPageSize = (state: TAppState): number => state.links.pageSize;
export const getTotalCountLinks = (state: TAppState): number => state.links.totalCountLinks;
export const getCurrentPageNumber = (state: TAppState): number => state.links.currentPageNumber;