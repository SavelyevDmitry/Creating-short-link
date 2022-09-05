import queryString from 'querystring';
import { ESortTypes } from '../redux/reducers/links-reducer';

export const API = {
  async login(username: string, password: string) {

    const response = await fetch('http://79.143.31.216/login', {
      method: "POST",
      body: queryString.stringify({
        username,
        password
      }),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    const status = response.status;
    const data = await response.json();
    return {
      data,
      status
    }
  },

  async signup(username: string, password: string) {
    const response = await fetch(`http://79.143.31.216/register?username=${username}&password=${password}`, {
      method: 'POST'
    });

    const status = response.status;
    const data = await response.json();
    return {
      data,
      status
    }
  },

  async initialRequestStatictics(token: string) {
    const response = await fetch(`http://79.143.31.216/statistics?offset=0&limit=0`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const status = response.status;
    const data = await response.json();
    return {
      status,
      data
    }
  },

  async requestStatistics(token: string, order: string = ESortTypes.shortASC, limit: number = 10, offset: number = 0 ) {

    const response = await fetch(`http://79.143.31.216/statistics?order=${order}&offset=${offset}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const status = response.status;
    const data = await response.json();
    return {
      status,
      data
    }
  },

  async requestShortLink(token: string, link: string) {
    const response = await fetch(`http://79.143.31.216/squeeze?link=${link}`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const status = response.status;
    const data = await response.json();
    return {
      status,
      data
    }
  }
}