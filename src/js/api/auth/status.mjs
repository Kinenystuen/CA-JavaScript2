import { load } from "../headers.mjs";

export const isLoggedIn = () => Boolean(load("token"));

export const profile = () => load("profile");   