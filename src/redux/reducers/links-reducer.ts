import { ThunkAction } from "redux-thunk";

import { API } from './../../api/api';

import { getAuthToken } from "../selectors/auth-selector";
import { getSortType } from "../selectors/links-selector";
import { getPageSize } from './../selectors/links-selector';

import { TAppState } from "../store";

const SET_LINKS_DATA = '/links/SET-LINKS-DATA';
const ADD_LINK = '/links/ADD-LINK';
const CLEAR_LINKS_DATA = 'links/CLEAR-LINKS-DATA';
const SET_SORT = '/links/SET-SORT';
const SET_TOTAL_COUNT_LINKS = '/links/SET-TOTAL-COUNT-LINKS';
const SET_CURRENT_PAGE_NUMBER = '/links/SET-CURRENT-PAGE-NUMBER';
const SET_IS_LINKS_IN_PROGRESS = '/links/SET-IS-LINKS-IN-PROGRESS';

export type TLinks = {
  id: number
  short: string
  target: string
  counter: number
}

export enum ESortTypes {
  shortASC = 'asc_short',
  shortDESC = 'desc_short',
  targetLinkASC = 'asc_target',
  targetLinkDESC = 'desc_target',
  counterASC = 'asc_counter',
  counterDESC = 'desc_counter'
}

type TSetLinksData = { type: typeof SET_LINKS_DATA, links: Array<TLinks> }
type TAddLink = { type: typeof ADD_LINK, link: TLinks }
type TSetSort = { type: typeof SET_SORT, sortType: ESortTypes }
type TClearLinksData = { type: typeof CLEAR_LINKS_DATA }
type TSetTotalCountLinks = { type: typeof SET_TOTAL_COUNT_LINKS, totalCountLinks: number }
type TSetCurrentPageNumber = { type: typeof SET_CURRENT_PAGE_NUMBER, pageNumber: number }
type TSetIsLinksInProgress = { type: typeof SET_IS_LINKS_IN_PROGRESS, isLinksInProgress: boolean}

type TActions = TSetLinksData | TClearLinksData | TAddLink | TSetSort | TSetTotalCountLinks | TSetCurrentPageNumber | TSetIsLinksInProgress;

const initialState = {
  links: [] as Array<TLinks>,
  sortType: ESortTypes.shortASC,
  pageSize: 10,
  totalCountLinks: 0,
  currentPageNumber: 1,
  isLinksInProgress: false
} 

export type TLinksReducerState = typeof initialState;

const linksReducer = (state = initialState, action: TActions): TLinksReducerState => {
  switch (action.type) {
    case SET_LINKS_DATA:
      return {
        ...state,
        links: [...action.links]
      }
    
    case ADD_LINK:
      return {
        ...state,
        links: [...state.links, action.link]
      }

    case CLEAR_LINKS_DATA: {
      return {
        ...state,
        links: []
      }
    }

    case SET_SORT:
      return {
        ...state,
        sortType: action.sortType
      }

    case SET_TOTAL_COUNT_LINKS:
      return {
        ...state,
        totalCountLinks: action.totalCountLinks
      }

    case SET_CURRENT_PAGE_NUMBER:
      return {
        ...state,
        currentPageNumber: action.pageNumber
      }

    case SET_IS_LINKS_IN_PROGRESS:
      return {
        ...state,
        isLinksInProgress: action.isLinksInProgress
      }

    default:
      return state
  }
}

export const SetSortType = (sortType: ESortTypes): TSetSort => ({ type: SET_SORT, sortType });
export const clearLinksData = (): TClearLinksData => ({ type: CLEAR_LINKS_DATA });
export const addLink = (link: TLinks): TAddLink => ({ type: ADD_LINK, link });
export const setLinksData = (links: Array<TLinks>): TSetLinksData => ({ type: SET_LINKS_DATA, links });
export const setTotalCountLinks = (totalCountLinks: number): TSetTotalCountLinks => ({ type: SET_TOTAL_COUNT_LINKS, totalCountLinks });
export const setCurrentPageNumber = (pageNumber: number): TSetCurrentPageNumber => ({ type: SET_CURRENT_PAGE_NUMBER, pageNumber });
export const setIsLinksInProgress = (isLinksInProgress: boolean): TSetIsLinksInProgress => ({ type: SET_IS_LINKS_IN_PROGRESS, isLinksInProgress })

export const createShortLink = (link: string): ThunkAction<void, TAppState, unknown, TActions> => async (dispatch, getState) => {
  const token = getAuthToken(getState());
  const sortType = getSortType(getState());
  const response = await API.requestShortLink(token, link);

  if(response.status === 200) {
    dispatch( getStatistics(token, sortType) );
  }
}

export const getStatistics = (token: string, order: ESortTypes, limit = 10, offset = 0): ThunkAction<void, TAppState, unknown, TActions> => async dispatch => {
  dispatch( setIsLinksInProgress(true) );

  API.requestStatistics(token, order, limit, offset)
    .then(res => {
      if(res.status === 200) {
        dispatch( setLinksData(res.data) );
      }

      dispatch( setIsLinksInProgress(false) );
    })


}

export const initialGetStatistics = (token: string): ThunkAction<void, TAppState, unknown, TActions> => async dispatch => {
  const response = await API.initialRequestStatictics(token);

  if(response.status === 200) {
    dispatch( setTotalCountLinks(response.data.length) );
  }
}

export const changePage = (pageNumber: number ): ThunkAction<void, TAppState, unknown, TActions> => async (dispatch, getState) => {
  dispatch( setIsLinksInProgress(true) );

  const token = getAuthToken(getState());
  const sortType = getSortType(getState());
  const limit = getPageSize(getState());

  const offset = limit * (pageNumber - 1);

  API.requestStatistics(token, sortType, limit, offset)
    .then(res => {
      if(res.status === 200) {
        dispatch( setLinksData(res.data) );
        dispatch( setCurrentPageNumber(pageNumber) )
      }

      dispatch( setIsLinksInProgress(false) );
    })


}

export default linksReducer;